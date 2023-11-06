use crate::{
    header::JwtTokenHeader,
    repository::{
        image::insert_image,
        token::{make_token},
        user::{self, User, UserInsert, UserResponse},
    },
    util::{types::{AppError, AppResult, AppState, Message, UserAuth}, to_image_url},
};
use actix_web::{
    get, post, put,
    web::{self, Bytes, Json},
    HttpResponse, Responder, Result as ActixResult,
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
pub async fn user_login(
    data: Json<UserAuth>,
    app_state: web::Data<AppState>,
) -> actix_web::Result<impl Responder> {
    let user_auth = data.0;
    let pool = &app_state.pool;

    let user = user::select_user(&user_auth.email, pool)
        .await
        .map_err(|error| actix_web::error::ErrorBadRequest(error))?;

    if user.password != user_auth.password {
        return Err(actix_web::error::ErrorBadRequest(AppError::WrongPassword));
    }
    let token = make_token(&user)
        .map_err(|_| actix_web::error::ErrorBadRequest(AppError::WrongPassword))?;
    Ok(Json(UserResponse { user, token }))
}

#[get("/user")]
pub async fn get_user(
    auth_header: JwtTokenHeader,
    app_state: web::Data<AppState>,
) -> ActixResult<Json<User>> {
    let user_email = auth_header.email;
    // let user_name = auth_header.name;
    let pool = &app_state.pool;

    let user = user::select_user(&user_email, pool).await?;
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

#[put("/user/image")]
pub async fn insert_image_user(
    auth_header: JwtTokenHeader,
    data: Bytes,
    app_state: web::Data<AppState>,
) -> AppResult<Json<Message<String>>> {
    let pool = &app_state.pool;
    let user_auth = auth_header.to_user_auth();

    let id = insert_image(data.to_vec(), pool)
        .await
        .map_err(|_| AppError::FailToUpdate)?;
    let url = to_image_url(&app_state, id);
    sqlx::query!(
        "update user set image_url = ? where email = ?",
        url,
        user_auth.email
    )
    .execute(pool)
    .await
    .map_err(|_| AppError::FailToUpdate)?;

    Ok(Json(Message {
        message: "success",
        payload: Some(url),
    }))
}

// #[actix_web::get("/auth")]
// pub async fn auth_test(auth_header: JwtTokenHeader, app_state: web::Data<AppState>) -> actix_web::Result<Json<Claims>>{
//     let token = auth_header.email;
//     let aa = decode_token(&token)
//     .map_err(|_| actix_web::error::ContentTypeError::ParseError)?;
//    Ok(Json(aa))
// }

// pub struct Basic {
//     data: String,
// }

// #[patch("/user/field/{field}")]
// pub async fn patch_user(path: web::Path<String>, header: BasicAuth, app_state: web::Data<AppState>) -> actix_web::Result<HttpResponse> {
//     Ok(HttpResponse::Ok().body(format!("path: {}, header: {}", path.into_inner(), header.password().unwrap())))
// }
