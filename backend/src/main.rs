mod api;
mod header;
mod middleware;
mod repository;
mod util;
mod body;

use actix_cors::Cors;
use actix_web::{
    web::{self, Json},
    App, HttpServer
};
use api::{
    book::{get_book, list_book},
    cart::{delete_cart, get_cart, patch_cart, put_cart},
    image::{delete_image, get_image, put_image},
    index,
    user::{register_user, user_login, get_user, insert_image_user, update_user_name, update_user_phone, update_user_address}, update,
};

use middleware::SayHi;
use sqlx::mysql::MySqlPoolOptions;
use util::types::AppState;

#[actix_web::get("/any")]
pub async fn any_type(
    payload: Json<serde_json::Value>
) -> Json<serde_json::Value> {
    let value = payload.0.as_object().unwrap();
    for v in value.into_iter() {
        println!("{} {}", v.0, v.1);
    }
    Json(payload.0)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    // load .env file
    let url = dotenv::var("DATABASE_URL").unwrap();
    let domain_name = match dotenv::var("DOMAIN_NAME") {
        Ok(value) => value,
        Err(_) => "localhost".to_owned(),
    };
    let port = match dotenv::var("PORT") {
        Ok(value) => value.parse::<u16>().unwrap(),
        Err(_) => 8000,
    };
    // connect to database
    let pool = MySqlPoolOptions::new()
        .max_connections(10)
        .connect(url.as_str())
        .await
        .unwrap();

    // migate database
    match sqlx::migrate!().run(&pool).await {
        Ok(_) => println!("migrate success"),
        Err(_) => println!("migrate fail"),
    };
    let base_url = "http://".to_owned() + domain_name.as_str() + ":" + port.to_string().as_str();
    let app_state = AppState { pool, base_url };

    // init server
    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        let app = App::new()
            .wrap(cors)
            .wrap(SayHi)
            .app_data(web::Data::new(app_state.clone()))
            .service(index)
            .service(get_image)
            .service(put_image)
            .service(delete_image)
            .service(get_book)
            .service(list_book)
            .service(user_login)
            .service(register_user)
            .service(get_user)
            .service(update)
            .service(get_cart)
            .service(put_cart)
            .service(patch_cart)
            .service(delete_cart)
            .service(insert_image_user)
            .service(update_user_name)
            .service(update_user_phone)
            .service(update_user_address)
            ;
        app
        // .service(auth_test)
    })
    .bind((domain_name.as_str(), port))?
    .workers(2)
    .run()
    .await
}
