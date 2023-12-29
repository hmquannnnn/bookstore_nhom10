use actix_web::{
    error, get, post,
    web::{self, Json},
};

use crate::{
    header::JwtTokenHeader,
    repository::{
        book::take_price,
        order::{insert_order, OrderSend},
    },
    util::types::{AppState, Message},
};

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

#[derive(serde::Deserialize)]
pub struct GetOrder {
    pub id: u64,
    pub title: String,
    pub back_page_url: Option<String>,
    pub front_page_url: Option<String>,
    pub user_email: String,
    pub book_id: String,
    pub quantity_ordered: i32,
    pub price_each: f32,
    pub order_date: String,
    pub require_date: Option<String>,
    pub status: Option<String>,
}

#[derive(serde::Serialize)]
pub struct GetOrderSend {
    pub id: String,
    pub title: String,
    pub back_page_url: Option<String>,
    pub front_page_url: Option<String>,
    pub user_email: String,
    pub book_id: String,
    pub quantity_ordered: i32,
    pub price_each: f32,
    pub order_date: String,
    pub require_date: Option<String>,
    pub status: Option<String>,
}


impl From<GetOrder> for GetOrderSend {
    fn from(value: GetOrder) -> Self {
        GetOrderSend {
            id: value.id.to_string(),
            title: value.title,
            back_page_url: value.back_page_url,
            front_page_url: value.front_page_url,
            user_email: value.user_email,
            book_id: value.book_id,
            quantity_ordered: value.quantity_ordered,
            price_each: value.price_each,
            order_date: value.order_date,
            require_date: value.require_date,
            status: value.status,
        }
    }
}


type MyResult<T> = actix_web::Result<Json<Message<T>>>;

#[get("/order")]
pub async fn get_order(
    jwt_header: JwtTokenHeader,
    app_state: web::Data<AppState>,
) -> MyResult<Vec<GetOrderSend>> {
    let user_email = jwt_header.email;
    let pool = &app_state.pool;
    let orders = sqlx::query_as!(
        GetOrder,
        "select book.title, book.back_page_url, book.front_page_url, orders.* from book
    join (
        select orders.*, orderdetail.book_id, orderdetail.price_each, orderdetail.quantity_ordered 
        from orders 
        join orderdetail 
        on orders.id = orderdetail.order_id
        where user_email = ? and orders.status != \"cancel\"
    ) orders
    on book.id = orders.book_id",
        user_email
    )
    .fetch_all(pool)
    .await
    .map_err(error::ErrorNotFound)?;
    Ok(Json(Message {
        message: "user order",
        payload: Some(orders.into_iter().map(GetOrderSend::from).collect()),
    }))
}

#[post["/order"]]
pub async fn post_order(
    jwt_header: JwtTokenHeader,
    details: Json<Vec<OrderDetail>>,
    app_state: web::Data<AppState>,
) -> MyResult<OrderSend> {
    let pool = &app_state.pool;
    let user_email = &jwt_header.email;
    let details = details.0;
    let books_id: Vec<_> = details
        .iter()
        .map(|detail| detail.book_id.clone())
        .collect();

    let book_prices = take_price(&books_id, pool)
        .await
        .map_err(error::ErrorBadRequest)?;

    let order = insert_order(pool, user_email)
        .await
        .map_err(actix_web::error::ErrorInternalServerError)?;

    let order_id = &order.id;

    let mut query_builder = sqlx::QueryBuilder::new(
        "insert into orderdetail(order_id, book_id, quantity_ordered, price_each) ",
    );

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

    query_builder
        .build()
        .execute(pool)
        .await
        .map_err(actix_web::error::ErrorInternalServerError)?;

    Ok(Json(Message {
        message: "update success",
        payload: Some(order.into()),
    }))
}

#[post("/order/cancel")]
pub async fn cancel_order(
    jwt_header: JwtTokenHeader,
    order_id: Json<String>,
    app_state: web::Data<AppState>,
) -> MyResult<()> {
    let order_id = order_id.0;
    let user_email = jwt_header.email;
    let pool = &app_state.pool;
    sqlx::query!(
        "update orders set status = \"cancel\" where id = ? and user_email = ?",
        order_id,
        user_email
    )
    .execute(pool)
    .await
    .map_err(error::ErrorBadRequest)?;
    Ok(Json(Message {
        message: "update success",
        payload: None,
    }))
}
