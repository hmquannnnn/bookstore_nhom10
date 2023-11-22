import instance from "../../utils/axiosCustomize";

const booksURL = "/book"

export const callBooksSortByRating = () => {
    return instance.get(`${booksURL}/sort/desc?start=0&length=3`);
}