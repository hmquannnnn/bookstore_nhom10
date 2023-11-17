use proc_macro::TokenStream;

extern crate proc_macro;

#[proc_macro]
pub fn make_update(item: TokenStream) -> TokenStream {
    println!("{:?}", item);
    "5".parse().unwrap()
}

// #[macro_export]
// macro_rules! update_field {
//     ( $table:ident, $name:ident, $path:expr, $field:ident) => {
//         #[patch($path)]
//         pub async fn $name(
//             path: actix_web::web::Path<String>,
//             jwt: JwtTokenHeader,
//             app_state: actix_web::web::Data<AppState>,
//         ) -> AppResult<Json<Message<()>>> {
//             let user_email = jwt.email;
//             let value = path.as_str();
//
//             let query = format!("update {} set {} = ? where id = ?", stringify!($table), stringify!($field));
//             sqlx::query(query.as_str())
//                 .bind(value)
//                 .bind(user_email)
//                 .execute(&app_state.pool)
//                 .await
//                 .map_err(|_| AppError::FailToUpdate)?;
//             Ok(Json(Message {
//                 message: "update success",
//                 payload: None,
//             }))
//         }
//     };
// }

// #[cfg(test)]
// mod tests {
//     use crate::make_update;
//
//     #[test]
//     fn it_works() {
//         let result = make_update!() 
//         assert_eq!(result, 5);
//     }
// }
