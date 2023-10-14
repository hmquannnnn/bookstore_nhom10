use actix_web::{
    get, Responder
};


pub mod image;
pub mod book;
pub mod user;

#[get("/")]
pub async fn index() -> impl Responder {
    "Server is running"
}
