use actix_web::{web::{Json, Query}, Responder, get, patch};

use crate::{repository::user, util::types::{AppState, UserAuth}};


#[get("/user")]
pub async fn get_user(query: Query<UserAuth>, app_state: actix_web::web::Data<AppState>) -> actix_web::Result<impl Responder> {
    let user_auth = query.0;
    let pool = &app_state.pool;

    let user = user::select_user(user_auth, pool)
        .await;

    match user {
        Ok(user) => {
            return Ok(Json(user));
        },
        Err(error) => {
            return Err(actix_web::error::ErrorBadRequest(error));
        }
    }
}


// #[patch("/user/name")]
// pub async fn patch_name(q)