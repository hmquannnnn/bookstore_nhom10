use actix_web::{
    get, patch,
    web::{Bytes, Json, Query},
    Responder,
};
use futures_util::future::join;

use crate::{
    header::JwtTokenHeader,
    repository::{
        book::{self, select_book, Book, list_books_sort},
        image::insert_image, self,
    },
    util::{
        to_image_url,
        types::{AppError, AppResult, AppState, Message},
    }, update_field,
};

use crate::update_book_field;

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


#[get("/book/stored/desc")]
pub async fn fetch_storted_books(query: Query<BookListInfo>, app_state: actix_web::web::Data<AppState>) -> AppResult<Json<Vec<Book>>> {
    let start = query.start;
    let length = query.length;
    let books = list_books_sort(start, length, &app_state.pool)
        .await?;
    Ok(Json(books))
}
