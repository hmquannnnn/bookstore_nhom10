import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callGetBook } from "../../services/api/bookAPI.jsx";
// import {getCurrentBookAction} from "../../redux/reducer/bookSlice.js";
import { useSearchParams } from "react-router-dom";
import "./BookDetails.scss"
import { Button, Col, Input, Modal, Row } from "antd";
import { callAddBookIntoCart } from "../../services/api/cartAPI.jsx";
import path from "../../routes/path.jsx";
import { addBookIntoCartAction } from "../../redux/reducer/cartSlice.jsx";
import { getCurrentBookAction } from "../../redux/reducer/bookSlice.jsx";

const BookDetails = () => {
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    // console.log(">>>url: ", id);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const getBook = async () => {
        const res = await callGetBook(id);
        // console.log(">>> response: ", res);
        if (res) {
            // console.log(">>>call success", res);
            dispatch(getCurrentBookAction(res));
        }
    }
    useEffect(() => {
        getBook();
    }, []);
    const currentBook = useSelector(state => state.books.currentBook);
    const onClick = async (bookId, count) => {

        const res = await callAddBookIntoCart(bookId, count);
        // console.log(">>>add to cart: ", res);
        if (res) {
            // console.log("success");
            dispatch(addBookIntoCartAction({ count, bookId }));
        }
    }
    const handleIncrement = () => {
        setCount(count + 1);
        console.log(">>>check count: ", count);
    }
    const handleDecrement = () => {
        if(count > 0) {
            setCount(count - 1);
        } else {
            setCount(0);
        }
    }

    return (
        <Row className="book-details-page" >
            <Col md={10} sm={10} xs={24} className="left">
                <div className="book-image">
                    <img src={currentBook.front_page_url} alt="" />
                </div>
            </Col>
            <Col md={14} sm={14} xs={24} className="right">
                <Row>
                    <div className="book-info" >
                        <div className="author">Tác giả: {currentBook.author_name}</div>
                        <div className="title">{currentBook.title}</div>
                        <div className="price"> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentBook.price)} </div>
                    </div>
                    <span className="order-counter">
                    <Button className="counter" type="text" onClick={() => handleDecrement()}>-</Button>
                    <Input defaultValue={1} value={count} style={{ width: "20px", height: "20px", borderRadius: "3px", padding: "0", textAlign: "center" }} />
                    <Button className="counter" type="text" onClick={() => handleIncrement()}>+</Button>
                </span>
                    <div className="order-info">
                        <Button className="add-btn" htmlType={"submit"} onClick={() => onClick(currentBook.id, count)}>
                            Thêm vào giỏ hàng

                        </Button>

                    </div>
                </Row>
                <Row className="description">
                    <h4>Mô tả</h4>
                    {currentBook.desciption};
                </Row>


            </Col>

        </Row>
    )
}

export default BookDetails;