use sqlx::MySqlPool;



pub struct Token {
    pub token: String,
    pub user_email: String,
    pub issue_at: sqlx::types::time::Date,
    pub expire_at: sqlx::types::time::Date,
}



pub async fn insert_token(email: &String, token: &String, pool: &MySqlPool) -> sqlx::Result<()> {
    sqlx::query!("insert into token (token, user_email, issue_at, expire_at) values (?, ?, now(), now() + interval 1 day)"
        , token
        , email)
        .execute(pool)
        .await?;    
    Ok(())
}