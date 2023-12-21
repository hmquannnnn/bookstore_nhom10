use sqlx::{MySqlPool, QueryBuilder, MySql};

use crate::{fetch_match, util::types::AppResult};

#[derive(sqlx::FromRow, serde::Serialize, Clone)]
pub struct Book {
    pub id: String,
    pub title: String,
    pub author_id: i32,
    pub author_name: Option<String>,
    pub price: f64,
    pub publish_year: String,
    pub number_of_purchases:  Option<i32>,
    pub book_in_stocks: i32,
    pub rating: Option<f32>,
    pub desciption: Option<String>,
    // pub genres: sqlx::types::Json<Vec<i32>>,
    pub genres: Option<String>, 

    pub back_page_url: Option<String>,
    pub front_page_url: Option<String>
}
//
// pub struct BookGenre { pub id: i32,
//     pub name: Option<String>,
//     pub book_id: String,
// }
//
// pub struct BookFetch {
//     pub id: String,
//     pub title: String,
//     pub author_id: i32,
//     pub price: f32,
//     pub publish_year: String,
//     pub number_of_purchases:  Option<i32>,
//     pub book_in_stocks: i32,
//     pub rating: Option<f32>,
//     pub desciption: Option<String>,
//
//     pub back_page_url: Option<String>,
//     pub front_page_url: Option<String>


pub async fn select_books(ids: &Vec<String>, pool: &MySqlPool) -> sqlx::Result<Book> {
    let mut query_builder: QueryBuilder<'_, MySql> = QueryBuilder::new(
        r#"select book.*, author.name author_name, book_genre.genres from book
        left join author
        on book.author_id = author.id
        left join (
        select book_id, concat('[',group_concat(genre_id),']') genres 
        from book_genre
        group by book_id
        ) book_genre
        on book_genre.book_id = book.id
        where book.id in "#);
   
    query_builder.push_tuples(ids, |mut q, id| {
        q.push(id);
    });
    

    let book = sqlx::query_as::<_, Book>(query_builder.sql())
        .fetch_one(pool)
    .await?;
    Ok(book)
}

pub async fn select_book(id: &String, pool: &MySqlPool) -> sqlx::Result<Book> {
    let book = sqlx::query_as!(Book, 
        r#"select book.*, author.name author_name, book_genre.genres from book
        left join author
        on book.author_id = author.id
        left join (
        select book_id, concat('[',group_concat(genre_id),']') genres 
        from book_genre
        group by book_id
        ) book_genre
        on book_genre.book_id = book.id
        where book.id = ?"#, id)
        .fetch_one(pool)
    .await?;
    Ok(book)
}

#[derive(serde::Serialize)]
pub struct BookSearch {
    pub id: String,
    pub title: String,
    pub back_page_url: Option<String>,
    pub front_page_url: Option<String>
}

pub async fn search_book(title: &String, pool: &MySqlPool) -> sqlx::Result<Vec<BookSearch>> {
    let title = format!("+{title}*");
    let book = sqlx::query_as!(BookSearch, 
        r#"select id, title, back_page_url, front_page_url from book
            where match(title) against (? in boolean mode)"#, title)
        .fetch_all(pool)
    .await?;
    Ok(book)
}

#[derive(serde::Serialize)]
pub struct BookSearchAuthor {
    pub id: String,
    pub title: String,
    pub back_page_url: Option<String>,
    pub front_page_url: Option<String>,
    pub author_id: i32,
    pub author_name: String,
}

pub async fn search_author_book(name: &String, pool: &MySqlPool) -> sqlx::Result<Vec<BookSearchAuthor>> {
    let name = format!("%{name}%");
    let books = sqlx::query_as!(BookSearchAuthor,
    r#"select id, title, back_page_url, front_page_url, author_id, author_name from book
        natural join (
            select id author_id, name author_name from author where name like ?
        ) author"#, name)
        .fetch_all(pool)
        .await?;   
    Ok(books)
}

pub async fn list_books(start: i32, length: i32, pool: &MySqlPool) -> sqlx::Result<Vec<Book>> {
    let book = sqlx::query_as!(Book,
    r#"select book.*, author.name author_name, book_genre.genres from book
    left join author
    on book.author_id = author.id
    left join (
    select book_id,concat('[',group_concat(genre_id),']') genres
    from book_genre
    group by book_id
    ) book_genre
    on book_genre.book_id = book.id
    limit ? offset ?"#, length, start)
        .fetch_all(pool)
    .await?;
    Ok(book)
}

pub async fn list_books_sort(start: i32, length: i32, pool: &MySqlPool) -> AppResult<Vec<Book>> {
    let books = fetch_match!(sqlx::query_as!(Book,
    r#"select book.*, author.name as author_name from (
    select book.*, book_genre.genres from book
    left join (
    select book_id, concat('[',group_concat(genre_id),']') genres
    from book_genre
    group by book_id
    ) book_genre
    on book.id = book_genre.book_id
    ) book
    join author
    where author.id = book.author_id
    order by rating desc
    limit ? offset ?"#,
    length, start)
    .fetch_all(pool)
    .await)?;
    Ok(books)
}


pub async fn list_books_sort_asc(start: i32, length: i32, pool: &MySqlPool) -> AppResult<Vec<Book>> {
    let books = fetch_match!(sqlx::query_as!(Book,
    r#"select book.*, author.name author_name from (
    select book.*, book_genre.genres from book
    left join (
    select book_id id, concat('[',group_concat(genre_id),']') genres from book_genre
    group by id
    ) book_genre
    on book.id = book_genre.id
    ) book
    join author
    on author.id = book.author_id
    order by rating asc 
    limit ? offset ?"#,
    length, start)
    .fetch_all(pool)
    .await)?;
    Ok(books)
}



#[derive(serde::Serialize, serde::Deserialize, sqlx::FromRow)]
pub struct BookPrice {
    pub book_id: String,
    pub price_each: f32,
}

pub async fn take_price(
    books_id: &Vec<String>,
    pool: &MySqlPool,
) -> sqlx::Result<Vec<BookPrice>> {
    let mut query: QueryBuilder<'_, MySql> = QueryBuilder::new("select id book_id, price price_each from book where id in (");
    
    let mut sep = query.separated(',');

    for id in books_id {
        sep.push(id);
    }

    query.push(")");

    sqlx::query_as::<MySql, BookPrice>(query.sql())
    .fetch_all(pool)
    .await
}

// pub async fn list_book_by_genre(_start: i32, _length: i32, genre_id: i32, pool: &MySqlPool) -> sqlx::Result<Vec<BookFetch>> {
//     // let mut query_builder = sqlx::QueryBuilder::from("select book_id id from book_genre where genre_id in (");
//     // let mut separeted = query_builder.separated(", ");
//     // for id in genre_ids {
//     //     separeted.push_bind(id);
//     // }
//     // separeted.push_unseparated(")");
//     // let mut query = query_builder.sql();
//
//     sqlx::query_as!(
//         BookFetch,
//         "select * from book where id in (select book_id as id from book_genre where genre_id in (?))",
//         genre_id
//         )
//         .fetch_all(pool)
//         .await
// }
//
//
