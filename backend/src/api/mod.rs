use actix_files as fs;
use actix_web::{
    error as actix_error, get,
    http::header::{ContentDisposition, DispositionType},
    patch,
    web::{self, Json, Path},
    Error, HttpResponse, Responder,
};

use crate::{
    header::JwtTokenHeader,
    repository::update_one_field_auth,
    util::types::{AppState, ColumnField},
};

pub mod book;
pub mod cart;
pub mod genre;
pub mod image;
pub mod user;
pub mod payment;
pub mod order;


// #[get("/")]
// pub async fn index() -> Result<fs::NamedFile, Error>{
//     let path: std::path::PathBuf = ["./dist/", "index.html"].iter().collect();
//     let file = fs::NamedFile::open(path)?;
//     Ok(file
//         .use_last_modified(true)
//         .set_content_disposition(ContentDisposition {
//             disposition: DispositionType::Inline,
//             parameters: vec![],
//         }))
// }

pub async fn index() -> Result<fs::NamedFile, Error>{
    let path: std::path::PathBuf = ["./dist/", "index.html"].iter().collect();
    let file = fs::NamedFile::open(path)?;
    Ok(file
        .use_last_modified(true)
        .set_content_disposition(ContentDisposition {
            disposition: DispositionType::Inline,
            parameters: vec![],
        }))
}

#[get("/assets/{filename:.*}")]
async fn assets(path: Path<String>) -> Result<fs::NamedFile, Error> {
    let path = path.into_inner();
    let path: std::path::PathBuf = ["./dist/assets/", &path].iter().collect();
    let file = fs::NamedFile::open(path)?;
    Ok(file
        .use_last_modified(true)
        .set_content_disposition(ContentDisposition {
            disposition: DispositionType::Attachment,
            parameters: vec![],
        }))
}
#[derive(serde::Serialize, serde::Deserialize)]
pub struct UpdateType {
    id_field: ColumnField,
    value_field: ColumnField,
}

#[patch("/api/update/{table}")]
pub async fn update(
    path: web::Path<String>,
    jwt_header: JwtTokenHeader,
    data: Json<UpdateType>,
    app_state: web::Data<AppState>,
) -> actix_web::Result<impl Responder> {
    let id_field = &data.0.id_field;
    let value_field = &data.0.value_field;
    update_one_field_auth(
        &jwt_header,
        &path.into_inner(),
        id_field,
        value_field,
        &app_state.pool,
    )
    .await
    .map_err(|error| actix_error::ErrorNotAcceptable(error.to_string()))?;
    Ok(HttpResponse::Accepted().body("update success"))
}

#[derive(serde::Serialize, serde::Deserialize)]
struct DeleteType {
    id: String,
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
