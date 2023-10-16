pub mod types {
    use sqlx::MySqlPool;

    #[derive(Clone)]
    pub struct AppState {
        pub pool: MySqlPool,
    }

    #[derive(Debug)]
    pub enum LoginError {
        WrongPassword,
    }

    impl std::fmt::Display for LoginError {
        fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
            match self {
                Self::WrongPassword => write!(f, "wrong password"),
            }
        }
    }

    impl std::error::Error for LoginError {}
}
