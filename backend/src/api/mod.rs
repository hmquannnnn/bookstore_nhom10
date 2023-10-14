use actix_web::{
    get, Responder
};


pub mod image;


#[get("/")]
pub async fn index() -> impl Responder {
    "Server is running"
}
