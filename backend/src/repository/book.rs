use sqlx::{MySqlPool, types::time::Date};

#[derive(sqlx::FromRow)]
struct Book {
    id: String,
    title: String,
    author_id: Option<i32>,
    price: f32,
    publish_year: Date,
    
    back_page_url: Option<String>,
    front_page_url: Option<String>,
}


pub async fn select_book(id: String, pool: &MySqlPool) -> sqlx::Result<Book> {
    let book = sqlx::query_as!(Book, "select * from book where id = ?", id)
        .fetch_one(pool)
        .await?;
        
    Ok(book)
}
