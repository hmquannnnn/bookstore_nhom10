use actix_web::{
    delete, get, patch, put,
    web::{self, Json, Query},
};
use futures_util::future::join;


use crate::{
    header::JwtTokenHeader,
    repository::{auth_user},
    util::types::{AppError, AppResult, AppState, Message},
};

#[derive(serde::Deserialize, serde::Serialize)]
pub struct Cart {
    user_email: String,
    book_id: String,
    quantity_ordered: i64,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct CartQuery {
    email: String,
}

#[get("/cart")]
pub async fn get_cart(
    query: Query<CartQuery>,
    jwt_header: JwtTokenHeader,
    app_state: web::Data<AppState>,
) -> AppResult<Json<Vec<Cart>>> {
    // join!(auth_user(&jwt_header.to_user_auth(), &app_state.pool)).a
    let email = &query.email;
    let pool = &app_state.pool;
    let fut_all = join(
        auth_user(&jwt_header.to_user_auth(), pool),
        sqlx::query_as!(Cart, "select * from cart where user_email = ?", email).fetch_all(pool),
    )
    .await;

    let auth = fut_all.0?;
    let carts = fut_all.1.map_err(|_| AppError::FailToFetch)?;

    match auth {
        true => Ok(Json(carts)),
        false => Err(AppError::FailToFetch),
    }
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct CartDeleteType {
    user_email: String,
    book_id: String,
}

#[delete("/cart")]
pub async fn delete_cart(
    data: Json<CartDeleteType>,
    jwt_header: JwtTokenHeader,
    app_state: web::Data<AppState>,
) -> AppResult<Json<Message<()>>> {
    let cart = &data.0;
    let pool = &app_state.pool;

    let auth = auth_user(&jwt_header.to_user_auth(), pool).await?;

    match auth {
        true => {
            sqlx::query!(
                "delete from cart where user_email = ? and book_id = ?",
                cart.user_email,
                cart.book_id,
            )
            .execute(pool)
            .await
            .map_err(|_| AppError::FailToUpdate)?;
            Ok(Json(Message {
                message: "delete success",
                payload: None,
            }))
        }
        false => Err(AppError::FailAuthenticate),
    }
}

#[put("/cart")]
pub async fn put_cart(
    data: Json<Cart>,
    jwt_header: JwtTokenHeader,
    app_state: web::Data<AppState>,
) -> AppResult<Json<Cart>> {
    let cart = &data.0;
    let pool = &app_state.pool;

    let auth = auth_user(&jwt_header.to_user_auth(), pool).await?;

    match auth {
        true => {
            sqlx::query!(
                "insert into cart(user_email, book_id, quantity_ordered) values(?, ?, ?)",
                cart.user_email,
                cart.book_id,
                cart.quantity_ordered
            )
            .execute(pool)
            .await
            .map_err(|_| AppError::FailToUpdate)?;
            Ok(data)
        }
        false => Err(AppError::FailAuthenticate),
    }
}

#[patch("/cart")]
pub async fn patch_cart(
    data: Json<Cart>,
    jwt_header: JwtTokenHeader,
    app_state: web::Data<AppState>,
) -> Result<Json<Message<()>>, AppError> {
    let cart = &data.0;
    let pool = &app_state.pool;

    let auth = auth_user(&jwt_header.to_user_auth(), pool).await?;

    match auth {
        true => {
            sqlx::query!(
                "update cart set quantity_ordered = ? where user_email = ? & book_id = ? ",
                cart.quantity_ordered,
                cart.user_email,
                cart.book_id
            )
            .execute(pool)
            .await
            .map_err(|_| AppError::FailToUpdate)?;
            Ok(Json(Message {
                message: "update success",
                payload: None,
            }))
        }
        false => Err(AppError::FailAuthenticate),
    }
}
