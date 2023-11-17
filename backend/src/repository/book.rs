use sqlx::{MySqlPool, Executor, QueryBuilder};

use crate::{fetch_match, util::types::AppResult};

#[derive(sqlx::FromRow, serde::Serialize)]
pub struct Book {
	pub id: String,
	pub title: String,
	pub author_id: i32,
    pub author_name: String,
	pub price: f32,
	pub publish_year: String,
    pub number_of_purchases:  Option<i32>,
    pub book_in_stocks: i32,
    pub rating: Option<f32>,
    pub desciption: Option<String>,

	pub back_page_url: Option<String>,
	pub front_page_url: Option<String>
}
//
// pub struct BookGenre {
//     pub id: i32,
//     pub name: Option<String>,
//     pub book_id: String,
// }
//
pub struct BookFetch {
	pub id: String,
	pub title: String,
	pub author_id: i32,
	pub price: f32,
	pub publish_year: String,
    pub number_of_purchases:  Option<i32>,
    pub book_in_stocks: i32,
    pub rating: Option<f32>,
    pub desciption: Option<String>,

	pub back_page_url: Option<String>,
	pub front_page_url: Option<String>
}
//
// impl From<BookFetch> for Book {
//     fn from(value: BookFetch) -> Self {
//         Self { id: value.id, title: value.title, author_id: value.author_id, price: value.price, publish_year: value.publish_year, number_of_purchases: value.number_of_purchases, book_in_stocks: value.book_in_stocks, rating: value.rating, desciption: value.desciption, author_name: value.author_name, book_genre: vec![], back_page_url: value.back_page_url, front_page_url: value.front_page_url }
//     }
// }

pub async fn select_book(id: &String, pool: &MySqlPool) -> sqlx::Result<Book> {
    // let fut_all = join!(
    //     sqlx::query_as!(BookFetch, 
    //                     r"select book.*, author.name as author_name
    //      from ( 
    //          select * from book where id = ?
    //      ) as book
    //      join author
    //      where author.id = book.author_id;", id)
    //     .fetch_one(pool),
    //     sqlx::query_as!(BookGenre,
    //     "select genre.*, book_genre.book_id from genre
    //          join (
    //          	select * from book_genre
    //              where book_id = ?
    //          ) book_genre
    //       where book_genre.genre_id = genre.id", id)
    //     .fetch_all(pool)
    //     );
    let book = sqlx::query_as!(Book, 
                        r"select book.*, author.name as author_name
         from ( 
             select * from book where id = ?
         ) as book
         join author
         where author.id = book.author_id;", id)
        .fetch_one(pool)
        .await?;
    Ok(book)
}

pub async fn list_books(start: i32, length: i32, pool: &MySqlPool) -> sqlx::Result<Vec<Book>> {
    let book = sqlx::query_as!(Book,
        r"select book.*, author.name as author_name from (
    	    select * from book limit ? offset ?
         ) book
         join author
         where author.id = book.author_id;", length, start)
        .fetch_all(pool)
        .await?;
    Ok(book)
}

pub async fn list_books_sort(start: i32, length: i32, pool: &MySqlPool) -> AppResult<Vec<Book>> {
    let books = fetch_match!(sqlx::query_as!(Book,
    "select book.*, author.name as author_name from (
    select * from book
    order by rating desc
    limit ? offset ?
    ) book
    join author
    where author.id = book.author_id", length, start)
        .fetch_all(pool)
        .await)?;
    Ok(books)
}


pub async fn list_books_sort_asc(start: i32, length: i32, pool: &MySqlPool) -> AppResult<Vec<Book>> {
    let books = fetch_match!(sqlx::query_as!(Book,
    "select book.*, author.name as author_name from (
    select * from book
    order by rating asc 
    limit ? offset ?
    ) book
    join author
    where author.id = book.author_id", length, start)
        .fetch_all(pool)
        .await)?;
    Ok(books)
}

pub async fn list_book_by_genre(start: i32, length: i32, genre_id: i32, pool: &MySqlPool) -> sqlx::Result<Vec<BookFetch>> {
    // let mut query_builder = sqlx::QueryBuilder::from("select book_id id from book_genre where genre_id in (");
    // let mut separeted = query_builder.separated(", ");
    // for id in genre_ids {
    //     separeted.push_bind(id);
    // }
    // separeted.push_unseparated(")");
    // let mut query = query_builder.sql();

    sqlx::query_as!(
        BookFetch,
        "select * from book where id in (select book_id as id from book_genre where genre_id in (?))",
        genre_id
        )
        .fetch_all(pool)
        .await
}




// pub async fn delete_book(id: String, pool: &MySqlPool) -> sqlx::Result<()> {
//     sqlx::query!("delete from book where id = ?", id)
//         .execute(pool)
//         .await?;
//     Ok(())
// }



