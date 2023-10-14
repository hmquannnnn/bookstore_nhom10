use actix_web::{
    get, post, web::{self, Bytes}, HttpResponse, delete
};

use crate::{repository, util::types::AppState};

#[derive(serde::Deserialize)]
struct ImageInfo {
    id: i32,
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
pub async fn post_image(payload: Bytes, app_state: web::Data<AppState>) -> HttpResponse {
    let image = payload.to_vec();
    let action = repository::image::insert_image(image, &app_state.into_inner().pool)
        .await;
    match action {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::NotModified().finish()
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
