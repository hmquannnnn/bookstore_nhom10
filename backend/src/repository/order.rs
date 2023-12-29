use std::fmt::Display;

use futures_util::future::join;
use sqlx::MySqlPool;

#[derive(serde::Serialize, serde::Deserialize)]
pub enum OrderStatus {
    Cancel,
    OnGoing,
    Any(String),
}

impl Display for OrderStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            OrderStatus::Cancel => {
                write!(f, "cancel")
            }
            OrderStatus::OnGoing => {
                write!(f, "on")
            }
            OrderStatus::Any(value) => {
                write!(f, "{value}")
            }
        }
    }
}

// #[derive(serde::Deserialize, serde::Serialize)]
// pub struct OrderStatus(String);

#[derive(serde::Serialize, sqlx::FromRow)]
pub struct Order {
    pub id: u64,
    pub user_email: String,
    pub order_date: String,
    pub require_date: Option<String>,
    pub status: Option<String>,
}

#[derive(serde::Serialize)]
pub struct OrderSend {
    pub id: String,
    pub user_email: String,
    pub order_date: String,
    pub require_date: Option<String>,
    pub status: Option<String>,
}

impl Into<OrderSend> for Order {
    fn into(self) -> OrderSend {
        OrderSend {
            id: self.id.to_string(),
            user_email: self.user_email,
            order_date: self.order_date,
            require_date: self.require_date,
            status: self.status,
        }
    }
}

pub async fn insert_order(pool: &MySqlPool, user_email: &String) -> sqlx::Result<Order> {
    let order_id = uuid::Uuid::new_v4().to_u128_le() as u64;

    sqlx::query!(
    "insert into orders(id, user_email, order_date, require_date, status) values (?, ?, now(), adddate(now(), 3), ?)", order_id, user_email, "on")
        .execute(pool)
        .await?;
    let order = sqlx::query_as!(Order, "select * from orders where id = ?", order_id)
        .fetch_one(pool)
        .await?;
    Ok(order)
}

#[derive(serde::Serialize)]
pub struct OrderPrice {
    pub order_id: u64,
    pub price: Option<f64>,
}

#[derive(serde::Serialize)]
pub(self) struct UserOrder {
    order_id: u64,
    user_email: String,
}

pub async fn get_order_price(
    pool: &MySqlPool,
    order_id: u64,
    user_email: &String,
) -> sqlx::Result<OrderPrice> {
    let fut_all = join(
        sqlx::query_as!(
            UserOrder,
            "select id order_id, user_email from orders where id = ? and user_email = ?",
            order_id,
            user_email
        )
        .fetch_one(pool),
        sqlx::query_as!(
            OrderPrice,
            "select order_id, sum(price_each * quantity_ordered) price from orderdetail 
        where order_id = ?
        group by order_id",
            order_id
        )
        .fetch_one(pool),
    )
    .await;

    let _user_order = fut_all.0?;
    let order_price = fut_all.1?;

    Ok(order_price)
}
