use actix_web::{
    delete, get, patch, put,
    web::{self, Json},
};
use futures_util::future::join;

use crate::{
    header::JwtTokenHeader,
    repository::auth_user,
    util::types::{AppError, AppResult, AppState, Message},
};

#[derive(serde::Deserialize, serde::Serialize)]
pub struct Cart {
    user_email: String,
    book_id: String,
    quantity_ordered: i64,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct CartOrder {
    book_id: String,
    quantity_ordered: i64,
}

#[get("/api/cart")]
pub async fn get_cart(
    jwt_header: JwtTokenHeader,
    app_state: web::Data<AppState>,
) -> AppResult<Json<Vec<Cart>>> {
    let email = &jwt_header.email;
    let pool = &app_state.pool;
    let var_name = sqlx::query_as!(Cart, r#"select * from cart where user_email = ?"#, email);
    let fut_all = join(
        auth_user(&jwt_header, pool),
        var_name.fetch_all(pool),
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
    book_id: String,
}

#[delete("/api/cart")]
pub async fn delete_cart(
    data: Json<CartDeleteType>,
    jwt_header: JwtTokenHeader,
    app_state: web::Data<AppState>,
) -> AppResult<Json<Message<()>>> {
    let cart = &data.0;
    let pool = &app_state.pool;

    let auth = auth_user(&jwt_header, pool).await?;

    match auth {
        true => {
            sqlx::query!(
                "delete from cart where user_email = ? and book_id = ?",
                jwt_header.email,
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

#[put("/api/cart")]
pub async fn put_cart(
    data: Json<CartOrder>,
    jwt_header: JwtTokenHeader,
    app_state: web::Data<AppState>,
) -> actix_web::Result<Json<Message<()>>> {
    let cart = &data.0;
    let pool = &app_state.pool;

    let auth = auth_user(&jwt_header, pool).await?;
    
    match auth {
        true => {
            sqlx::query!(
                "insert into cart(user_email, book_id, quantity_ordered) values(?, ?, ?)",
                jwt_header.email,
                cart.book_id,
                cart.quantity_ordered
            )
            .execute(pool)
            .await
            .map_err(actix_web::error::ErrorNotFound)?;
            Ok(Json(Message { message: "update success", payload: None }))
        }
        false => Err(actix_web::error::ErrorUnauthorized("fail to authorized"))
    }
}

#[patch("/api/cart")]
pub async fn patch_cart(
    data: Json<CartOrder>,
    jwt_header: JwtTokenHeader,
    app_state: web::Data<AppState>,
) -> Result<Json<Message<()>>, AppError> {
    let cart = &data.0;
    let pool = &app_state.pool;

    let auth = auth_user(&jwt_header, pool).await?;

    match auth {
        true => {
            sqlx::query!(
                "update cart set quantity_ordered = ? where user_email = ? & book_id = ? ",
                cart.quantity_ordered,
                jwt_header.email,
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
