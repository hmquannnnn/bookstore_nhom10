use crate::{
    header::JwtTokenHeader,
    repository::{
        image::{insert_image, update_image},
        token::make_token,
        user::{self, select_user, User, UserInsert, UserResponse},
    },
    util::{
        to_image_url,
        types::{AppError, AppResult, AppState, Message, UserLogin},
    },
};

use crate::update_field;
use crate::update_user_field;
use actix_web::{
    error, get, patch, post, put,
    web::{self, Bytes, Json},
    HttpResponse, Responder, Result as ActixResult,
};

#[post("/user/login")]
pub async fn user_login(
    data: Json<UserLogin>,
    app_state: web::Data<AppState>,
) -> actix_web::Result<impl Responder> {
    let user_auth = data.0;
    let pool = &app_state.pool;

    let user = user::select_user(&user_auth.email, pool)
        .await
        .map_err(actix_web::error::ErrorBadRequest)?;

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
) -> actix_web::Result<Json<Message<String>>> {
    let pool = &app_state.pool;
    let user_auth = auth_header;
    let id = uuid::Uuid::new_v4().to_string();
    insert_image(data.to_vec(), &id, pool)
        .await
        .map_err(error::ErrorPayloadTooLarge)?;
    let url = to_image_url(&id);
    sqlx::query!(
        "update user set image_url = ? where email = ?",
        url,
        user_auth.email
    )
    .execute(pool)
    .await
    .map_err(error::ErrorUnauthorized)?;

    Ok(Json(Message {
        message: "success",
        payload: Some(url),
    }))
}

#[patch("/user/image")]
pub async fn patch_user_image(
    jwt: JwtTokenHeader,
    data: Bytes,
    app_state: web::Data<AppState>,
) -> actix_web::Result<Json<Message<String>>> {
    let pool = &app_state.pool;
    let user_email = &jwt.email;
    let user = select_user(user_email, pool)
        .await
        .map_err(|_| AppError::UnknownUser)?;
    let id = user.image_url;
    let url = match id {
        Some(id) => {
            let id = id.split('=').last().take().ok_or(AppError::ParseError)?;
            update_image(data.to_vec(), &id, pool)
                .await
                .map_err(error::ErrorPayloadTooLarge)?;
            Some(to_image_url(id))
        }
        None => {
            let id_new = uuid::Uuid::new_v4().to_string();
            insert_image(data.to_vec(), &id_new, pool)
                .await
                .map_err(error::ErrorPayloadTooLarge)?;
            let url = to_image_url(&id_new);
            sqlx::query!(
                "update user set image_url = ? where email = ?",
                url,
                jwt.email
            )
            .execute(pool)
            .await
            .map_err(error::ErrorUnauthorized)?;
            Some(url)
        }
    };
    println!("{}", url.clone().unwrap());
    Ok(Json(Message {
        message: "update success",
        payload: url,
    }))
}

#[derive(serde::Deserialize)]
pub struct Password {
    old: String,
    new: String,
}

#[patch("/user/password")]
pub async fn update_user_password(
    jwt: JwtTokenHeader,
    password: Json<Password>,
    app_state: web::Data<AppState>,
) -> AppResult<Json<Message<()>>> {
    let user_email = jwt.email;
    let old_pass = sqlx::query!("select password from user where email = ?", user_email)
        .fetch_one(&app_state.pool)
        .await
        .map_err(|_| AppError::UnknownUser)?
        .password;
    if password.old.eq(&old_pass) {
        sqlx::query!(
            "update user set password = ? where email = ?",
            password.new,
            user_email
        )
        .execute(&app_state.pool)
        .await
        .map_err(|_| AppError::UnknownUser)?;
    } else {
        return Ok(Json(Message {
            message: "wrong password",
            payload: None,
        }));
    }
    Ok(Json(Message {
        message: "update success",
        payload: None,
    }))
}

update_user_field!(update_user_name, "/user/name/{value}", name);
update_user_field!(update_user_address, "/user/address/{value}", address);
update_user_field!(update_user_phone, "/user/phone/{value}", phone);

#[macro_export]
macro_rules! update_user_field {
    ( $name:ident, $path:expr, $field:ident) => {
        update_field!(user, $name, $path, $field, "email");
    };
}
