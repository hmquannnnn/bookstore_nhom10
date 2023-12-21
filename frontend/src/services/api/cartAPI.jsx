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

export const callQuantityIncrease = (bookId, quantityOrdered) => {
    const req = {
        book_id: bookId,
        quantity_ordered: quantityOrdered,
    }
    return instance.patch(`${cartURL}`, req)
}

export const callQuantityDecrease = (bookId, quantityOrdered) => {
    const req = {
        book_id: bookId,
        quantity_ordered: quantityOrdered,
    }
    return instance.patch(`${cartURL}`, req)
}

export const callDeleteBook = (bookId) => {
    const req = {
        "user_email": "user@gmail.com",
        "book_id": bookId
    }
    // const req2 = JSON.stringify(req);
    console.log(req);
    return instance.delete(`${cartURL}`, req);
}