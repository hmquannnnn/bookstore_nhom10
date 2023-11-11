use std::fmt::Display;

use actix_web::web;
use sqlx::Value;

use self::types::{AppError, AppState};

pub mod constant;
pub mod types {
    use std::iter::FlatMap;

    use actix_web::{http::StatusCode, ResponseError};
    use sqlx::MySqlPool;

    #[derive(Clone)]
    pub struct AppState {
        pub pool: MySqlPool,
        pub base_url: String,
    }

    pub type AppResult<T, E = AppError> = Result<T, E>;
    pub enum Role {
        User,
        Addmin,
    }

    #[derive(Debug, thiserror::Error)]
    pub enum AppError {
        #[error("wrong password")]
        WrongPassword,
        #[error("invaild token")]
        FailAuthenticate,
        #[error("fail to update")]
        FailToUpdate,
        #[error("fail to fetch")]
        FailToFetch,
        #[error("unknown user")]
        UnknownUser,
        #[error("non exist book")]
        NonExistBook,
        #[error("unknow type please make sure it is format correctly")]
        ParseError,
    }

    impl ResponseError for AppError {
        fn status_code(&self) -> actix_web::http::StatusCode {
            StatusCode::BAD_REQUEST
        }
    }

    #[derive(serde::Serialize, serde::Deserialize)]
    pub struct Message<T> {
        pub message: &'static str,
        pub payload: Option<T>,
    }

    // impl Responder for AppError {
    //     type Body = MessageBody + 'static;

    //     fn respond_to(self, req: &HttpRequest) -> HttpResponse<Self::Body> {

    //     }
    // }

    #[derive(serde::Serialize, serde::Deserialize)]
    pub struct ColumnField {
        pub key: String,
        pub value: String,
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

pub trait Converter {
    type Value;
    type Error;
    fn convert(self) -> Result<Self::Value, Self::Error>;
}

pub struct Map(pub Vec<(String, String)>);


impl Map {
    pub fn get(&self, key: String) -> Option<&String> {
        for value in &self.0 {
            if value.0 == key {
                return Some(&value.0);
            }
        }
        None
    }

    pub fn is_valid(&self) -> bool {
        for value in &self.0 {
            if value.0.eq(&String::from("password")) {
                return false;
            }
        }
        return true;
    }
}


impl TryFrom<serde_json::Map<String, serde_json::Value>> for Map {
    type Error = AppError;
    fn try_from(value: serde_json::Map<String, serde_json::Value>) -> Result<Self, Self::Error> {
        let mut array = Vec::new();
        for object in value {
            array.push((object.0, object.1.as_str().ok_or_else(|| AppError::ParseError)?.to_owned()));
        }
        Ok(Self(array))
    }
}

pub struct JsonMapConverter(pub serde_json::Value);

impl Converter for JsonMapConverter {
    type Value = Map;
    type Error = AppError;
    fn convert(self) -> Result<Self::Value, Self::Error> {
        let map = self.0.as_object().ok_or_else(|| AppError::ParseError)?;

        Map::try_from(map.to_owned())
    }
}

// type SqlxConverter<T> = Converter<sqlx::Result<T>>;

// impl<T> SqlxConverter<T> {
//     pub fn convert(self) -> actix_web::Result<T> {
//         self.0.map_err(|err| {
//             actix_web::error::ErrorBadRequest(err.to_string())
//         })
//     }
// }

pub fn to_image_url(app_state: &web::Data<AppState>, id: &String) -> String {
    return format!("{}/image?id={}", app_state.base_url, id);
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

trait Query {
    
}

pub struct QueryBuilder;

pub struct UpdateQuerry {
    query: String
}

impl From<String> for UpdateQuerry {
    fn from(value: String) -> Self {
        Self { query: value }
    }
}

impl UpdateQuerry {
    pub fn add_field<T>(&mut self, field: &T) -> &mut Self
    where T: Display {
        self.query = format!("{} {}  = ?", self.query, field);
        self
    }

    pub fn and(&mut self) -> &mut Self {
        self.query = format!("{} and", self.query);
        self
    }

    pub fn or(&mut self) -> &mut Self {
        self.query = format!("{} or", self.query);
        self
    }

    pub fn where_field<T>(&mut self, field: T) -> &mut Self
    where T: Display {
        self.query = format!("{} {} = ?", self.query, field);
        
        self
    }

}

impl QueryBuilder {
    pub fn new() -> Self {
        QueryBuilder { }
    }
    pub fn update<T>(self, table: T) -> UpdateQuerry 
    where T: Display {
        UpdateQuerry::from(format!("update {} set ", table))
    }
}


