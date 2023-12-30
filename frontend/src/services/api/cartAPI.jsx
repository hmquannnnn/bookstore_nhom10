
import instance from "../../utils/axiosCustomize.js";
import imageUrlConfig from "../imageUrlConfig.jsx";

const cartURL = "/cart"
export const callAddBookIntoCart = (bookId, quantityOrdered) => {
    // console.log(">>>>data: ", bookId, quantityOrdered);
    const req = {
        book_id: bookId,
        quantity_ordered: quantityOrdered
    }
    return instance.put(`${cartURL}`, req);
}

export const callGetCart = async () => {
    // return instance.get(`${cartURL}`);

    // config image url để deploy
    const res = await instance.get(`${cartURL}`);
    res.map(book => book.front_page_url = imageUrlConfig(book.front_page_url));
    return res;
}

export const callChangeQuantity = (bookId, quantityOrdered) => {
    const req = {
        book_id: bookId,
        quantity_ordered: quantityOrdered,
    }
    return instance.patch(`${cartURL}`, req)
}

export const callDeleteBook = (bookId) => {
    // console.log("check api: ", bookId);
    return instance.delete(`${cartURL}?book_id=${bookId}`);
}