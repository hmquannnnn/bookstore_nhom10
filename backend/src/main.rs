mod api;
mod app_macro;
mod body;
mod header;
mod middleware;
mod repository;
mod util;
use actix_cors::Cors;
use actix_files as fs;
use actix_web::{
    web,
    App, HttpServer,
};
use api::{
    book::{
        fetch_book_by_genre, fetch_sorted_books, fetch_sorted_books_asc,
        fetch_sorted_books_price_asc, fetch_sorted_books_price_desc,
        fetch_sorted_books_purchse_asc, fetch_sorted_books_purchse_desc, get_book, list_book,
        update_book_descption, update_book_price, update_book_title, fetch_filter_price, fetch_filter_price_genre,
    },
    cart::{get_cart, patch_cart, put_cart, order_cart},
    genre::get_genres,
    image::{delete_image, get_image, put_image},
    update,
    user::{
        get_user, insert_image_user, patch_user_image, register_user, update_user_address,
        update_user_name, update_user_password, update_user_phone, user_login,
    }, assets, order::{ post_order, get_order, cancel_order}, handler, index
};
use api::cart::delete_cart;
use api::book::patch_book_image;

use middleware::SayHi;
use sqlx::mysql::MySqlPoolOptions;
use util::types::AppState;

// #[actix_web::get("/any")]
// pub async fn any_type(payload: Json<serde_json::Value>) -> Json<serde_json::Value> {
//     let value = payload.0.as_object().unwrap();
//     for v in value.into_iter() {
//         println!("{} {}", v.0, v.1);
//     }
//     Json(payload.0)
// }

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
        .unwrap(); // migate database match sqlx::migrate!().run(&pool).await { Ok(_) => println!("migrate success"), Err(_) => println!("migrate fail"), };

    let base_url = format!("{}{}:{}", "http://", domain_name, port);
    let app_state = AppState { pool, base_url };

    // init server
    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            // .wrap(SayHi)
            // .wrap(Logger::new("%a %{User-Agent}i"))
            .app_data(web::Data::new(app_state.clone()))
            // .service(fs::Files::new("/static", "./dist").use_last_modified(true))
            .service(index)
            .service(assets)
            .service(web::resource("/dang-nhap").to(handler))
            .service(web::resource("/dang-ky").to(handler))
            .service(web::resource("/gioi-thieu").to(handler))
            .service(web::resource("/gio-hang").to(handler))
            .service(web::resource("/admin/books").to(handler))
            .service(web::resource("/admin/users").to(handler))
            .service(web::resource("/admin/orders").to(handler))
            .service(web::resource("/doi-so-dien-thoai").to(handler))
            .service(web::resource("/doi-mat-khau").to(handler))
            .service(web::resource("/thong-tin-sach").to(handler))
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
            .service(patch_user_image)
            .service(update_user_password)
            .service(patch_book_image)
            .service(update_book_title)
            .service(update_book_price)
            .service(update_book_descption)
            .service(get_genres)
            .service(fetch_sorted_books)
            .service(fetch_sorted_books_asc)
            .service(fetch_sorted_books_purchse_asc)
            .service(fetch_sorted_books_purchse_desc)
            .service(fetch_sorted_books_price_asc)
            .service(fetch_sorted_books_price_desc)
            .service(fetch_filter_price)
            .service(fetch_book_by_genre)
            .service(fetch_filter_price_genre)
            .service(order_cart)
            .service(post_order)
            .service(get_order)
            .service(cancel_order)
    })
    .bind((domain_name.as_str(), port))?
    .run()
    .await
}
