import {useSelector} from "react-redux";

const FilledCart = () => {
    const booksInCart = useSelector(state => state.cart.books);
    return (
        <>
            {
                booksInCart.map(book => (
                    <span className={"book-in-cart"}>
                        <div className={"book-image"}>{book.book_id}</div>
                        <div className={"quantity-ordered"}>{book.quantity_ordered}</div>
                    </span>
                ))
            }
        </>
    )
}

export default FilledCart;