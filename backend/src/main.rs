mod api;
mod repository;
mod util;

use actix_cors::Cors;
use actix_web::{
    web::{self},
    App, HttpServer,
};
use api::{
    book::{get_book, list_book},
    image::{delete_image, get_image, put_image},
    index,
    user::get_user,
};
use sqlx::mysql::MySqlPoolOptions;
use util::types::AppState;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    // load .env file
    let url = dotenv::var("DATABASE_URL").unwrap();
    let domain_name = dotenv::var("DOMAIN_NAME").unwrap();
    let port = dotenv::var("PORT").unwrap().parse::<u16>().unwrap();
    // connect to database
    let pool = MySqlPoolOptions::new()
        .max_connections(10)
        .connect(url.as_str())
        .await
        .unwrap();

    // migate database
    sqlx::migrate!("./migrations").run(&pool).await.unwrap();

    let app_state = AppState { 
        pool,
        base_url: "http://".to_owned() + domain_name.as_str() + port.to_string().as_str()
     };
    
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
            .service(put_image)
            .service(delete_image)
            .service(get_book)
            .service(list_book)
            .service(get_user)
    })
    .bind((domain_name.as_str(), port))?
    .workers(2)
    .run()
    .await
}
