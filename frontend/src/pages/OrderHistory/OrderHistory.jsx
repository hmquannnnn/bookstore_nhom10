import { useEffect, useState } from "react";
import { callGetOrder } from "../../services/api/orderAPI";
import "./OrderHistory.scss"
import { Col, Divider, Rate, Row } from "antd";
import instance from "../../utils/axiosCustomize";
import { Link, useNavigate } from "react-router-dom";
import path from "../../routes/path";
import { callBooksSortByPurchased, callGetBook } from "../../services/api/bookAPI";
import { useDispatch } from "react-redux";
import { getCurrentBookAction } from "../../redux/slice/bookSlice";

const groupOrdersById = (orders) => {
    const groupedOrders = {};
    orders.map(order => {
        const orderId = order.id;
        if (groupedOrders[orderId]) {
            groupedOrders[orderId].push(order);
        } else {
            groupedOrders[orderId] = [order];
        }
    });
    const result = Object.values(groupedOrders);
    return result;
}

const getOrderDetail = (order) => {
    let quantityOrdered = 0;
    let amount = 0;
    order.map(book => {
        quantityOrdered += book.quantity_ordered;
        amount += book.quantity_ordered * book.price_each;
    })
    const orderDetail = {
        quantityOrdered: quantityOrdered,
        amount: amount
    }
    return orderDetail;
}

const getDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
};

const OrderHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [allOrder, setAllOrder] = useState([]);
    const [bookList, setBookList] = useState([]);
    const [hoveredBookId, setHoveredBookId] = useState(null);

    const getOrder = async () => {
        const res = await callGetOrder();
        if (res.payload) {
            setAllOrder(groupOrdersById(res.payload));
        }
    }

    const getBookList = async () => {
        const res = await callBooksSortByPurchased(1);
        if (res) {
            setBookList(res.slice(0, 5));
        }
    }

    useEffect(() => {
        getOrder();
        getBookList();
    }, []);
    const handleMouseEnter = (bookId) => {
        // setIsHovered(true);
        setHoveredBookId(bookId);
        // console.log(">>>check hover: ", bookId, hoveredBookId);
    }
    const handleMouseLeave = () => {
        setHoveredBookId(null);
        // setIsHovered(false);
    }
    const onBookClick = async (bookId) => {
        const res = await callGetBook(bookId);
        if (res) {
            dispatch(getCurrentBookAction(res))
            navigate(`${path.bookDetails}?id=${bookId}`)
        }
    }
    console.log("check page: ", bookList);
    return (
        <>
            <div className="history-page">
                <p className="page-title">Lịch sử đặt hàng</p>
                {allOrder.length === 0 ? (
                    <>
                        <div className="empty">
                            <img src="https://salt.tikicdn.com/ts/upload/43/fd/59/6c0f335100e0d9fab8e8736d6d2fbcad.png" />
                            <p>Bạn chưa có đơn hàng nào, hãy tham khảo những sách UEThuviensach gợi ý ở dưới nhé!</p>
                            {/* <p>Bạn chưa có đơn hàng nào</p> */}
                            <Link to={path.home} style={{ textDecoration: "none" }}>
                                <button className="btn-back" type="submit">Tiếp tục mua sắm</button>
                            </Link>
                        </div>
                        <div style={{ backgroundColor: "white", borderRadius: "4px", padding: "10px 5px", marginTop: "15px" }}>
                            <p style={{ marginTop: "5px", fontWeight: "600", fontSize: "16px", fontFamily: "sans-serif" }}>Sản phẩm bán chạy</p>
                            <Row className="books" style={{ marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "10px", backgroundColor: "white", borderRadius: "4px" }}>
                                {
                                    bookList.map(book => (
                                        <div className="book-cell" key={book.id} style={hoveredBookId === book.id ? { boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)", width: "calc(20% - 10px)", backgroundColor: "white", cursor: "pointer", borderRadius: "4px", border: "1px solid lightgrey" } : { width: "calc(20% - 10px)", backgroundColor: "white", cursor: "pointer", borderRadius: "4px", border: "1px solid lightgrey" }}
                                            onMouseEnter={() => handleMouseEnter(book.id)} onMouseLeave={handleMouseLeave}
                                            onClick={() => onBookClick(book.id)}>

                                            <span style={{ display: "inline" }}>
                                                <div className="thumbnail" >
                                                    <img src={book.front_page_url} alt="" style={{ height: "250px", maxWidth: "90%", display: "block", margin: "auto", objectFit: "contain", backgroundColor: "white", border: "1px solid black" }} />
                                                </div>
                                                <div className="book-title" style={{ fontSize: "16px", marginTop: "5px" }}>
                                                    {book.title}
                                                </div>
                                                <span style={{ fontSize: "12px" }}>
                                                    <span className="book-rating">
                                                        {book.rating}
                                                        <Rate value={Math.floor(book.rating)} disabled style={{ fontSize: "12px", position: "relative", left: "5px" }} />
                                                    </span>
                                                    <Divider type={"vertical"} style={{ height: "20px", margin: "0 6px" }} />
                                                    <span className="book-purchased" style={{ fontSize: "12px" }}>
                                                        Đã bán {book.number_of_purchases}
                                                    </span>
                                                </span>

                                                <div className="book-price" style={{ marginTop: "30px" }}>
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.price)}
                                                </div>
                                            </span>

                                        </div>
                                        // </Link>


                                    ))
                                }

                                {/*</Col>*/}
                            </Row>
                        </div>
                    </>

                ) : (
                    allOrder.map((order) => (
                        <Col key={order[0].id} className="orders">
                            <p className="order-id">Mã đơn hàng: {order[0].id}</p>
                            <p>Ngày đặt hàng: {getDate(order[0].order_date)}</p>
                            <Col style={{ border: "1px solid #cfcece", margin: "15px 20px", borderRadius: "10px" }}>
                                {order.map((book, bookIndex) => (
                                    <Row key={book.book_id} className="book-in-order">
                                        <Col md={12}>
                                            <Row>
                                                <Col span={8}>
                                                    <img className="book-image" src={book.front_page_url} alt="image" onClick={() => onBookClick(book.book_id)} />
                                                </Col>
                                                <div className="book-title" onClick={() => onBookClick(book.book_id)}>{book.title}</div>
                                            </Row>
                                        </Col>
                                        <Col md={4}>
                                            <div className="price-each center">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.price_each)}</div>
                                        </Col>
                                        <Col md={4}>
                                            <Row className="quantity-ordered center" style={{ border: "none", position: "relative", top: "1px" }}>
                                                SL: {book.quantity_ordered}
                                            </Row>
                                        </Col>
                                        <Col md={4}>
                                            <div className="amount center">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.price_each * book.quantity_ordered)}</div>
                                        </Col>
                                        {bookIndex < order.length - 1 && <Divider />}
                                    </Row>
                                ))}
                            </Col>
                        </Col>
                    ))

                )}


            </div>
        </>
    )
}

export default OrderHistory;
