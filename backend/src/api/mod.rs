use actix_web::{
    get, Responder, web::Json, Error
};


pub mod image;
pub mod book;
pub mod user;

#[get("/")]
pub async fn index() -> impl Responder {
    Json("Server is running")
}
