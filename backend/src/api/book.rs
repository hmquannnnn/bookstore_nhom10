use actix_web::{
    get, patch, post,
    web::{self, Bytes, Json, Query},
    Responder, Result as ActixResult,
};
use futures_util::future::join;
use sqlx::{prelude::FromRow, MySql, QueryBuilder};

use crate::{
    header::JwtTokenHeader,
    repository::{
        alias::book_genres_filter_full,
        book::{
            self, list_books_sort, list_books_sort_asc, select_book, Book, BookSearch,
            BookSearchAuthor,
        },
        image::insert_image,
    },
    update_field,
    util::{
        helper::Bound,
        to_image_url,
        types::{AppError, AppResult, AppState, Message},
    },
};

use crate::update_book_field;

#[derive(serde::Serialize, serde::Deserialize)]
pub struct BookQuery {
    id: String,
}

#[get("/api/book")]
pub async fn get_book(
    query: Query<BookQuery>,
    app_state: actix_web::web::Data<AppState>,
) -> AppResult<impl Responder> {
    let book_id = query.0.id;
    let pool = &app_state.pool;

    let book = book::select_book(&book_id, pool)
        .await
        .map_err(|_| AppError::FailToFetch)?;
    Ok(Json(book))
}

#[get("/api/books")]
pub async fn get_books(
    query: Json<Vec<String>>,
    app_state: actix_web::web::Data<AppState>,
) -> AppResult<impl Responder> {
    let book_id = &query.0;
    let pool = &app_state.pool;

    let book = book::select_books(book_id, pool)
        .await
        .map_err(|_| AppError::FailToFetch)?;
    Ok(Json(book))
}

#[derive(serde::Deserialize)]
pub struct SearchValue {
    pub value: String,
}

#[get("/api/search/book")]
pub async fn search_book(
    query: Query<SearchValue>,
    app_state: web::Data<AppState>,
) -> actix_web::Result<Json<Vec<BookSearch>>> {
    let books = book::search_book(&query.value, &app_state.pool)
        .await
        .map_err(actix_web::error::ErrorNotFound)?;
    Ok(Json(books))
}

#[get("/api/search/author/book")]
pub async fn search_book_by_author(
    query: Query<SearchValue>,
    app_state: web::Data<AppState>,
) -> actix_web::Result<Json<Vec<BookSearchAuthor>>> {
    let books = book::search_author_book(&query.value, &app_state.pool)
        .await
        .map_err(actix_web::error::ErrorNotFound)?;
    Ok(Json(books))
}

#[derive(serde::Deserialize)]
pub struct BookListInfo {
    pub start: i32,
    pub length: i32,
}

#[get("/api/book/list")]
pub async fn list_book(
    query: Query<BookListInfo>,
    app_state: actix_web::web::Data<AppState>,
) -> AppResult<impl Responder> {
    let start = query.0.start;
    let length = query.0.length;
    let pool = &app_state.pool;

    let book = book::list_books(start, length, pool)
        .await
        .map_err(|_| AppError::FailToFetch)?;
    Ok(Json(book))
}

#[derive(serde::Deserialize)]
pub struct BookId {
    pub id: String,
}

#[patch("/api/book/image")]
pub async fn patch_book_image(
    _jwt: JwtTokenHeader,
    query: Query<BookId>,
    payload: Bytes,
    app_state: actix_web::web::Data<AppState>,
) -> AppResult<Json<Message<String>>> {
    let book_id = &query.id;
    let _ = select_book(book_id, &app_state.pool)
        .await
        .map_err(|_| AppError::NonExistBook)?;
    let id = uuid::Uuid::new_v4().to_string();
    let url = to_image_url(&app_state, &id);
    let _ = join(
        insert_image(payload.to_vec(), &id, &app_state.pool),
        sqlx::query!("update book set front_page_url = ?", url).execute(&app_state.pool),
    )
    .await;
    Ok(Json(Message {
        message: "insert success",
        payload: Some(url),
    }))
}

