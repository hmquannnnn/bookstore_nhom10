use actix_web::{
    get,
    web::{Json, Query},
    Responder,
};
use futures_util::future::join;

use crate::{repository::{book, auth_user}, util::types::{AppState, AppResult, AppError}, header::JwtTokenHeader};

// #[get("/image")]
// pub async fn get_image(query: web::Query<ImageInfo>, app_state: web::Data<AppState>) -> HttpResponse {

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
        book::select_book(book_id, pool)
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



// #[patch("/book")]
// pub async fn patch_book(query: Query<()>)
