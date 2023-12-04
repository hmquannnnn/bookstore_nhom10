use std::fmt::Display;

use sqlx::{MySqlPool, Row, MySql};


pub async fn select_image(id: String, pool: &MySqlPool) -> sqlx::Result<Vec<u8>> {
    let image = sqlx::query("select data from images where id = ?")
        .bind(id)
        .fetch_one(pool)
        .await?
        .get("data");
    Ok(image)
}

pub async fn insert_image(image: Vec<u8>, id: &String, pool: &MySqlPool) -> sqlx::Result<()> {
    sqlx::query("insert into images(id, data) values (?, ?)")
        .bind(id)
        .bind(image)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn delete_image<'a, T>(id: &'a T, pool: &MySqlPool) -> sqlx::Result<()>
where T: Display + Send + Sync + sqlx::Encode<'a, MySql> + Sized + sqlx::Type<MySql>  {
    sqlx::query("delete from images where id = ?")
        .bind(id)
        .execute(pool)
        .await?;
    Ok(())
}
