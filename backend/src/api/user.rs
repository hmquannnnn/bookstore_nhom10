use crate::{
    repository::user::{self, User, UserInsert, UserResponse},
    util::types::{AppState, UserAuth},
};
use actix_web::{
    post,
    web::{self, Json},
    HttpResponse, Responder,
};

// type EitherAuth<T = AuthHeader, E = UserAuth> = std::result::Result<T, E>;

// pub async fn auth_user(either:  EitherAuth) {
//     match either {
//         Ok(header) => {

//         },
//         Err(user) =>
//     }
// }

// // #[post("/user/login")]
// // pub async fn get_user(
// //     data: Json<UserAuth>,
// //     app_state: web::Data<AppState>,
// // ) -> actix_web::Result<impl Responder> {
// //     let user_auth = data.0;
// //     let pool = &app_state.pool;

// //     let user = user::select_user(user_auth, pool)
// //         .await
// //         .map_err(|error| actix_web::error::ErrorBadRequest(error))?;
// //     Ok(user)
// }
#[post("/user/login")]
pub async fn get_user(
    data: Json<UserAuth>,
    app_state: web::Data<AppState>,
) -> actix_web::Result<impl Responder> {
    let user_auth = data.0;
    let pool = &app_state.pool;

    let user = user::select_user(user_auth, pool)
        .await
        .map_err(|error| actix_web::error::ErrorBadRequest(error))?;
    Ok(Json(user))
}

#[post("/user/register")]
pub async fn register_user(
    data: Json<UserInsert>,
    app_state: web::Data<AppState>,
) -> actix_web::Result<HttpResponse> {
    let new_user = data.into_inner();
    let new_user = user::insert_user(new_user, &app_state.pool)
        .await
        .map_err(|_| actix_web::error::ContentTypeError::ParseError)?;
    Ok(HttpResponse::Ok().json(new_user))
}

// pub struct Basic {
//     data: String,
// }

// #[patch("/user/field/{field}")]
// pub async fn patch_user(path: web::Path<String>, header: BasicAuth, app_state: web::Data<AppState>) -> actix_web::Result<HttpResponse> {
//     Ok(HttpResponse::Ok().body(format!("path: {}, header: {}", path.into_inner(), header.password().unwrap())))
// }
