use actix_web::{
    delete, get, put,
    web::{self, Bytes, Json},
    HttpResponse, Responder,
};

use crate::{
    header::JwtTokenHeader,
    repository::{self, auth_admin, auth_user},
    util::{
        to_image_url,
        types::{AppError, AppResult, AppState, Message},
    },
};

#[derive(serde::Deserialize)]
pub struct ImageInfo {
    pub id: String,
}

#[get("/image")]
pub async fn get_image(
    query: web::Query<ImageInfo>,
    app_state: web::Data<AppState>,
) -> HttpResponse {
    let id = query.into_inner().id;
    let pool = &app_state.into_inner().pool;
    let image = repository::image::select_image(id, pool).await;
    match image {
        Ok(image) => HttpResponse::Ok().body(image),
        _ => HttpResponse::NotFound().finish(),
    }
}

#[derive(serde::Serialize)]
pub struct ImageUrl {
    url: String,
}

// #[put("/image")]
// pub async fn put_image(
//     jwt_header: JwtTokenHeader,
//     payload: Bytes,
//     app_state: web::Data<AppState>,
// ) -> AppResult<impl Responder> {
//     let image = payload.to_vec();
//     let pool = &app_state.pool;
//     let auth_success = auth_user(&jwt_header, pool).await?;
//
//     let id = uuid::Uuid::new_v4().to_string();
//     match auth_success {
//         true => {
//             repository::image::insert_image(image, &id, &app_state.pool)
//                 .await
//                 .map_err(|_| AppError::FailToUpdate)?;
//             Ok(Json(ImageUrl {
//                 url: to_image_url(id),
//             }))
//         }
//         false => Err(AppError::FailAuthenticate),
//     }
// }

#[delete("/image")]
pub async fn delete_image(
    jwt_header: JwtTokenHeader,
    query: web::Query<ImageInfo>,
    app_state: web::Data<AppState>,
) -> AppResult<Json<Message<()>>> {
    let id = query.into_inner().id;
    let pool = &app_state.into_inner().pool;

    let auth_success = auth_admin(&jwt_header, pool).await?;

    match auth_success {
        true => {
            repository::image::delete_image(&id, pool)
                .await
                .map_err(|_| AppError::FailToFetch)?;
            Ok(Json(Message {
                message: "delete success",
                payload: None,
            }))
        }
        false => Err(AppError::FailAuthenticate),
    }
}
