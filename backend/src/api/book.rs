use actix_web::{
    get,
    web::{Json, Query, Bytes},
    Responder, patch
};
use futures_util::future::join;

use crate::{repository::{book::{self, select_book}, auth_user, image::insert_image}, util::{types::{AppState, AppResult, AppError, Message}, to_image_url}, header::JwtTokenHeader};


#[derive(serde::Serialize, serde::Deserialize)]
pub struct BookQuery {
    id: String
}

#[get("/book")]
pub async fn get_book(
    auth_header: JwtTokenHeader,
    query: Query<BookQuery>,
    app_state: actix_web::web::Data<AppState>,
) -> AppResult<impl Responder> {
    let book_id = query.0.id;
    let pool = &app_state.pool;

    let fut_all = join(
        auth_user(&auth_header.to_user_auth(), pool), 
        book::select_book(&book_id, pool)
    ).await;
    
    let book = fut_all.1
        .map_err(|_| AppError::FailToFetch)?;
    
    match fut_all.0? {
        true => Ok(Json(book)),
        false => Err(AppError::FailAuthenticate)
    }
}

#[derive(serde::Deserialize)]
pub struct BookListInfo {
    pub start: i32,
    pub length: i32,
}

#[get("/book/list")]
pub async fn list_book(
    auth_header: JwtTokenHeader,
    query: Query<BookListInfo>,
    app_state: actix_web::web::Data<AppState>,
) -> AppResult<impl Responder> {
    let start = query.0.start;
    let length = query.0.length;
    let pool = &app_state.pool;
    let auth = auth_header.to_user_auth();

    let fut_all = join(
        auth_user(&auth, pool),
        book::list_books(start, length, pool)
    ).await;

    let book = fut_all.1
        .map_err(|_| AppError::FailToFetch)?;

    match fut_all.0? {
        true => Ok(Json(book)),
        false => Err(AppError::FailAuthenticate)
    }
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
        sqlx::query!("update book set back_page_url = ?", url) 
        .execute(&app_state.pool)
    ).await;
    Ok(Json(Message{
        message: "insert success",
        payload: Some(url)
    }))
}

