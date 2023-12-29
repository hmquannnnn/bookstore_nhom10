import instance from "../../utils/axiosCustomize"

export const callPayment = (orderId, payment) => {
    const req = {
        order_id: orderId,
        payment: payment
    }
    console.log(req);
    return instance.post(`/payment`, req);
}