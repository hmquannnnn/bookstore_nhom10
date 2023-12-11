import { useSelector } from "react-redux";
import instance from "../../utils/axiosCustomize";

const getPage = () => {
    const page = useSelector(state => state.books.page);
    return page;
}
const booksURL = "/book"

// const start = 10 * (getPage() - 1);
const start = 0;
const length = 10;
const queries = `start=${start}&length=${length}`

export const callBooksSortByRating = (page) => {
    return instance.get(`${booksURL}/sort/desc?${queries}`);
}

export const callBooksSortByPurchased = (page) => {
    console.log(">>>check page: ", page * 10);
    const start = (page - 1) * 10;
    return instance.get(`${booksURL}/sort/purchase/desc?${queries}`);
}

export const callBooksSortByPriceAsc = () => {
    return instance.get(`${booksURL}/sort/price/asc?${queries}`);
}

export const callBooksSortByPriceDesc = () => {
    return instance.get(`${booksURL}/sort/price/desc?${queries}`);
}

export const callGetBook = (bookId) => {
    return instance.get(`${booksURL}?id=${bookId}`);
}