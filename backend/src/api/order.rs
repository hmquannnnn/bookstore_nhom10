use actix_web::{post, get, web::{self, Json}, error};
use sqlx::query_builder;

use crate::{header::JwtTokenHeader, util::types::{AppState, Message}, repository::{order::{Order, insert_order}, book::take_price}};


// #[post("/api/order")]
// pub async fn order(
//     jwt_header: JwtTokenHeader,
//     app_state: web::Data<AppState>,
// )
//
//

#[derive(serde::Deserialize, serde::Serialize)]
pub struct OrderDetail {
    pub(crate) book_id: String,
    pub(crate) quantity_ordered: i32,
}

#[derive(serde::Deserialize, serde::Serialize)]
struct OrderInsert {
    pub(crate) order_id: u64,
    pub(crate) book_id: String,
    pub(crate) quantity_ordered: i32,
    pub(crate) price_earch: f32,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct GetOrder {
    pub id: u64,
    pub user_email: String,
    pub book_id: String,
    pub quantity_ordered: i32,
    pub price_each: f32,
    pub order_date: String,
    pub require_date: Option<String>,
    pub status: Option<String>,
}

type MyResult<T> = actix_web::Result<Json<Message<T>>>;

#[get("/api/order")]
pub async fn get_order(
    jwt_header: JwtTokenHeader,
    app_state: web::Data<AppState>,
) -> MyResult<Vec<GetOrder>> {
    let user_email = jwt_header.email;
    let pool = &app_state.pool;
    let orders = sqlx::query_as!(GetOrder,
    "select orders.*, orderDetail.book_id, orderDetail.price_each, orderDetail.quantity_ordered from orders join orderDetail
        on orders.id = orderDetail.order_id
        where user_email = ?", user_email 
    ).fetch_all(pool)
    .await
    .map_err(error::ErrorNotFound)?;
    Ok(Json(Message{
        message: "user order",
        payload: Some(orders)
    }))
}

#[post["/api/order"]]
pub async fn post_order(
    jwt_header: JwtTokenHeader,
    details: Json<Vec<OrderDetail>>,
    app_state: web::Data<AppState>,
) -> MyResult<Order> {
    let pool = &app_state.pool;
    let user_email = &jwt_header.email;
    let details = details.0;
    let books_id: Vec<_> = details.iter().map(|detail| detail.book_id.clone()).collect();

    let book_prices = take_price(&books_id, pool)
        .await
        .map_err(error::ErrorBadRequest)?;

    let order = insert_order(pool, user_email)
        .await
        .map_err(actix_web::error::ErrorInternalServerError)?;

    let order_id = &order.id;

    let mut query_builder = 
        sqlx::QueryBuilder::new("insert into orderDetail(order_id, book_id, quantity_ordered, price_each) ");

    query_builder.push_values(details, |mut q, book| {
        let price_each = book_prices
            .iter()
            .find(|price| price.book_id == book.book_id)
            .unwrap()
            .price_each;
        q.push(order_id)
        .push(book.book_id)
        .push(book.quantity_ordered)
        .push(price_each);
    });

    query_builder.build()
        .execute(pool)
        .await
        .map_err(actix_web::error::ErrorInternalServerError)?;

    Ok(Json(Message{
        message: "update success",
        payload: Some(order)
    }))
}

#[post("/api/order/cancel")]
pub async fn cancel_order(
    jwt_header: JwtTokenHeader,
    order_id: Json<String>,
    app_state: web::Data<AppState>,
) -> MyResult<()> {
    let order_id = order_id.0;
    let user_email = jwt_header.email;
    let pool = &app_state.pool;
    sqlx::query!("update orders set status = \"cancel\" where id = ? and user_email = ?", order_id, user_email)
    .execute(pool)
    .await
    .map_err(error::ErrorBadRequest)?;
    Ok(Json(Message { message: "update success", payload: None }))
}

