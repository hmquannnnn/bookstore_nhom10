import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetCart } from "../../services/api/cartAPI";
import { getCartAction } from "../../redux/reducer/cartSlice";



const FilledCart = () => {
    const dispatch = useDispatch()
    const initFilledCart = async () => {
        const res = await callGetCart();
        console.log(">>>check: ", res);
        if (res) {
            dispatch(getCartAction(res));
        }
    }
    useEffect(() => {
        initFilledCart();
    }, []);
    const booksInCart = useSelector(state => state.cart.books);
    return (
        <>
            {
                booksInCart.map(book => (
                    <span key={book} className={"book-in-cart"}>
                        <div className={"book-image"}>{book.book_id}</div>
                        <div className={"quantity-ordered"}>{book.quantity_ordered}</div>
                    </span>
                ))
            }
        </>
    )
}

export default FilledCart;