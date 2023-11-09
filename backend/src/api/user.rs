use crate::{
    header::JwtTokenHeader,
    repository::{
        image::insert_image,
        token::make_token,
        user::{self, User, UserInsert, UserResponse},
    },
    util::{
        to_image_url,
        types::{AppError, AppResult, AppState, Message, UserAuth}
    },
};
use actix_web::{
    get,
    patch, post, put,
    web::{self, Bytes, Json},
    HttpResponse, Responder, Result as ActixResult,
};
use crate::update_user_field;
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

update_user_field!(update_user_name, "/user/name/{value}", name); 
update_user_field!(update_user_address,"/user/address/{value}", address); 
update_user_field!(update_user_phone, "/user/phone/{value}", phone); 

#[macro_export]
macro_rules! update_user_field {
    ( $name:ident, $path:expr, $field:ident ) => {
        #[patch($path)]
        pub async fn $name(
            path: actix_web::web::Path<String>,
            jwt: JwtTokenHeader,
            app_state: web::Data<AppState>,
            ) -> AppResult<Json<Message<()>>> {
            let user_email = jwt.email;
            let value = path.as_str();
            
            let query = format!("update user set {} = ? where email = ?", stringify!($field));
            sqlx::query(query.as_str())
                .bind(value)
                .bind(user_email)
                .execute(&app_state.pool)
                .await
                .map_err(|_| AppError::FailToUpdate)?;
            Ok(Json(Message {
                message: "update success",
                payload: None,
            }))
        }
    };
}

