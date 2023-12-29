mod api;
mod app_macro;
mod body;
mod header;
mod middleware;
mod repository;
mod util;

use actix_cors::Cors;
use actix_web::{web, App, HttpServer};
use api::book::{
    filter_ratting_higher, get_books, patch_book_image, search_book, search_book_by_author,
};
use api::cart::delete_cart;
use api::payment::post_pay;
use api::{
    book::{
        fetch_book_by_genre, fetch_filter_price, fetch_filter_price_genre, fetch_sorted_books,
        fetch_sorted_books_asc, fetch_sorted_books_price_asc, fetch_sorted_books_price_desc,
        fetch_sorted_books_purchse_asc, fetch_sorted_books_purchse_desc, get_book, list_book,
        update_book_descption, update_book_price, update_book_title,
    },
    cart::{get_cart, order_cart, patch_cart, put_cart},
    genre::get_genres,
    image::{delete_image, get_image, put_image},
    order::{cancel_order, get_order, post_order},
    update,
    user::{
        get_user, insert_image_user, patch_user_image, register_user, update_user_address,
        update_user_name, update_user_password, update_user_phone, user_login,
    },
};

use actix_files as fs;
use sqlx::mysql::MySqlPoolOptions;
use util::types::AppState;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    // load .env file
    let url = dotenv::var("DATABASE_URL").unwrap();
    let domain_name = match dotenv::var("DOMAIN_NAME") {
        Ok(value) => value,
        Err(_) => "127.0.0.1".to_owned(),
    };
    let port = match dotenv::var("PORT") {
        Ok(value) => value.parse::<u16>().unwrap(),
        Err(_) => 8000,
    };

    let static_dist: String = match dotenv::var("STATIC_LOCATION") {
        Ok(value) => value,
        Err(_) => "./dist".to_owned(),
    };

    // connect to database
    let pool = MySqlPoolOptions::new()
        .max_connections(10)
        .connect(url.as_str())
        .await;
    let pool = match pool {
        Ok(pool) => pool,
        Err(err) => {
            println!("mysql: {url}, domain: {domain_name}:{port}");
            panic!("{err}");
        }
    };

    // migate database
    match sqlx::migrate!().run(&pool).await {
        Ok(_) => println!("migrate success"),
        Err(_) => println!("migrate fail"),
    };

    let base_url = domain_name.to_string();
    println!("base_url: {base_url}");
    println!("mysql: {url}");
    println!("port: {port }");
    println!("domain_name: {domain_name}");
    println!("static_dist: {static_dist}");

    let app_state = AppState { pool, base_url };

    // init server
    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            .service(
                fs::Files::new("/dang-nhap", &static_dist)
                    .use_last_modified(true)
                    .index_file("index.html"),
            )
            .service(
                fs::Files::new("/dang-ky", &static_dist)
                    .use_last_modified(true)
                    .index_file("index.html"),
            )
            .service(
                fs::Files::new("/gioi-thieu", &static_dist)
                    .use_last_modified(true)
                    .index_file("index.html"),
            )
            .service(
                fs::Files::new("/gio-hang", &static_dist)
                    .use_last_modified(true)
                    .index_file("index.html"),
            )
            .service(
                fs::Files::new("/admin/books", &static_dist)
                    .use_last_modified(true)
                    .index_file("index.html"),
            )
            .service(
                fs::Files::new("/admin/users", &static_dist)
                    .use_last_modified(true)
                    .index_file("index.html"),
            )
            .service(
                fs::Files::new("/admin/orders", &static_dist)
                    .use_last_modified(true)
                    .index_file("index.html"),
            )
            .service(
                fs::Files::new("/doi-so-dien-thoai", &static_dist)
                    .use_last_modified(true)
                    .index_file("index.html"),
            )
            .service(
                fs::Files::new("/thong-tin-tai-khoan", &static_dist)
                    .use_last_modified(true)
                    .index_file("index.html"),
            )
            .service(
                fs::Files::new("/doi-mat-khau", &static_dist)
                    .use_last_modified(true)
                    .index_file("index.html"),
            )
            .service(
                fs::Files::new("/thong-tin-sach", &static_dist)
                    .use_last_modified(true)
                    .index_file("index.html"),
            )
            .service(
                fs::Files::new("/tim-kiem", &static_dist)
                    .use_last_modified(true)
                    .index_file("index.html"),
            )
            .service(
                fs::Files::new("/lich-su-dat-hang", &static_dist)
                    .use_last_modified(true)
                    .index_file("index.html"),
            )
            .service(
                fs::Files::new("/thanh-toan", &static_dist)
                    .use_last_modified(true)
                    .index_file("index.html"),
            )
            .app_data(web::Data::new(app_state.clone()))
            .service(
                web::scope("/api")
                    .service(get_image)
                    .service(put_image)
                    .service(delete_image)
                    .service(get_book)
                    .service(get_books)
                    .service(search_book)
                    .service(search_book_by_author)
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
                    .service(filter_ratting_higher)
                    .service(order_cart)
                    .service(post_order)
                    .service(get_order)
                    .service(cancel_order)
                    .service(post_pay),
            )
            .service(
                fs::Files::new("/", &static_dist)
                    .use_last_modified(true)
                    .index_file("index.html"),
            )
    })
    .bind((domain_name, port))?
    .run()
    .await
}
