import instance from "../../utils/axiosCustomize";

const booksURL = "/book"

export const callBooksSortByRating = () => {
    return instance.get(`${booksURL}/sort/desc?start=0&length=3`);
}

export const callBookSortByPurchased = () => {
    return instance.get(`${booksURL}/purchase/sort/desc?start=0&length=3`);
}