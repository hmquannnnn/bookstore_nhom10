import { useSelector } from "react-redux";
import instance from "../../utils/axiosCustomize";
import imageUrlConfig from "../imageUrlConfig";

// const getPage = () => {
//     const page = useSelector(state => state.books.page);
//     return page;
// }
const booksURL = "/book"

const length = 10;
const start = 0;

export const callBooksSortByRating = async (page) => {
    // return instance.get(`${booksURL}/sort/desc?start=${length * (page - 1)}&length=${length}`);

    // config image url để deploy
    const res = await instance.get(`${booksURL}/sort/desc?start=${length * (page - 1)}&length=${length}`);
    // res.forEach(book => book.front_page_url = imageUrlConfig(book.front_page_url));
    res.map(book => book.front_page_url = imageUrlConfig(book.front_page_url));
    return res;
}

export const callBooksSortByPurchased = async (page) => {
    // local
    // return instance.get(`${booksURL}/sort/purchase/desc?start=${length * (page - 1)}&length=${length}`);

    // config image url để deploy
    const res = await instance.get(`${booksURL}/sort/purchase/desc?start=${length * (page - 1)}&length=${length}`);
    // res.forEach(book => book.front_page_url = imageUrlConfig(book.front_page_url));
    res.map(book => book.front_page_url = imageUrlConfig(book.front_page_url));
    return res;
}

export const callBooksSortByPriceAsc = async (page) => {

    // return instance.get(`${booksURL}/sort/price/asc?start=${length * (page - 1)}&length=${length}`);

    // config image url để deploy
    const res = await instance.get(`${booksURL}/sort/price/asc?start=${length * (page - 1)}&length=${length}`);
    // res.forEach(book => book.front_page_url = imageUrlConfig(book.front_page_url));
    res.map(book => book.front_page_url = imageUrlConfig(book.front_page_url));
    return res;
}

export const callBooksSortByPriceDesc = async (page) => {
    // return instance.get(`${booksURL}/sort/price/desc?start=${length * (page - 1)}&length=${length}`);

    // config image url để deploy
    const res = await instance.get(`${booksURL}/sort/price/desc?start=${length * (page - 1)}&length=${length}`);
    // res.forEach(book => book.front_page_url = imageUrlConfig(book.front_page_url));
    res.map(book => book.front_page_url = imageUrlConfig(book.front_page_url));
    return res;

}

export const callGetBook = async (bookId) => {
    // return instance.get(`${booksURL}?id=${bookId}`);

    // config image url đẻ deploy
    const res = await instance.get(`${booksURL}?id=${bookId}`);
    res.front_page_url = imageUrlConfig(res.front_page_url);
    return res;
}

export const callSearchBook = async (value) => {
    // return instance.get(`/search${booksURL}?value=${value}`);

    // config image url để deploy
    const res = await instance.get(`/search${booksURL}?value=${value}`);
    res.map(book => book.front_page_url = imageUrlConfig(book.front_page_url));
    return res;
}

export const callSearchBookByAuthor = (value) => {
    return instance.get(`/search/author${booksURL}?value=${value}`);
}

export const callFilterBookByPrice = async (start, end) => {
    // console.log(">>>range: ", priceRange);
    console.log("check range: ", start, " ", end);
    // return instance.get(`${booksURL}/filter/price?start=${start}&end=${end}`);

    // config image url để deploy
    const res = await instance.get(`${booksURL}/filter/price?start=${start}&end=${end}`);
    res.map(book => book.front_page_url = imageUrlConfig(book.front_page_url));
    return res;
}

export const callFilterBookByGenres = (genres) => {

}