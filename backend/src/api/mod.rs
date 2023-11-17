use actix_web::{
    get, Responder, web::{Json, self}, patch, error as actix_error, HttpResponse 
};

use crate::{util::types::{ColumnField, AppState}, header::JwtTokenHeader, repository::update_one_field_auth};


pub mod image;
pub mod book;
pub mod user;
pub mod cart;
pub mod genre;

#[get("/")]
pub async fn index() -> impl Responder {
    Json("Server is running")
}


#[derive(serde::Serialize, serde::Deserialize)]
pub struct UpdateType {
    id_field: ColumnField,
    value_field: ColumnField
}


#[patch("update/{table}")]
pub async fn update(path: web::Path<String>, jwt_header: JwtTokenHeader, data: Json<UpdateType>, app_state: web::Data<AppState>) -> actix_web::Result<impl Responder> {
    let id_field = &data.0.id_field;
    let value_field = &data.0.value_field;
    update_one_field_auth(&jwt_header, &path.into_inner(), id_field, value_field, &app_state.pool).await
    .map_err(|error| actix_error::ErrorNotAcceptable(error.to_string()))?;
    Ok(HttpResponse::Accepted().body("update success"))
}

#[derive(serde::Serialize, serde::Deserialize)]
struct DeleteType {
    id: String
}

// #[delete("/admin/{table}")]
// pub async fn delete(path: web::Path<String>, jwt_header: JwtTokenHeader, data: Json<ColumnField>, app_state: web::Data<AppState>) -> ActixResut<impl Responder> {
//     repository::detete_auth(&jwt_header, &path, &data.0, &app_state.pool).await
//     .map_err(|error| actix_error::ErrorNotAcceptable(error.to_string()))?;
//     Ok(HttpResponse::Accepted().body("update success"))
// }


// #[macro_export]
// macro_rules! update_field {
//     ( $table:ident, $name:ident, $path:expr, $field:ident) => {
//         #[patch($path)]
//         pub async fn $name(
//             path: actix_web::web::Path<String>,
//             jwt: JwtTokenHeader,
//             app_state: actix_web::web::Data<AppState>,
//         ) -> AppResult<Json<Message<()>>> {
//             let user_email = jwt.email;
//             let value = path.as_str();
//
//             let query = format!("update {} set {} = ? where id = ?", stringify!($table), stringify!($field));
//             sqlx::query(query.as_str())
//                 .bind(value)
//                 .bind(user_email)
//                 .execute(&app_state.pool)
//                 .await
//                 .map_err(|_| AppError::FailToUpdate)?;
//             Ok(Json(Message {
//                 message: "update success",
//                 payload: None,
//             }))
//         }
//     };
// }
