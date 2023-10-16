use std::error::Error;

use sqlx::MySqlPool;

use crate::util::types::LoginError;


#[derive(sqlx::FromRow, serde::Serialize)]
pub struct User {
    pub email: String,
    pub name: String,
    pub phone: String,
    pub password: String,
    pub address: String,

    pub image_url: Option<String>,
}

pub async fn select_user(email: String, password: String, pool: &MySqlPool) -> Result<User, Box<dyn Error>> {
    let user = sqlx::query_as!(User, "select * from user where email = ?", email)
        .fetch_one(pool)
        .await?;
    if user.password != password {
        return Err(Box::new(LoginError::WrongPassword));
    }
    Ok(user)
}



