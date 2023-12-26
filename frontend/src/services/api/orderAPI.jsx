import instance from "../../utils/axiosCustomize"

const orderURL = "/order"

export const callCreateOrder = (orderList) => {
    console.log(">>>check order list: ", orderList)
    return instance.post(`${orderURL}`, orderList);
}

export const callGetOrder = () => {
    return instance.get(`${orderURL}`);
}