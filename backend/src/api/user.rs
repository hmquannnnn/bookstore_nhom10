use actix_web::{web::{Json, self}, Responder, post};

use crate::{repository::user::{self, User}, util::types::{AppState, UserAuth}};


#[post("/user")]
pub async fn get_user(data: Json<UserAuth>, app_state: actix_web::web::Data<AppState>) -> actix_web::Result<impl Responder> {
    let user_auth = data.0;
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



// #[post("/user/resigter")]
// pub async fn resigter_user(data: Json<User>, app_state: web::Data<AppState>) -> actix_web::Result<impl Responder> {

// }

// #[patch("/user/name")]
// pub async fn patch_name(q)