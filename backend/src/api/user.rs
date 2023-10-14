use actix_web::{web::{Json, Query}, Responder, get};

use crate::{repository::user, util::types::AppState};


#[derive(serde::Deserialize)]
struct UserLoginInfo {
    email: String,
    password: String
}

#[get("/user")]
pub async fn get_user(query: Query<UserLoginInfo>, app_state: actix_web::web::Data<AppState>) -> actix_web::Result<impl Responder> {
    let email = query.0.email;
    let password = query.0.password;
    let pool = &app_state.pool;

    let book = user::select_user(email, password, pool)
        .await;

    match book {
        Ok(book) => {
            return Ok(Json(book));
        },
        Err(_) => {
            return Err(actix_web::error::ErrorBadRequest("can't find book"));
        }
    }
}