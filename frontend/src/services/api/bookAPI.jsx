import { useSelector } from "react-redux";
import instance from "../../utils/axiosCustomize";

// const getPage = () => {
//     const page = useSelector(state => state.books.page);
//     return page;
// }
const booksURL = "/book"

const length = 10;
const start = 0;

export const callBooksSortByRating = (page) => {
    return instance.get(`${booksURL}/sort/desc?start=${length * (page - 1)}&length=${length}`);
}

export const callBooksSortByPurchased = (page) => {
    // console.log(`${booksURL}/sort/purchase/desc?start=${length * (page - 1)}&length=${length}`, "   ", page)
    return instance.get(`${booksURL}/sort/purchase/desc?start=${length * (page - 1)}&length=${length}`);
}

export const callBooksSortByPriceAsc = (page) => {

    return instance.get(`${booksURL}/sort/price/asc?start=${length * (page - 1)}&length=${length}`);
}

export const callBooksSortByPriceDesc = (page) => {
    return instance.get(`${booksURL}/sort/price/desc?start=${length * (page - 1)}&length=${length}`);
}

export const callGetBook = (bookId) => {
    return instance.get(`${booksURL}?id=${bookId}`);
}

export const callSearchBook = (value) => {
    return instance.get(`/search${booksURL}?value=${value}`);
}

export const callSearchBookByAuthor = (value) => {
    return instance.get(`/search/author${booksURL}?value=${value}`);
}

export const callFilterBookByPrice = (start, end) => {
    // console.log(">>>range: ", priceRange);
    console.log("check range: ", start, " ", end);
    return instance.get(`${booksURL}/filter/price?start=${start}&end=${end}`);
}

export const callFilterBookByGenres = (genres) => {

}