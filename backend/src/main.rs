mod api;
mod repository;
mod util; 

use api::{index, image::{get_image, post_image, delete_image}, book::{get_book, list_book}, user::get_user};
use sqlx::{MySqlPool, mysql::MySqlPoolOptions};
use actix_web::{
    HttpServer, App, web 
};
use util::types::AppState;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // load .env file
    dotenv::dotenv().ok();
    let url = match std::env::var("DATABASE_URL") {
        Ok(val) => val,
        Err(_) => panic!("can't read enviroment valriable")
    };
    let url = url.as_str();

    // connect to database
    let pool: MySqlPool = MySqlPoolOptions::new()
        .max_connections(10)
        .connect(url)
        .await
        .unwrap();

    // migate database
    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .unwrap();

    let app_state = AppState { pool };

    // init server
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(app_state.clone()))
            .service(index)
            .service(get_image)
            .service(post_image)
            .service(delete_image)
            .service(get_book)
            .service(list_book)
            .service(get_user)
    })
    .bind(("localhost", 8000))?
    .run()
    .await
}

