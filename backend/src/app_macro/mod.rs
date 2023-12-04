
#[macro_export]
macro_rules! fetch_match {
    ( $action:expr ) => {
       $action.map_err(|_| $crate::util::types::AppError::FailToFetch) 
    };
}

#[macro_export]
macro_rules! update_field {
    ( $table:ident, $name:ident, $path:expr, $field:ident) => {
        #[patch($path)]
        pub async fn $name(
            path: actix_web::web::Path<String>,
            jwt: JwtTokenHeader,
            app_state: actix_web::web::Data<AppState>,
        ) -> AppResult<Json<Message<()>>> {
            let user_email = jwt.email;
            let value = path.as_str();

            let query = format!("update {} set {} = ? where id = ?", stringify!($table), stringify!($field));
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

