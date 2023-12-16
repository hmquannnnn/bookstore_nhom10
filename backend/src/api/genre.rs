use actix_web::{web::{self, Json}, get};

use crate::{util::types::{AppState, AppResult}, repository::genre::{Genre, fetch_genre_all}};


#[get("/api/genre")]
pub async fn get_genres(app_state: web::Data<AppState>) -> AppResult<Json<Vec<Genre>>> {
    Ok(Json(fetch_genre_all(&app_state.pool).await?))
}

