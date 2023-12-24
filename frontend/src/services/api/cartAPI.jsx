import instance from "../../utils/axiosCustomize.js";

const cartURL = "/cart"
export const callAddBookIntoCart = (bookId, quantityOrdered) => {
    // console.log(">>>>data: ", bookId, quantityOrdered);
    const req = {
        book_id: bookId,
        quantity_ordered: quantityOrdered
    }
    return instance.put(`${cartURL}`, req);
}

export const callGetCart = () => {
    return instance.get(`${cartURL}`);
}

export const callChangeQuantity = (bookId, quantityOrdered) => {
    const req = {
        book_id: bookId,
        quantity_ordered: quantityOrdered,
    }
    return instance.patch(`${cartURL}`, req)
}

export const callDeleteBook = (bookId) => {
    console.log("check api: ", bookId);
    return instance.delete(`${cartURL}?book_id=${bookId}`);
}