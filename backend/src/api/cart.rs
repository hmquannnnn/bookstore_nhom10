use actix_web::{
    get,
    web::{self, Json, Query},
    HttpResponse, put,
};
use futures_util::future::join;
use sqlx::query;

use crate::{
    header::JwtTokenHeader,
    repository::{auth_user, book::Book},
    util::types::{AppState, AuthError},
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
) -> Result<Json<Vec<Cart>>, AuthError> {
    // join!(auth_user(&jwt_header.into_user_auth(), &app_state.pool)).a
    let email = &query.email;
    let pool = &app_state.pool;
    let fut_all = join(
        auth_user(&jwt_header.into_user_auth(), pool),
        sqlx::query_as!(Cart, "select * from cart where user_email = ?", email).fetch_all(pool),
    )
    .await;

    let auth = fut_all.0?;
    let carts = fut_all.1.map_err(|_| AuthError::FailToFetch)?;

    match auth {
        true => Ok(Json(carts)),
        false => Err(AuthError::FailToFetch),
    }
}

#[put("/cart")]
pub async fn put_cart(
    data: Json<Cart>,
    jwt_header: JwtTokenHeader,
    app_state: web::Data<AppState>,
) -> Result<Json<Cart>, AuthError> {
    let cart = &data.0;
    let pool = &app_state.pool;

    let auth = auth_user(&jwt_header.into_user_auth(), pool).await?;

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
            .map_err(|_| AuthError::FailToUpdate)?;
            Ok(data)
        }
        false => Err(AuthError::FailAuthenticate),
    }
}