update_book_field!(update_book_title, "/api/book/title/{value}", title);
update_book_field!(update_book_price, "/api/book/price/{value}", price);
update_book_field!(update_book_descption, "/api/book/price/{value}", desciption);

#[macro_export]
macro_rules! update_book_field {
    ( $name:ident, $path:expr, $field:ident ) => {
        update_field!(book, $name, $path, $field, "id");
    };
}

#[get("/api/book/sort/desc")]
pub async fn fetch_sorted_books(
    query: Query<BookListInfo>,
    app_state: actix_web::web::Data<AppState>,
) -> AppResult<Json<Vec<Book>>> {
    let start = query.start;
    let length = query.length;
    let books = list_books_sort(start, length, &app_state.pool).await?;
    Ok(Json(books))
}

#[get("/api/book/sort/asc")]
pub async fn fetch_sorted_books_asc(
    query: Query<BookListInfo>,
    app_state: actix_web::web::Data<AppState>,
) -> AppResult<Json<Vec<Book>>> {
    let start = query.start;
    let length = query.length;
    let books = list_books_sort_asc(start, length, &app_state.pool).await?;
    Ok(Json(books))
}

#[get("/api/book/sort/purchase/asc")]
pub async fn fetch_sorted_books_purchse_asc(
    query: Query<BookListInfo>,
    app_state: actix_web::web::Data<AppState>,
) -> actix_web::Result<Json<Vec<Book>>> {
    let start = query.start;
    let length = query.length;
    let pool = &app_state.pool;
    let books = sqlx::query_as!(
        Book,
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
            order by number_of_purchases asc 
            limit ? offset ?"#,
        length,
        start
    )
    .fetch_all(pool)
    .await
    .map_err(|_| actix_web::error::ErrorBadRequest(AppError::WrongPassword))?;
    Ok(Json(books))
}

#[get("/api/book/sort/purchase/desc")]
pub async fn fetch_sorted_books_purchse_desc(
    query: Query<BookListInfo>,
    app_state: actix_web::web::Data<AppState>,
) -> actix_web::Result<Json<Vec<Book>>> {
    let start = query.start;
    let length = query.length;
    let pool = &app_state.pool;
    let books = sqlx::query_as!(
        Book,
        "select book.*, author.name as author_name from (
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
            order by number_of_purchases desc
            limit ? offset ?",
        length,
        start
    )
    .fetch_all(pool)
    .await
    .map_err(|_| actix_web::error::ErrorBadRequest(AppError::WrongPassword))?;
    Ok(Json(books))
}

#[get("/api/book/sort/price/desc")]
pub async fn fetch_sorted_books_price_desc(
    query: Query<BookListInfo>,
    app_state: actix_web::web::Data<AppState>,
) -> actix_web::Result<Json<Vec<Book>>> {
    let start = query.start;
    let length = query.length;
    let pool = &app_state.pool;
    let books = sqlx::query_as!(
        Book,
        "select book.*, author.name as author_name from (
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
            order by price desc
            limit ? offset ?",
        length,
        start
    )
    .fetch_all(pool)
    .await
    .map_err(|_| actix_web::error::ErrorBadRequest(AppError::WrongPassword))?;
    Ok(Json(books))
}

#[get("/api/book/sort/price/asc")]
pub async fn fetch_sorted_books_price_asc(
    query: Query<BookListInfo>,
    app_state: actix_web::web::Data<AppState>,
) -> actix_web::Result<Json<Vec<Book>>> {
    let start = query.start;
    let length = query.length;
    let pool = &app_state.pool;
    let books = sqlx::query_as!(
        Book,
        "select book.*, author.name as author_name from (
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
            order by price asc 
            limit ? offset ?",
        length,
        start
    )
    .fetch_all(pool)
    .await
    .map_err(|_| actix_web::error::ErrorBadRequest(AppError::WrongPassword))?;
    Ok(Json(books))
}

#[derive(serde::Serialize, FromRow)]
pub struct Genre {
    pub id: String,
    pub genres: String,
}

