import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetCart } from "../../../services/api/cartAPI";
import { getCartAction } from "../../../redux/reducer/cartSlice";
import { Col, Row } from "antd";
// import { Row, Column } from "antd";



const FilledCart = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.account.user);

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
    const cart = useSelector(state => state.cart);
    return (
        <>

            <Row className="filled-cart-container" style={{ width: "1440px", margin: "auto" }}>
                <Col className="left" md={16} style={{ border: "1px solid black", margin: "0 20px", height: "100px" }}>
                    {
                        booksInCart.map(book => (
                            <Row key={book} className={"book-in-cart"} style={{ border: "1px solid red", margin: "7px 0" }}>
                                <div className={"book-image"}>{book.book_id}</div>
                                <div className={"quantity-ordered"}>{book.quantity_ordered}</div>
                            </Row>
                        ))
                    }
                </Col>
                <Col className="right" md={7} style={{ border: "1px solid green", height: "100px", marginRight: "20px" }}>
                    <Row className="user-info">
                        <h4>Giao tới</h4>
                        <div className="user-name" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <p>Tên người nhận: </p>
                            <div>{user.name}</div>
                        </div>
                        <div className="user-phone" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <p>Số điện thoại: </p>
                            <div>{user.phone}</div>
                        </div>
                        <div className="user-address" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <p>Địa chỉ: </p>
                            <div>{user.address}</div>
                        </div>
                    </Row>
                    <Row className="order-info">
                        <h4>Tổng tiền</h4>
                        <p className="amount">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.amount)}</p>
                        <button type="submit" style={{ padding: "5px 30px" }}>Thanh toán</button>
                    </Row>
                </Col>
            </Row>

        </>
    )
}

export default FilledCart;