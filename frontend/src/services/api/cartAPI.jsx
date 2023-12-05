import instance from "../../utils/axiosCustomize.js";

const cartURL = "/cart"
export const callAddBookIntoCart = ( bookId, quantityOrdered) => {
    // console.log(">>>>data: ", bookId, quantityOrdered);
    const data = {
        book_id: bookId,
        quantity_ordered: quantityOrdered
    }
    const jsonData = JSON.stringify(data)
    return instance.put(`${cartURL}`, jsonData);
}

export const callGetCart = () => {
    return instance.get(`${cartURL}`);
}