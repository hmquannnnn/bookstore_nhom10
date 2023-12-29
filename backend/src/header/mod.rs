use actix_web::{dev::Payload, FromRequest, HttpRequest};
use serde::Serialize;
use std::{
    error::Error,
    future::{ready, Ready},
};

use crate::{repository::token::decode_token, util::types::Role};

#[derive(Clone, Serialize)]
pub struct JwtTokenHeader {
    pub email: String,
    pub password: String,
    pub role: Role,
}

impl FromRequest for JwtTokenHeader {
    type Error = actix_web::error::Error;
    // type Future = dyn Future<Output = Result<JwtTokenHeader, Self::Error>>;
    type Future = Ready<Result<Self, Self::Error>>;

    fn from_request(req: &HttpRequest, _payload: &mut Payload) -> Self::Future {
        let req = req.headers();
        let header_value = req.get("auth").ok_or(actix_web::error::ErrorUnauthorized(
            "can't find the field auth",
        ));
        // combime two error
        let error_handler =
            |result_value: Result<&actix_web::http::header::HeaderValue, actix_web::Error>| {
                let result_value = result_value?.to_str()?;
                let token_decode = decode_token(result_value)?;
                let jwt = JwtTokenHeader::try_from(token_decode)?;
                Ok(jwt)
            };

        let jwt = error_handler(header_value).map_err(|error: Box<dyn Error>| {
            actix_web::error::ErrorUnauthorized(error.to_string())
        });
        ready(jwt)
    }
}
