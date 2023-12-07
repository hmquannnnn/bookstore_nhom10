import instance from "../../utils/axiosCustomize";

const booksURL = "/book"

export const callBooksSortByRating = () => {
    return instance.get(`${booksURL}/sort/desc?start=0&length=14`);
}

export const callBooksSortByPurchased = () => {
    return instance.get(`${booksURL}/sort/purchase/desc?start=0&length=14`);
}

export const callBooksSortByPriceAsc = () => {
    return instance.get(`${booksURL}/sort/price/asc?start=0&length=14`);
}

export const callBooksSortByPriceDesc = () => {
    return instance.get(`${booksURL}/sort/price/desc?start=0&length=14`);
}

export const callGetBook = (bookId) => {
    return instance.get(`${booksURL}?id=${bookId}`);
}