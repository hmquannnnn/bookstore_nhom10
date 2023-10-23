use std::error::Error;

use sqlx::MySqlPool;

use crate::util::types::{LoginError, UserAuth, ColumnField};

use super::update_one_field;


#[derive(sqlx::FromRow, serde::Serialize)]
pub struct User {
    pub email: String,
    pub name: String,
    pub phone: String,
    pub password: String,
    pub address: String,

    pub image_url: Option<String>,
}

async fn auth_user(user_auth: &UserAuth, pool: &MySqlPool) -> sqlx::Result<bool> {
    let user = sqlx::query_as!(UserAuth, "select email, password from user where email = ?", user_auth.email)
        .fetch_one(pool)
        .await?;
    Ok(user.password == user_auth.password)
}

pub async fn select_user(user_auth: UserAuth, pool: &MySqlPool) -> Result<User, Box<dyn Error>> {
    let user = sqlx::query_as!(User, "select * from user where email = ?", user_auth.email)
        .fetch_one(pool)
        .await?;
    if user.password != user_auth.password {
        return Err(Box::new(LoginError::WrongPassword));
    }
    Ok(user)
}


pub async fn update_user(user_auth: UserAuth, column_field: ColumnField, pool: &MySqlPool) -> Result<(), Box<dyn Error>> {
    let auth_success = auth_user(&user_auth, pool).await?;
    if auth_success {
        let id_field = ColumnField::new(String::from("email"), user_auth.email);
        update_one_field("user", id_field, column_field, pool).await?;
    } else {
        return Err(Box::new(LoginError::WrongPassword));
    }
    Ok(())
}




