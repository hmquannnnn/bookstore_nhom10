use actix_web::{
    get, delete, Responder, web::{Json, self}, Error, patch, error as actix_error, HttpResponse, Result as ActixResut
};

use crate::{util::types::{UserAuth, ColumnField, AppState}, header::JwtTokenHeader, repository::{update_one_field_auth, self}};


pub mod image;
pub mod book;
pub mod user;
pub mod cart;

#[get("/")]
pub async fn index() -> impl Responder {
    Json("Server is running")
}


#[derive(serde::Serialize, serde::Deserialize)]
struct UpdateType {
    id_field: ColumnField,
    value_field: ColumnField
}


#[patch("update/{table}")]
pub async fn update(path: web::Path<String>, jwt_header: JwtTokenHeader, data: Json<UpdateType>, app_state: web::Data<AppState>) -> actix_web::Result<impl Responder> {
    let id_field = &data.0.id_field;
    let value_field = &data.0.value_field;
    update_one_field_auth(&jwt_header.to_user_auth(), &path.into_inner(), id_field, value_field, &app_state.pool).await
    .map_err(|error| actix_error::ErrorNotAcceptable(error.to_string()))?;
    Ok(HttpResponse::Accepted().body("update success"))
}

#[derive(serde::Serialize, serde::Deserialize)]
struct DeleteType {
    id: String
}

#[delete("/admin/{table}")]
pub async fn delete(path: web::Path<String>, jwt_header: JwtTokenHeader, data: Json<ColumnField>, app_state: web::Data<AppState>) -> ActixResut<impl Responder> {
    repository::detete_auth(&jwt_header.to_user_auth(), &path, &data.0, &app_state.pool).await
    .map_err(|error| actix_error::ErrorNotAcceptable(error.to_string()))?;
    Ok(HttpResponse::Accepted().body("update success"))
}

