use actix_web::{dev::Payload, FromRequest, HttpRequest};
use std::{future::Future, pin::Pin};

pub struct AuthHeader(pub String);

//
impl FromRequest for AuthHeader {
    type Error = actix_web::error::Error;
    type Future = Pin<Box<dyn Future<Output = Result<AuthHeader, Self::Error>>>>;

    fn from_request(req: &HttpRequest, _payload: &mut Payload) -> Self::Future {
        let req = req.headers().clone();
        let header_value = req.into_iter().find(|header| header.0.as_str() == "auth");
        Pin::from(Box::new(async move {
            match header_value {
                Some(header) => {
                    let header_value = header
                        .1
                        .to_str()
                        .map_err(|_| actix_web::error::ErrorUnauthorized("unknown user"))?
                        .to_string();
                    Ok(AuthHeader(header_value))
                }
                None => Err(actix_web::error::ErrorUnauthorized("unknown user")),
            }
        }))
    }
}
