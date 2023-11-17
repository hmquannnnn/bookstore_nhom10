use sqlx::MySqlPool;

use crate::{util::types::AppResult, fetch_match};


#[derive(serde::Deserialize, serde::Serialize)]
pub struct Genre {
    id: i32,
    name: Option<String>,
}

pub async fn fetch_genre_all(pool: &MySqlPool) -> AppResult<Vec<Genre>>  {
    fetch_match!(sqlx::query_as!(Genre, "select * from genre")
        .fetch_all(pool)
        .await)
}

pub async fn get_book_genre(book_id: &String, pool: &MySqlPool) -> AppResult<Vec<Genre>> {
    fetch_match!(sqlx::query_as!(Genre,
        "select genre.* from genre
            join (
            	select * from book_genre
                where book_id = ?
            ) book_genre
        where book_genre.genre_id = genre.id", book_id)
        .fetch_all(pool)
        .await)
}
// pub async fn fetch_book_genre(pool: &MySqlPool) -> AppResult<<Ve> 

// pub async fn get
// o
