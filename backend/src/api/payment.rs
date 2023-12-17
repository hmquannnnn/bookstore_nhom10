use actix_web::{post, web::Json};

use crate::{header::JwtTokenHeader, util::types::{AppState, Message}};



// #[post("/api/payment")]
// pub async fn pay(
//     jwt_header: JwtTokenHeader,
//     app_state: actix_web::web::Data<AppState>,
// ) -> Json<Message<()>> {
//
// }
