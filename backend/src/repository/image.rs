use sqlx::{MySqlPool, Row};


pub async fn select_image(id: i32, pool: &MySqlPool) -> sqlx::Result<Vec<u8>> {
    let image = sqlx::query("select data from images where id = ?")
        .bind(id)
        .fetch_one(pool)
        .await?
        .get("data");
    Ok(image)
}

pub async fn insert_image(image: Vec<u8>, pool: &MySqlPool) -> sqlx::Result<String> {
    let image_slice = &image.as_slice()[0..90];
    let id = sqlx::types::uuid::Builder::from_slice(image_slice).unwrap().into_uuid().to_string();
    sqlx::query("insert into images(id, data) values (?, ?)")
        .bind(&id)
        .bind(image)
        .execute(pool)
        .await?;
    Ok(id)
}

pub async fn delete_image(id: i32, pool: &MySqlPool) -> sqlx::Result<()> {
    sqlx::query("delete from images where id = ?")
        .bind(id)
        .execute(pool)
        .await?;
    Ok(())
}
