use std::error::Error;

use sqlx::MySqlPool;


#[derive(Debug)]
pub enum UserError {
    WrongPassword,
}

impl std::fmt::Display for UserError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::WrongPassword => write!(f, "wrong password")
        }
    }
}

impl std::error::Error for UserError {}



#[derive(sqlx::FromRow, serde::Serialize)]
pub struct User {
    pub email: String,
    pub name: String,
    pub phone: String,
    pub password: String,
    pub address: String,

    pub image_url: Option<String>,
}

pub async fn select_user(email: String, password: String, pool: &MySqlPool) -> Result<User, Box<dyn Error>> {
    let user = sqlx::query_as!(User, "select * from user where email = ?", email)
        .fetch_one(pool)
        .await?;
    if user.password != password {
        return Err(Box::new(UserError::WrongPassword));
    }
    Ok(user)
}



