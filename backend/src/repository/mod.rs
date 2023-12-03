// #[derive(sqlx::FromRow)]
// struct Image {
//     pub data: Vec<u8>,
// }

use sqlx::MySqlPool;

use crate::{util::types::{AppError, ColumnField}, header::JwtTokenHeader};

pub mod book;
pub mod image;
pub mod token;
pub mod user;
pub mod genre;
pub mod alias;

pub async fn auth_user(user_auth: &JwtTokenHeader, pool: &MySqlPool) -> Result<bool, AppError> {
    let user = sqlx::query!(
        "select email, password from user where email = ?",
        user_auth.email
    )
    .fetch_one(pool)
    .await
    .map_err(|_| AppError::FailAuthenticate)?;
    Ok(user.password == user_auth.password)
}

pub async fn auth_admin(admin_auth: &JwtTokenHeader, pool: &MySqlPool) -> Result<bool, AppError> {
    let user = sqlx::query!(
        "select email, password from user where email = ? and role = \"admin\"",
        admin_auth.email
    )
    .fetch_one(pool)
    .await
    .map_err(|_| AppError::FailAuthenticate)?;
    Ok(user.password == admin_auth.password)
}

pub async fn update_one_field(
    table: &String,
    id_field: &ColumnField,
    value_field: &ColumnField,
    pool: &MySqlPool,
) -> sqlx::Result<()> {
    let query_str: String = format!(
        "update {} set {} = ? where {} = ?",
        table, value_field.key, id_field.key
    );
    sqlx::query(&query_str)
        .bind(&value_field.value)
        .bind(&id_field.value)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn update_one_field_auth(
    user_auth: &JwtTokenHeader,
    table: &String,
    id_field: &ColumnField,
    value_field: &ColumnField,
    pool: &MySqlPool,
) -> Result<(), AppError> {
    let auth_success = auth_user(user_auth, pool)
        .await
        .map_err(|_| AppError::FailAuthenticate)?;

    match auth_success {
        true => {
            update_one_field(table, id_field, value_field, pool)
                .await
                .map_err(|_| AppError::FailToUpdate)?;
            Ok(())
        }
        false => Err(AppError::FailAuthenticate),
    }
}

pub async fn detete_auth(
    user_auth: &JwtTokenHeader,
    table: &String,
    field: &ColumnField,
    pool: &MySqlPool,
) -> Result<(), AppError> {
    let auth_success = auth_admin(user_auth, pool)
        .await?;

    match auth_success {
        true => {
            let query_str = format!("delete from {} where {} = ?", table, field.key);
            sqlx::query(&query_str)
                .bind(&field.value)
                .execute(pool)
                .await
                .map_err(|_| AppError::FailToUpdate)?;
            Ok(())
        }
        false => Err(AppError::FailAuthenticate),
    }
}

// pub async fn action_auth(
//     user_auth: &JwtTokenHeader,
//     table: &String,
//     id: &String,
//     pool: &MySqlPool,
//     action: impl Fn() -> ()
// ) -> Result<(), AppError> {
//     let auth_success = auth_user(user_auth, pool)
//         .await
//         .map_err(|_| AppError::FailAuthenticate)?;

//     match auth_success {
//         true => {
//             update_one_field(table, id_field, value_field, pool)
//                 .await
//                 .map_err(|_| AppError::FailToUpdate)?;
//             Ok(())
//         }
//         false => Err(AppError::FailAuthenticate),
//     }
// }
