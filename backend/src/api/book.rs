use actix_web::{
    get, patch,
    web::{Bytes, Json, Query},
    Responder,
};
use futures_util::future::join;

use crate::{
    header::JwtTokenHeader,
    repository::{
        book::{self, select_book, Book, list_books_sort, list_books_sort_asc},
        image::insert_image,
    },
    util::{
        to_image_url,
        types::{AppError, AppResult, AppState, Message},
    }, update_field,
};

use crate::update_book_field;
// use crate::book_sort;

#[derive(serde::Serialize, serde::Deserialize)]
pub struct BookQuery {
    id: String,
}

#[get("/book")]
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

#[derive(serde::Deserialize)]
pub struct BookListInfo {
    pub start: i32,
    pub length: i32,
}

#[get("/book/list")]
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

#[patch("/book/image")]
pub async fn patch_book_image(
    _jwt: JwtTokenHeader,
    query: Query<BookId>,
    payload: Bytes,
    app_state: actix_web::web::Data<AppState>,
) -> AppResult<Json<Message<String>>> {
    let book_id = &query.id;
    let _ = select_book(&book_id, &app_state.pool)
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

update_book_field!(update_book_title, "/book/title/{value}", title);
update_book_field!(update_book_price, "/book/price/{value}", price);
update_book_field!(update_book_descption, "/book/price/{value}", desciption);

#[macro_export]
macro_rules! update_book_field {
    ( $name:ident, $path:expr, $field:ident ) => {
       update_field!( book, $name, $path, $field );
    };
}


#[get("/book/sort/desc")]
pub async fn fetch_sorted_books(query: Query<BookListInfo>, app_state: actix_web::web::Data<AppState>) -> AppResult<Json<Vec<Book>>> {
    let start = query.start;
    let length = query.length;
    let books = list_books_sort(start, length, &app_state.pool)
        .await?;
    Ok(Json(books))
}


#[get("/book/sort/asc")]
pub async fn fetch_sorted_books_asc(query: Query<BookListInfo>, app_state: actix_web::web::Data<AppState>) -> AppResult<Json<Vec<Book>>> {
    let start = query.start;
    let length = query.length;
    let books = list_books_sort_asc(start, length, &app_state.pool)
        .await?;
    Ok(Json(books))
}

#[get("/book/purchase/sort/asc")]
pub async fn fetch_sorted_books_purchse_asc(query: Query<BookListInfo>, app_state: actix_web::web::Data<AppState>) -> actix_web::Result<Json<Vec<Book>>> {
    let start = query.start;
    let length = query.length;
    let pool = &app_state.pool;
    let books =
        sqlx::query_as!(Book,
        "select book.*, author.name as author_name from (
            select * from book
            order by number_of_purchases asc 
            limit ? offset ?
            ) book
            join author
            where author.id = book.author_id"
        ,length, start)
        .fetch_all(pool)
        .await
        .map_err(|_| actix_web::error::ErrorBadRequest(AppError::WrongPassword))?;
    Ok(Json(books))
}


#[get("/book/purchase/sort/desc")]
pub async fn fetch_sorted_books_purchse_desc(query: Query<BookListInfo>, app_state: actix_web::web::Data<AppState>) -> actix_web::Result<Json<Vec<Book>>> {
    let start = query.start;
    let length = query.length;
    let pool = &app_state.pool;
    let books =
        sqlx::query_as!(Book,
        "select book.*, author.name as author_name from (
            select * from book
            order by number_of_purchases desc
            limit ? offset ?
            ) book
            join author
            where author.id = book.author_id"
        ,length, start)
        .fetch_all(pool)
        .await
        .map_err(|_| actix_web::error::ErrorBadRequest(AppError::WrongPassword))?;
    Ok(Json(books))
}


// book_sort!("/book/rating/sort", fetch_books_sort_rating, book order by ratting, asc);

// #[macro_export]
// macro_rules! book_sort {
//     ( $path:expr, $name:ident, $table:ident order by $column:ident, $order:ident) => {
//         #[get($path)]
//         pub async fn $name(query: Query<BookListInfo>, app_state: actix_web::web::Data<AppState>) -> actix_web::Result<Json<Vec<sqlx::mysql::MySqlRow>>> {
//             let start = query.start;
//             let length = query.length;
//             let pool = &app_state.pool;

//             let books = sqlx::query_as!(Book,
//                     "call book_sort(?, ?, ?, ?)", 
//                     length, 
//                     start,
//                     stringify!($column),
//                     stringify!($order)
//                 )
//                 .fetch_all(pool)
//                 .await
//                 .map_err(|_| actix_web::error::ErrorBadRequest(AppError::WrongPassword))?;
//             Ok(Json(books))
//         }
//     };
// }

// #[get("/dfdf")]
// pub async fn ddd(query: Query<BookListInfo>, app_state: actix_web::web::Data<AppState>) -> actix_web::Result<Json<Vec<Book>>> {
//     let start = query.start;
//     let length = query.length;
//     let pool = &app_state.pool;

//     let books = 
//         sqlx::query_as!(Book,
//            "select book.*, author.name as author_name from (
//             select * from book
//             order by rating asc 
//             limit ? offset ?
//             join author
//             where author.id = book.author_id",
//             length, start
//         )
//         .fetch_all(pool)
//         .await
//         .map_err(|_| actix_web::error::ErrorBadRequest(AppError::WrongPassword))?;
//     // let books = books.
//     // let books = 
//     //     sqlx::query!(
//     //         "select * from book"
//     //     )
//     //     .fetch_all(pool)
//     //     .await
//     //     .map_err(|_| actix_web::error::ErrorBadRequest(AppError::WrongPassword))?;
//     Ok(Json(books))
// }


// macro_rules! list_book_sorted{
//     ( $name:ident, $path:expr by $column:ident )  => {    

//         pub async fn $name(start: i32, length: i32, pool: &MySqlPool) -> AppResult<Vec<Book>> {
//             let books = fetch_match!(sqlx::query_as!(Book,
//             "select book.*, author.name as author_name from (
//             select * from book
//             order by rating asc 
//             limit ? offset ?
//             ) book
//             join author
//             where author.id = book.author_id", length, start)
//                 .fetch_all(pool)
//                 .await)?;
//             Ok(books)
//         }
//     };
// }

