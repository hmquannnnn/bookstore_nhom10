use sqlx::MySqlPool;


#[derive(serde::Serialize, sqlx::prelude::FromRow)]
pub struct Order {
    pub id: u64,
    pub user_email: String,
    pub order_date: String,
    pub require_date: Option<String>,
    pub status: Option<String>, 
}


pub async fn insert_order(
    pool: &MySqlPool,
    user_email: &String,
) -> sqlx::Result<Order> {
    let order_id = uuid::Uuid::new_v4().to_u128_le() as u64;
    println!("{order_id}");
    sqlx::query!(
    "insert into orders(id, user_email, order_date, require_date, status) values (?, ?, now(), adddate(now(), 3), ?)", order_id, user_email, "on")
        .execute(pool)
        .await?;
    let order = sqlx::query_as!(Order,
    "select * from orders where id = ?", order_id)
        .fetch_one(pool)
        .await?;
    Ok(order)
}
