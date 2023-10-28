use std::error::Error;

use actix_web::{web::{Json, self}, Responder, post, HttpResponse, patch, http::{header, self}};
use actix_web_httpauth::{headers::authorization::{Authorization, Basic}, extractors::basic::BasicAuth};

use crate::{repository::{user::{self, User}}, util::types::{AppState, UserAuth}};


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


#[post("/user/resigter")]
pub async fn resigter_user(data: Json<User>, app_state: web::Data<AppState>) -> actix_web::Result<HttpResponse> {
    let new_user = data.into_inner();
    let new_user = user::insert_user(new_user, &app_state.pool)
    .await.map_err(|_| actix_web::error::ContentTypeError::ParseError)?;
    Ok(HttpResponse::Ok().json(new_user))
}

// pub struct Basic {
//     data: String,
// }

#[patch("/user/field/{field}")]
pub async fn patch_user(path: web::Path<String>, header: BasicAuth, app_state: web::Data<AppState>) -> actix_web::Result<HttpResponse> {
    Ok(HttpResponse::Ok().body(format!("path: {}, header: {}", path.into_inner(), header.password().unwrap())))
}