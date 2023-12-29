import { useEffect, useState } from "react";
import { callGetOrder } from "../../services/api/orderAPI";
import "./OrderHistory.scss"
import { Col, Divider, Row } from "antd";

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
    const [allOrder, setAllOrder] = useState([]);

    const getOrder = async () => {
        const res = await callGetOrder();
        if (res.payload) {
            setAllOrder(groupOrdersById(res.payload));
        }
    }

    useEffect(() => {
        getOrder()
    }, []);

    return (
        <>
            <div className="history-page">
                <p className="page-title">Lịch sử đặt hàng</p>
                { }
                {allOrder.map((order) => (
                    <Col key={order[0].id} className="orders">
                        <p className="order-id">Mã đơn hàng: {order[0].id}</p>
                        <p>Ngày đặt hàng: {getDate(order[0].order_date)}</p>
                        <Col style={{ border: "1px solid #cfcece", margin: "15px 20px", borderRadius: "10px" }}>
                            {order.map((book, bookIndex) => (
                                <Row key={book.book_id} className="book-in-order">
                                    <Col md={12}>
                                        <Row>
                                            <Col span={8}>
                                                <img className="book-image" src={book.front_page_url} alt="image" />
                                            </Col>
                                            <div className="book-title">{book.title}</div>
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
                ))}
            </div>
        </>
    )
}

export default OrderHistory;
