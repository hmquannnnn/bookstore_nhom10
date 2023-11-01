mod api;
mod repository;
mod util;
mod header;
mod middleware;

use actix_cors::Cors;
use actix_web::{
    web::{self, Json},
    App, HttpServer, middleware::Logger, dev::Service
};
use api::{
    book::{get_book, list_book},
    image::{delete_image, get_image, put_image},
    index,
    user::{register_user, auth_test, user_login},
};
use header::TokenHeader;
use middleware::SayHi;
use sqlx::mysql::MySqlPoolOptions;
use util::types::AppState;
use futures_util::future::FutureExt;



#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    // load .env file
    let url = dotenv::var("DATABASE_URL").unwrap();
    let domain_name = match dotenv::var("DOMAIN_NAME") {
        Ok(value) => value,
        Err(_) => "localhost".to_owned()
    };
    let port = match dotenv::var("PORT") {
        Ok(value) => value.parse::<u16>().unwrap(),
        Err(_) => 8000
    };
    // connect to database
    let pool = MySqlPoolOptions::new()
        .max_connections(10)
        .connect(url.as_str())
        .await
        .unwrap();

    // migate database
    // sqlx::migrate!().run(&pool).await.unwrap();
    let base_url = "http://".to_owned() + domain_name.as_str() + ":" + port.to_string().as_str();
    let app_state = AppState {
        pool,
        base_url
     };
    
    // init server
    HttpServer::new(move || {
        let cors = Cors::default()
        .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        let app = 
            App::new()
            .wrap(cors)
            .wrap(SayHi)
            .wrap(Logger::new("for %{}"))
            .app_data(web::Data::new(app_state.clone()))
            .service(index)
            .service(get_image)
            .service(put_image)
            .service(delete_image)
            .service(get_book)
            .service(list_book)
            .service(user_login)
            .service(register_user)
            // .service(patch_user)
            .service(auth_test);
        app
            // .service(auth_test)
    })
    .bind((domain_name.as_str(), port))?
    .workers(2)
    .run()
    .await
}
