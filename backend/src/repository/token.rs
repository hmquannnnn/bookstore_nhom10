use serde::{Deserialize, Serialize};
use sha256::digest;
use sqlx::MySqlPool;
use chrono::Utc;


use crate::util::{constant::EXPIRE_INTERVAL, types::UserAuth};

pub struct Token {
    pub token: String,
    pub user_email: String,
    pub issue_at: sqlx::types::time::PrimitiveDateTime,
    pub expire_at: sqlx::types::time::PrimitiveDateTime,
    pub is_expire: i64,
}

#[derive(Serialize, Deserialize)]
pub struct TokenSerialize {
    pub token: String,
    pub user_email: String,
    pub issue_at: String,
    pub expire_at: String,
}

impl TokenSerialize {
    pub fn from_token(token: Token) -> Self {
        TokenSerialize {
            token: token.token,
            user_email: token.user_email,
            issue_at: token.issue_at.to_string(),
            expire_at: token.expire_at.to_string(),
        }
    }
}

pub async fn insert_token(user_auth: &UserAuth, pool: &MySqlPool) -> sqlx::Result<String> {
    // let mut vec = Vec::new();
    // vec.push(user_auth.email.clone());
    // let token: Hmac<Sha256> =
    //     Hmac::new_from_slice(format!("{}{}{}", user_auth.email, user_auth.password, Utc::now().to_string()).as_bytes())
    //         .map_err(|_| sqlx::Error::WorkerCrashed)?;
    // let token = vec
    //     .sign_with_key(&token)
    //     .map_err(|_| sqlx::Error::RowNotFound)?;
    let token = digest(format!("{}{}{}", user_auth.email, user_auth.password, Utc::now().to_string()).as_bytes());
    sqlx::query("insert into token (token, user_email, issue_at, expire_at) values (?, ?, now(), now() + interval 20 minute)")
    .bind(&token)
    .bind(&user_auth.email)
    // .bind(EXPIRE_INTERVAL)
    .execute(pool)
    .await?;
    Ok(token)
}

pub async fn check_token(token: &String, pool: &MySqlPool) -> sqlx::Result<TokenSerialize> {
    let token = sqlx::query_as!(
        Token,
        "select *, expire_at > now() as is_expire from token where token = ?",
        token
    )
    .fetch_one(pool)
    .await?;
    Ok(TokenSerialize::from_token(token))
}
