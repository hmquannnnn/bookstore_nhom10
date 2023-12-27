import { useSelector } from "react-redux";
import "./Purchase.scss"
import { callGetOrder } from "../../services/api/orderAPI";
import { useEffect } from "react";
import { all } from "axios";
import { Col, Row } from "antd";
const Purchase = () => {
    // const {orderId, orderAmount, orderIdList} = useSelector(state => state.order);
    const orderId = localStorage.getItem("orderId");
    let orderIdList = [];
    const getOrderList = async () => {
        const res = await callGetOrder();
        if (res) {
            const allOrder = res.payload;
            console.log(">>>all order: ", allOrder);
            if (!orderIdList.length) {
                allOrder.map(book => {
                    if (book.id == orderId) {
                        orderIdList.push(book);
                    }
                });
            }
            console.log(">>>order list: ", orderIdList);
        }
    }
    useEffect(() => {
        orderIdList = [];
        getOrderList();
    }, []);
    return (
        <>
            {orderId}
        </>
    )
}

export default Purchase;