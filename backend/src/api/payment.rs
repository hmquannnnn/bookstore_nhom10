use actix_web::{
    error::{self, ErrorNotFound},
    post,
    web::Json,
    Result as AcitxResult,
};

use crate::{
    header::JwtTokenHeader,
    repository::order::get_order_price,
    util::types::{AppState, Message},
};

#[derive(serde::Serialize, serde::Deserialize)]
pub struct PaymentDetail {
    order_id: u64,
    payment: f64,
}

#[post("/payment")]
pub async fn post_pay(
    jwt_header: JwtTokenHeader,
    payment_detail: Json<PaymentDetail>,
    app_state: actix_web::web::Data<AppState>,
) -> AcitxResult<Json<Message<String>>> {
    let user_email = jwt_header.email;
    let pool = &app_state.pool;

    let order_price = get_order_price(pool, payment_detail.order_id, &user_email)
        .await
        .map_err(ErrorNotFound)?;

    if let Some(price) = order_price.price {
        if price > payment_detail.payment {
            return Ok(Json(Message{
                message: "not enough money",
                payload: Some(format!("need to pay {price}")),
            }));
        } else if price < payment_detail.payment {
            let payment_over = payment_detail.payment - price;
            return Ok(Json(Message { 
                message: "transaction success, overpay", 
                payload: Some(format!(r#"repay: {payment_over}"#)), 
            }));
        } else {
            return Ok(Json(Message{
                message: "transaction success",
                payload: None, 
            }));
        }
    } else {
        return Err(actix_web::error::ErrorBadRequest(sqlx::error::UnexpectedNullError))
    }
}
