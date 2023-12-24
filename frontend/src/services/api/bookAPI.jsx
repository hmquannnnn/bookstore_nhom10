import { useSelector } from "react-redux";
import instance from "../../utils/axiosCustomize";

// const getPage = () => {
//     const page = useSelector(state => state.books.page);
//     return page;
// }
const booksURL = "/book"

const start = 0;
const length = 10;

export const callBooksSortByRating = () => {
    return instance.get(`${booksURL}/sort/desc?start=${start}&length=${length}`);
}

export const callBooksSortByPurchased = () => {
    return instance.get(`${booksURL}/sort/purchase/desc?start=${start}&length=${length}`);
}

export const callBooksSortByPriceAsc = () => {

    return instance.get(`${booksURL}/sort/price/asc?start=${start}&length=${length}`);
}

export const callBooksSortByPriceDesc = () => {
    return instance.get(`${booksURL}/sort/price/desc?start=${start}&length=${length}`);
}

export const callGetBook = (bookId) => {
    return instance.get(`${booksURL}?id=${bookId}`);
}

export const callSearchBook = (value) => {
    return instance.get(`/search/${booksURL}?value=${value}`);
}

export const callSearchBookByAuthor = (value) => {
    return instance.get(`/search/author/${booksURL}?value=${value}`);
}

export const filterBookByPrice = (start, end) => {
    const priceRange = {
        "start": start,
        "end": end
    }
    return instance.get(`${booksURL}/filter/price`, priceRange)
}

export const filterBookByGenres = (genres) => {

}