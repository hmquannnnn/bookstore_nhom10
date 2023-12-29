use actix_web::{
    get,
    web::{self, Json},
};

use crate::{
    repository::genre::{fetch_genre_all, Genre},
    util::types::{AppResult, AppState},
};

#[get("/genre")]
pub async fn get_genres(app_state: web::Data<AppState>) -> AppResult<Json<Vec<Genre>>> {
    Ok(Json(fetch_genre_all(&app_state.pool).await?))
}
