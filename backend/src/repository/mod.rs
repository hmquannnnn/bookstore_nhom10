// #[derive(sqlx::FromRow)]
// struct Image {
//     pub data: Vec<u8>,
// }

use sqlx::{MySqlPool, query};

use crate::util::types::{AuthError, ColumnField, UserAuth};

pub mod book;
pub mod image;
pub mod token;
pub mod user;

pub async fn auth_user(user_auth: &UserAuth, pool: &MySqlPool) -> Result<bool, AuthError> {
    let user = sqlx::query_as!(
        UserAuth,
        "select email, password from user where email = ?",
        user_auth.email
    )
    .fetch_one(pool)
    .await
    .map_err(|_| AuthError::FailAuthenticate)?;
    Ok(user.password == user_auth.password)
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
    user_auth: &UserAuth,
    table: &String,
    id_field: &ColumnField,
    value_field: &ColumnField,
    pool: &MySqlPool,
) -> Result<(), AuthError> {
    let auth_success = auth_user(user_auth, pool)
        .await
        .map_err(|_| AuthError::FailAuthenticate)?;

    match auth_success {
        true => {
            update_one_field(table, id_field, value_field, pool)
                .await
                .map_err(|_| AuthError::FailToUpdate)?;
            Ok(())
        }
        false => Err(AuthError::FailAuthenticate),
    }
}

pub async fn detete_auth(
    user_auth: &UserAuth,
    table: &String,
    field: &ColumnField,
    pool: &MySqlPool,
) -> Result<(), AuthError> {
    let auth_success = auth_user(user_auth, pool)
        .await
        .map_err(|_| AuthError::FailAuthenticate)?;

    match auth_success {
        true => {
            let query_str = format!("delete from {} where {} = ?", table, field.key);
            sqlx::query(&query_str)
                .bind(&field.value)
                .execute(pool)
                .await
                .map_err(|_| AuthError::FailToUpdate)?;
            Ok(())
        }
        false => Err(AuthError::FailAuthenticate),
    }
}

// pub async fn action_auth(
//     user_auth: &UserAuth,
//     table: &String,
//     id: &String,
//     pool: &MySqlPool,
//     action: impl Fn() -> ()
// ) -> Result<(), AuthError> {
//     let auth_success = auth_user(user_auth, pool)
//         .await
//         .map_err(|_| AuthError::FailAuthenticate)?;

//     match auth_success {
//         true => {
//             update_one_field(table, id_field, value_field, pool)
//                 .await
//                 .map_err(|_| AuthError::FailToUpdate)?;
//             Ok(())
//         }
//         false => Err(AuthError::FailAuthenticate),
//     }
// }