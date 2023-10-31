use actix_web::{
    delete, get, put,
    web::{self, Bytes},
    HttpResponse, Responder,
};

use crate::{repository, util::types::AppState};

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

#[put("/image")]
pub async fn put_image(payload: Bytes, app_state: web::Data<AppState>) -> impl Responder {
    let image = payload.to_vec();
    let app_state = app_state.into_inner();
    let action = repository::image::insert_image(image, &app_state.pool).await;
    match action {
        Ok(id) => HttpResponse::Ok().body(app_state.base_url.to_owned() + "/image?id=" + id.as_str()),
        Err(error) => HttpResponse::NotModified().body("can't insert image"),
    }
}

#[delete("/image")]
pub async fn delete_image(
    query: web::Query<ImageInfo>,
    app_state: web::Data<AppState>,
) -> HttpResponse {
    let id = query.into_inner().id;
    let pool = &app_state.into_inner().pool;
    let req = repository::image::delete_image(id, pool).await;
    match req {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::NotModified().finish(),
    }
}
