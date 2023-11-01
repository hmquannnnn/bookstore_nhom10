use actix_web::{dev::Payload, FromRequest, HttpRequest};
use std::{future::{Future, Ready, ready}, pin::Pin};

#[derive(Clone)]
pub struct TokenHeader(pub String);

// fn handle_error<V, E1, E2>(header_value: Result<Result<V, E1>, E2>) => Result<V, < {

// } 

// .ok_or(actix_web::error::ErrorUnauthorized("unknown user"));
impl FromRequest for TokenHeader {
    type Error = actix_web::error::Error;
    // type Future = dyn Future<Output = Result<TokenHeader, Self::Error>>;
    type Future = Ready<Result<Self, Self::Error>>;

    fn from_request(req: &HttpRequest, _payload: &mut Payload) -> Self::Future {
        let req = req.headers();
        let auth_header = req.into_iter().find(|header| header.0.as_str() == "auth");
        let header_value = auth_header.map(|value| {
            value
            .1
            .to_str()
            .map_err(|_| actix_web::error::ErrorUnauthorized("unknown user"))
        }).ok_or(actix_web::error::ErrorUnauthorized("unknown user"));

        // combime two error
        let error_handler = |result_value| {
            let result_value = result_value?;
            let header_value = result_value?;
            Ok(header_value)
        };


        let header_value = error_handler(header_value).map(|value| TokenHeader(value.to_string()));
        ready(header_value)
    }
}
