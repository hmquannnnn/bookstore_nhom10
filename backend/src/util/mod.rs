use actix_web::{web};


use self::types::{AppState};

pub mod constant;
pub mod types {
    
    use actix_web::{ResponseError, http::StatusCode};
    use sqlx::MySqlPool;

    #[derive(Clone)]
    pub struct AppState {
        pub pool: MySqlPool,
        pub base_url: String,
    }

    pub type AppResult<T, E = AppError> = Result<T, E>;
    pub enum Role {
        User,
        Addmin
    }

    #[derive(Debug, thiserror::Error,)]
    pub enum AppError {
        #[error("wrong password")]
        WrongPassword,
        #[error("invaild token")]
        FailAuthenticate,
        #[error("fail to update")]
        FailToUpdate,
        #[error("fail to fetch")]
        FailToFetch,
    }

    impl ResponseError for AppError {
        fn status_code(&self) -> actix_web::http::StatusCode {
            StatusCode::BAD_REQUEST
        }
    }


    #[derive(serde::Serialize, serde::Deserialize)]
    pub struct Message<T>  {
        pub message: &'static str,
        pub payload: Option<T>
    }

    // impl Responder for AppError {
    //     type Body = MessageBody + 'static;

    //     fn respond_to(self, req: &HttpRequest) -> HttpResponse<Self::Body> {

    //     }
    // }


    #[derive(serde::Serialize, serde::Deserialize)]
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


pub struct Converter<T>(T);

type SqlxConverter<T> = Converter<sqlx::Result<T>>;

impl<T> SqlxConverter<T> {
    pub fn convert(self) -> actix_web::Result<T> {
        self.0.map_err(|err| {
            actix_web::error::ErrorBadRequest(err.to_string())
        })
    }
}

pub fn to_image_url(app_state: &web::Data<AppState>, id: String) -> String {
    return app_state.base_url.clone() + "/image?id=" + id.as_str();
} 


// type AppConverter<T> = Converter<actix_web::Result<T>>;
//
// impl<T> AppConverter<T> {
//     pub fn convert(self) -> AppResult<T> {
//         self.0.map_err(|err| {
//             actix_web::error::ErrorBadRequest(err.to_string())
//         })
//     }
// }
//