#[get("/api/book/filter/genres")]
pub async fn fetch_book_by_genre(
    genre_ids: Json<Vec<i32>>,
    app_state: actix_web::web::Data<AppState>,
) -> actix_web::Result<Json<Vec<Book>>> {
    let genre_ids = genre_ids.0;

    let mut main_builder: QueryBuilder<'_, MySql> = QueryBuilder::new(
        "select book.*, author.name author_name, book_genre.genres from book  
                          left join author on author.id = author_id right join (",
    );

    main_builder.push(book_genres_filter_full(&genre_ids).sql());
    main_builder.push(") book_genre on book.id = book_genre.id");

    let books = sqlx::query_as::<MySql, Book>(main_builder.sql())
        .fetch_all(&app_state.pool)
        .await
        .map_err(actix_web::error::ErrorNotFound)?;

    Ok(Json(books))
}

#[get("/api/book/filter/price")]
pub async fn fetch_filter_price(
    bound: Query<Bound<f64>>,
    app_state: actix_web::web::Data<AppState>,
) -> ActixResult<Json<Vec<Book>>> {
    let pool = &app_state.pool;

    let books = sqlx::query_as!(
        Book,
        r#"select book.*, book_genre.genres, author.name author_name from book
        left join author
        on author.id = book.author_id
        left join (
        select book_id id, concat('[',group_concat(genre_id),']') genres
        from book_genre
        group by book_id) book_genre
        on book.id = book_genre.id
        where price > ? and price < ?"#,
        bound.start,
        bound.end
    )
    .fetch_all(pool)
    .await
    .map_err(actix_web::error::ErrorNotFound)?;
    Ok(Json(books))
}

#[derive(serde::Deserialize)]
pub struct GenrePrice {
    pub(crate) genres_id: Vec<i32>,
    pub(crate) bound: Bound<f64>,
}

#[post("/api/book/filter/price/genre")]
pub async fn fetch_filter_price_genre(
    genre_price_filter: Json<GenrePrice>,
    app_state: actix_web::web::Data<AppState>,
) -> ActixResult<Json<Vec<Book>>> {
    let pool = &app_state.pool;

    let genre_ids = &genre_price_filter.genres_id;
    let bound = &genre_price_filter.bound;

    let mut main_builder: QueryBuilder<'_, MySql> = QueryBuilder::new(
        "select book.*, author.name author_name, book_genre.genres from book  
                          left join author on author.id = author_id right join (",
    );

    main_builder.push(book_genres_filter_full(&genre_ids).sql());
    main_builder.push(") book_genre on book.id = book_genre.id");

    let books = sqlx::query_as::<MySql, Book>(main_builder.sql())
        .fetch_all(pool)
        .await
        .map_err(actix_web::error::ErrorNotFound)?;

    let books: Vec<Book> = books
        .iter()
        .filter(|book| book.price > bound.start && book.price < bound.end)
        .map(|book| book.clone())
        .collect();
    Ok(Json(books))
}

#[derive(serde::Deserialize)]
struct RattingHigher {
    rating: f32,
    start: i32,
    end: i32,
}

#[get("/api/book/filter/ratting/higher")]
pub async fn filter_ratting_higher(
    rating_filter: Query<RattingHigher>,
    app_state: actix_web::web::Data<AppState>,
) -> ActixResult<Json<Vec<Book>>> {
    let pool = &app_state.pool;

    let books = sqlx::query_as!(
        Book,
        r#"select book.*, book_genre.genres, author.name author_name from book
        left join author
        on author.id = book.author_id
        left join (
        select book_id id, concat('[',group_concat(genre_id),']') genres
        from book_genre
        group by book_id) book_genre
        on book.id = book_genre.id
        where rating >= ?
        order by rating asc 
        limit ? offset ?
        "#,
        rating_filter.rating,
        rating_filter.start,
        rating_filter.end
    )
    .fetch_all(pool)
    .await
    .map_err(actix_web::error::ErrorNotFound)?;
    Ok(Json(books))
}
