use std::error::Error;
use actix_web::web::{Json, self};
use sqlx::MySqlPool;
use serde::{Deserialize, Serialize};
use crate::{util::types::{ColumnField, AppError, UserAuth}};
use super::{token::{make_token}, update_one_field, auth_user};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct User {
    pub email: String,
    pub name: String,
    pub phone: Option<String>,
    pub password: String,
    pub address: String,
    pub role: String,

    pub image_url: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct UserResponse {
    pub user: User,
    pub token: String,
}

pub async fn select_user(user_email: &String, pool: &MySqlPool) -> Result<User, Box<dyn Error>> {
    let user = sqlx::query_as!(User, "select * from user where email = ?", user_email)
        .fetch_one(pool)
        .await?;
    // let token = insert_token(&user_auth, pool).await?;
    // let token = make_token(&user)?;
    Ok(user)
}


#[derive(sqlx::FromRow, serde::Serialize, serde::Deserialize, Debug)]
pub struct UserInsert {
    pub email: String,
    pub name: String,
    pub phone: Option<String>,
    pub password: String,
    pub address: String,

    pub image_url: Option<String>,
}

pub async fn insert_user(user: UserInsert, pool: &MySqlPool) -> sqlx::Result<UserInsert> {
    sqlx::query!("insert into user(email, name, password, phone, address, role, image_url) values(?, ?, ?, ?, ?, ?, ?)",
        user.email,
        user.name,
        user.password,
        user.phone,
        user.address,
        "user",
        user.image_url
    )
    .execute(pool)
    .await?;
    Ok(user)
}

// pub async fn update_user(
//     user_auth: UserAuth,
//     column_field: ColumnField,
//     pool: &MySqlPool,
// ) -> Result<(), Box<dyn Error>> {
//     let auth_success = auth_user(&user_auth, pool).await?;
//     if auth_success {
//         let id_field = ColumnField::new(String::from("email"), user_auth.email);
//         update_one_field(&"user".to_string(), &id_field, &column_field, pool).await?;
//     } else {
//         return Err(Box::new(AppError::WrongPassword));
//     }
//     Ok(())
// }
