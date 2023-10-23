mod api;
mod repository;
mod util;

use actix_cors::Cors;
use actix_web::{
    http::{self},
    web::{self, Json},
    App, HttpServer, Responder,
};
use api::{
    book::{get_book, list_book},
    image::{delete_image, get_image, post_image},
    index,
    user::get_user,
};
use sqlx::mysql::MySqlPoolOptions;
use util::types::{AppState, UserAuth};

#[derive(serde::Serialize, serde::Deserialize)]
struct MyObj {
    name: String,
    number: i32,
}

#[derive(serde::Deserialize)]
struct FormData {
    username: String,
}


#[actix_web::get("/test")]
async fn test(form: web::Form<FormData>) -> actix_web::HttpResponse {
    actix_web::HttpResponse::Ok().body(format!("username: {}", form.username))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    // load .env file
    let url = match std::env::var("DATABASE_URL") {
        Ok(val) => val,
        Err(_) => panic!("can't read enviroment valriable"),
    };
    let url = url.as_str();

    // connect to database
    let pool = MySqlPoolOptions::new()
        .max_connections(10)
        .connect(url)
        .await
        .unwrap();

    // migate database
    sqlx::migrate!().run(&pool).await.unwrap();

    let app_state = AppState { pool };

    // init server
    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            .app_data(web::Data::new(app_state.clone()))
            .service(index)
            .service(get_image)
            .service(post_image)
            .service(delete_image)
            .service(get_book)
            .service(list_book)
            .service(get_user)
            .service(test)
    })
    .bind(("localhost", 8000))?
    .run()
    .await
}
