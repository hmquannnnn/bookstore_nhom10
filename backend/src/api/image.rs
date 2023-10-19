use actix_web::{
    get, post, web::{self, Bytes, Json}, HttpResponse, delete, Responder
};

use crate::{repository, util::types::AppState};

#[derive(serde::Deserialize)]
pub struct ImageInfo {
    pub id: String,
}

#[get("/image")]
pub async fn get_image(query: web::Query<ImageInfo>, app_state: web::Data<AppState>) -> HttpResponse {
    let id = query.into_inner().id;
    let pool = &app_state.into_inner().pool;
    let image = repository::image::select_image(id, pool).await;
    match image {
        Ok(image) => {
            HttpResponse::Ok().body(image)
        },
        _ => {
            HttpResponse::NotFound().finish()
        } 
    }
}

#[post("/image")]
pub async fn post_image(payload: Bytes, app_state: web::Data<AppState>) -> impl Responder {
    let image = payload.to_vec();
    let action = repository::image::insert_image(image, &app_state.into_inner().pool)
        .await;
    match action {
        Ok(id) => Json(id),
        Err(_) => Json("can't post image".to_string())
    }
}

#[delete("/image")]
pub async fn delete_image(query: web::Query<ImageInfo>, app_state: web::Data<AppState>) -> HttpResponse {
    let id = query.into_inner().id;
    let pool = &app_state.into_inner().pool;
    let req = repository::image::delete_image(id, pool)
        .await;
    match req {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::NotModified().finish()
    }
}
