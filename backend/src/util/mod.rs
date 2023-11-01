pub mod constant;
pub mod types {
    
    use actix_web::{Responder, HttpResponse, HttpRequest};
    use sqlx::MySqlPool;

    #[derive(Clone)]
    pub struct AppState {
        pub pool: MySqlPool,
        pub base_url: String,
    }

    #[derive(Debug, thiserror::Error)]
    pub enum LoginError {
        #[error("wrong password")]
        WrongPassword,
    }

    // impl Responder for LoginError {
    //     type Body = MessageBody + 'static;

    //     fn respond_to(self, req: &HttpRequest) -> HttpResponse<Self::Body> {

    //     }
    // }

    pub struct ColumnField {
        pub key: String,
        pub value: String
    }

    impl ColumnField {
        pub fn new(key: String, value: String) -> Self {
            ColumnField { key, value }
        }
    }

    

    #[derive(serde::Deserialize, serde::Serialize)]
    pub struct UserAuth {
        pub email: String,
        pub password: String,
    }

    // impl UserAuth {
    //     pub fn into_column_field(self) -> ColumnField {
    //         ColumnField::new(self.email, )
    //     }
    // }
}
