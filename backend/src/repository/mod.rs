// #[derive(sqlx::FromRow)]
// struct Image {
//     pub data: Vec<u8>,
// }

use sqlx::MySqlPool;

use crate::util::types::ColumnField;


pub mod image;
pub mod user;
pub mod book;
pub mod token;

pub async fn update_one_field(table: &str, id_field: ColumnField, value_field: ColumnField , pool: &MySqlPool) -> sqlx::Result<()> {
    sqlx::query(format!("update {} set {} = {} where {} = {}", table, value_field.key, value_field.value, id_field.key, id_field.value).as_str())
        .execute(pool)
        .await?;
    Ok(())
}