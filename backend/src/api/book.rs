use actix_web::{web::{Json, Query}, get, Responder, patch};

use crate::{util::types::AppState, repository::book::{Book, self}};

// #[get("/image")]
// pub async fn get_image(query: web::Query<ImageInfo>, app_state: web::Data<AppState>) -> HttpResponse {


#[get("/book")]
pub async fn get_book(query: Query<String>, app_state: actix_web::web::Data<AppState>) -> actix_web::Result<impl Responder> {
    let book_id = query.0;
    let pool = &app_state.pool;

    let book = book::select_book(book_id, pool)
        .await;

    match book {
        Ok(book) => {
            return Ok(Json(book));
        },
        Err(_) => {
            return Err(actix_web::error::ErrorBadRequest("can't find book"));
        }
    }
}

#[get("/book/list")]
pub async fn list_book(query: Query<(i32, i32)>, app_state: actix_web::web::Data<AppState>) -> actix_web::Result<impl Responder> {
    let start = query.0.0;
    let length = query.0.1;
    let pool = &app_state.pool;

    let book = book::list_books(start, length, pool)
        .await;

    match book {
        Ok(book) => {
            return Ok(Json(book));
        },
        Err(_) => {
            return Err(actix_web::error::ErrorBadRequest("can't find book"));
        }
    }
}


// #[patch("/book")]
// pub async fn patch_book(query: Query<()>)