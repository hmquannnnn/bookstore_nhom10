use actix_web::{
    get,
    web::{Json, Query},
    Responder,
};

use crate::{repository::book, util::types::AppState, header::JwtTokenHeader};

// #[get("/image")]
// pub async fn get_image(query: web::Query<ImageInfo>, app_state: web::Data<AppState>) -> HttpResponse {

#[get("/book")]
pub async fn get_book(
    auth_header: JwtTokenHeader,
    query: Query<String>,
    app_state: actix_web::web::Data<AppState>,
) -> actix_web::Result<impl Responder> {
    let book_id = query.0;
    let pool = &app_state.pool;

    let book = book::select_book(book_id, pool)
        .await
        .map_err(|_| actix_web::error::ErrorBadRequest("can't find book"))?;

    Ok(Json(book))
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
) -> actix_web::Result<impl Responder> {
    let start = query.0.start;
    let length = query.0.length;
    let pool = &app_state.pool;

    let book = book::list_books(start, length, pool)
        .await
        .map_err(|_| actix_web::error::ErrorBadRequest("can't find book"))?;

    Ok(Json(book))
}


// #[patch("/book")]
// pub async fn patch_book(query: Query<()>)
