use sqlx::MySqlPool;

// struct Book {
//     id: String,
//     title: String,
//     author_id: i32,
//     price: f32,
//     publish_year: Date,
   
//     back_page_url: Option<String>,
//     front_page_url: Option<String>,
// }

#[derive(sqlx::FromRow, serde::Serialize)]
pub struct Book {
	pub id: String,
	pub title: String,
	pub author_id: i32,
	pub price: f32,
	pub publish_year: String,
    pub number_of_purchases:  Option<i32>,
    pub book_in_stocks: i32,
    pub ratting: Option<f32>,
    pub desciption: Option<String>,

	pub back_page_url: Option<String>,
	pub front_page_url: Option<String>
}

pub async fn select_book(id: String, pool: &MySqlPool) -> sqlx::Result<Book> {
    let book = sqlx::query_as!(Book, "select * from book where id = ?", id)
        .fetch_one(pool)
        .await?;
    Ok(book)
}

pub async fn list_books(start: i32, length: i32, pool: &MySqlPool) -> sqlx::Result<Vec<Book>> {
    let book = sqlx::query_as!(Book, "select * from book limit ? offset ?", length, start)
        .fetch_all(pool)
        .await?;
    Ok(book)
}

// pub async fn delete_book(id: String, pool: &MySqlPool) -> sqlx::Result<()> {
//     sqlx::query!("delete from book where id = ?", id)
//         .execute(pool)
//         .await?;
//     Ok(())
// }


// (id, title, author_id, price, publish_year, back_date_url, front_page_url)
// pub async fn update_book(book: Book, pool: &MySqlPool) -> sqlx::Result<()> {
//     sqlx::query!("update book
//                  set title = ?,
//                  author_id = ?,
//                  price = ?,
//                  publish_year = ?,
//                  book_in_stocks = ?,
//                  back_page_url = ?,
//                  front_page_url = ?",
//                  book.title,
//                  book.author_id,
//                  book.price,
//                  book.publish_year,
//                  book.book_in_stocks,
//                  book.back_page_url,
//                  book.front_page_url)
//         .execute(pool)
//         .await?;
//     Ok(())
// }

