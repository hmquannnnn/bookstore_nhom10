import instance from "../../utils/axiosCustomize"
import imageUrlConfig from "../imageUrlConfig";

const orderURL = "/order"

export const callCreateOrder = (orderList) => {
    // console.log(">>>check order list: ", orderList)
    return instance.post(`${orderURL}`, orderList);
}

export const callGetOrder = async () => {
    // return instance.get(`${orderURL}`);

    // config image url để deploy
    const res = await instance.get(`${orderURL}`);
    res.payload.map(book => book.front_page_url = imageUrlConfig(book.front_page_url));
    // console.log("check api:", res.payload);
    return res;
}