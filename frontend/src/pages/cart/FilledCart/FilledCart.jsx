import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callChangeQuantity, callDeleteBook, callGetCart } from "../../../services/api/cartAPI";
import { decreaseQuantityOrderedAction, deleteBookAction, deleteSelectedAction, getCartAction, increaseQuantityOrderedAction, selectBookAction } from "../../../redux/slice/cartSlice";
import { Checkbox, Col, Divider, Modal, Row } from "antd";
import { useNavigate } from "react-router-dom";
import path from "../../../routes/path";
import "./FilledCart.scss"
import { callGetBook } from "../../../services/api/bookAPI";
import { getCurrentBookAction } from "../../../redux/slice/bookSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import { callCreateOrder } from "../../../services/api/orderAPI";
import { getOrderAction } from "../../../redux/slice/orderSlice";

const FilledCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.account.user);
    const [selectAll, setSelectAll] = useState(false);
    const [selectAllState, setSelectAllState] = useState(false);
    const [checkedState, setCheckedState] = useState({});

    const initFilledCart = async () => {
        const res = await callGetCart();
        if (res) {
            const booksWithChecked = res.map(book => ({ ...book, checked: false }));
            dispatch(getCartAction(booksWithChecked));
        }
    }

    useEffect(() => {
        initFilledCart();
    }, []);



    const booksInCart = useSelector(state => state.cart.books);
    const cart = useSelector(state => state.cart);
    useEffect(() => {
        const initialState = booksInCart.reduce((state, book) => {
            state[book.book_id] = false;
            return state;
        }, {});
        setCheckedState(initialState);
    }, [booksInCart]);

    // useEffect(() => {
    //     setSelectAllState(selectAll);
    // }, [selectAll]);

    // useEffect(() => {
    //     booksInCart.map(book => {
    //         const selectInfo = {
    //             bookId: book.book_id,
    //             checked: selectAllState
    //         }
    //         dispatch(selectBookAction(selectInfo));
    //     });
    // }, [selectAllState, booksInCart]);

    const onClickBook = async (bookId) => {
        const res = await callGetBook(bookId);
        if (res) {
            dispatch(getCurrentBookAction(res))
            navigate(`${path.bookDetails}?id=${bookId}`)
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenAll, setIsModalOpenAll] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);

    const showModal = (bookId) => {
        setSelectedBookId(bookId);
        setIsModalOpen(true);
    };

    const handleCancel = async () => {
        setIsModalOpen(false);

        if (selectedBookId) {
            const res = await callDeleteBook(selectedBookId);
            if (res) {
                console.log("ok", res);
                dispatch(deleteBookAction(selectedBookId));
            }
        }
    };

    const handleOk = async () => {
        setIsModalOpen(false);
    };

    const showModalAll = () => {
        setIsModalOpenAll(true);
    };

    const handleCancelAll = async () => {
        setIsModalOpenAll(false);
        handleDeleteAll();
    };

    const handleOkAll = async () => {
        setIsModalOpenAll(false);
    };

    const handleDecrement = async (bookId, quantityOrdered) => {
        if (quantityOrdered === 1) return;
        const res = await callChangeQuantity(bookId, quantityOrdered - 1);
        console.log(">>>check api: ", res, bookId);
        if (res) {
            dispatch(decreaseQuantityOrderedAction(bookId));
        }
    }

    const handleIncrement = async (bookId, quantityOrdered) => {
        const res = await callChangeQuantity(bookId, quantityOrdered + 1);
        console.log(">>>check api: ", res, bookId);
        if (res) {
            dispatch(increaseQuantityOrderedAction(bookId));
        }
    }

    const handleSelectBook = (bookId, checked) => {
        // if (!checked) setSelectAll(false);
        console.log("check select: ", bookId, checked);
        const selectInfo = {
            bookId: bookId,
            checked: checked
        }
        dispatch(selectBookAction(selectInfo));
    }

    const selectedBook = useSelector(state => state.cart.selected);

    const handleOrder = async () => {
        const orderList = selectedBook.map(book => ({
            book_id: book.book_id,
            quantity_ordered: book.quantity_ordered
        }));
        orderList.map(async (book) => {
            await callDeleteBook(book.book_id);
        });
        const res = await callCreateOrder(orderList);
        console.log("check create order: ", orderList, " ", res);

        if (res && res.payload && res.payload.id) {
            const orderId = res.payload.id;
            const orderInfo = {
                orderId: orderId,
                orderList: selectedBook
            }
            let amount = 0;
            selectedBook.forEach(book => amount += book.quantity_ordered * book.price_each);
            localStorage.setItem("amount", amount);
            localStorage.setItem("orderId", orderId);
            dispatch(getOrderAction(orderInfo));
            dispatch(deleteSelectedAction());
            navigate(path.purchase);
        }
    }

    const handleDeleteAll = async () => {
        booksInCart.map(async (book) => {
            dispatch(deleteBookAction(book.book_id));
            await callDeleteBook(book.book_id);
        });
    }

    const handleSelectAll = (checked) => {
        // setSelectAll(checked);
        setSelectAllState(checked);
        booksInCart.map(book => {
            const selectInfo = {
                bookId: book.book_id,
                checked: checked
            }
            dispatch(selectBookAction(selectInfo));
        });
    }

    return (
        <>
            <Row className="filled-cart-container" style={{ width: "1440px", margin: "auto" }}>
                <Col className="left" md={17} style={{ margin: "0 20px", height: "fit-content" }}>
                    <Row className="high-row">
                        <Col md={1}>
                            {/* <Checkbox
                                onChange={(e) => handleSelectAll(e.target.checked)}
                                style={{ position: "relative", top: "4px", left: "25px" }}
                                checked={selectAll}
                            >
                                <p>Tất cả ({useSelector(state => state.cart.total)} sản phẩm)</p>
                            </Checkbox> */}
                        </Col>
                        <Col className="row-name" md={9} style={{ marginLeft: "40px" }}>Sản phẩm</Col>
                        <Col className="row-name" md={4} >Đơn giá</Col>
                        <Col className="row-name" md={4} >Số lượng</Col>
                        <Col className="row-name" md={4} >Thành tiền</Col>
                        <Col className="delete" md={1} style={{ color: "red", position: "relative", top: "7px", left: "2px", cursor: "pointer" }} onClick={showModalAll}><FaRegTrashAlt /></Col>
                    </Row>
                    {booksInCart.map(book => (
                        <Row key={book.book_id} className="book-in-cart" style={{ marginBottom: "10px" }}>
                            <Col md={1}>
                                <Checkbox
                                    onChange={(e) => handleSelectBook(book.book_id, e.target.checked)}
                                    // checked={selectAll}
                                    // checked={book.checked || selectAllState}
                                    style={{ position: "relative", top: "50px", left: "25px" }}
                                />
                            </Col>
                            <Col md={10}>
                                <Row>
                                    <img className="book-image" src={book.front_page_url} alt="image" onClick={() => onClickBook(book.book_id)} />
                                    <div className="book-title" onClick={() => onClickBook(book.book_id)}>{book.title}</div>
                                </Row>
                            </Col>
                            <Col md={4}>
                                <div className="price-each center">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.price_each)}</div>
                            </Col>
                            <Col md={4}>
                                <Row className="quantity-ordered center">
                                    <span className="fluctuation minus" onClick={() => handleDecrement(book.book_id, book.quantity_ordered)}>-</span>
                                    <Divider type="vertical" style={{ marginRight: "13px" }} />
                                    {book.quantity_ordered}
                                    <Divider type="vertical" style={{ marginLeft: "13px" }} />
                                    <span className="fluctuation" onClick={() => handleIncrement(book.book_id, book.quantity_ordered)}>+</span>
                                </Row>
                            </Col>
                            <Col md={4}>
                                <div className="amount center">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.price_each * book.quantity_ordered)}</div>
                            </Col>
                            <Col md={1} className="delete" onClick={() => showModal(book.book_id)}><FaRegTrashAlt /></Col>
                            <Modal title="Xóa sản phẩm" open={isModalOpen} onOk={handleOk} onCancel={() => handleCancel(book.book_id)} cancelText={"Xác Nhận"} okText={"Hủy"} maskClosable={false} closable={false}>
                                <p>Bạn có chắc chắn muốn xóa sản phẩm đang chọn?</p>
                            </Modal>
                            <Modal title="Xóa tất cả sản phẩm" open={isModalOpenAll} onOk={handleOkAll} onCancel={() => handleCancelAll()} cancelText={"Xác Nhận"} okText={"Hủy"} maskClosable={false} closable={false}>
                                <p>Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?</p>
                            </Modal>
                        </Row>
                    ))}
                </Col>
                <Col className="right" md={6} style={{ height: "fit-content", marginRight: "20px" }}>
                    <Row className="user-info">
                        <h4>Giao tới</h4>
                        <div className="user-name" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <p>Tên người nhận: {user.name}</p>
                        </div>
                        <div className="user-phone" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <p>Số điện thoại: {user.phone}</p>
                        </div>
                        <div className="user-address" style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "10px" }}>
                            <p>Địa chỉ: {user.address}</p>
                        </div>
                    </Row>
                    <Row className="order-info">
                        <h4 style={{ paddingLeft: "30px" }}>Tổng tiền</h4>
                        <p className="amount">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.amount)}</p>
                        <button className="order-btn" type="submit" onClick={() => handleOrder()} >Mua hàng ({cart.totalSelected})</button>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default FilledCart;
