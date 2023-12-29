import { useEffect, useState } from "react";
import { callGetOrder } from "../../services/api/orderAPI";
import "./OrderHistory.scss"
import { Col } from "antd";

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

const OrderHistory = () => {
    const [allOrder, setAllOrder] = useState([]);
    const getOrder = async () => {
        const res = await callGetOrder();
        setAllOrder(groupOrdersById(res.payload));
        console.log(typeof (allOrder));
    }
    useEffect(() => {
        getOrder()
    }, []);
    return (
        <>
            <h4>Lịch sử đặt hàng</h4>
            {allOrder.map(order => (
                <Col key={order[0].id}>
                    {typeof (order[0].id)}
                </Col>
            ))}
        </>
    )
}

export default OrderHistory;