pub mod types {
    use sqlx::MySqlPool;

    #[derive(Clone)]
    pub struct AppState {
        pub pool: MySqlPool,
    }

    #[derive(Debug, thiserror::Error)]
    pub enum LoginError {
        #[error("wrong password")]
        WrongPassword,
    }
}
