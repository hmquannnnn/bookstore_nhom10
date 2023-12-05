import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callGetBook} from "../../services/api/bookAPI.jsx";
import {getCurrentBookAction} from "../../redux/reducer/bookSlice.js";
import {useSearchParams} from "react-router-dom";
import "./BookDetails.scss"
import {Button, Col, Modal, Row} from "antd";
import {callAddBookIntoCart} from "../../services/api/cartAPI.jsx";
import path from "../../routes/path.jsx";
import {addBookIntoCartAction} from "../../redux/reducer/cartSlice.jsx";

const BookDetails = () => {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    // console.log(">>>url: ", id);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const getBook = async() => {
        const res = await callGetBook(id);
        // console.log(">>> response: ", res);
        if(res) {
            // console.log(">>>call success", res);
            dispatch(getCurrentBookAction(res));
        }
    }
    useEffect(() => {
        getBook();
    }, []);
    const currentBook = useSelector(state => state.books.currentBook);
    const onClick = async(bookId) => {

        const res = await callAddBookIntoCart(bookId, 1);
        // console.log(">>>add to cart: ", res);
        if(res) {
            console.log("success");
            dispatch(addBookIntoCartAction());
        }
    }
    // const showModal = () => {
    //     if(isAuthenticated) {
    //         navigate(path.cart)
    //     } else {
    //         setIsModalOpen(true);
    //     }
    //
    // };
    // const handleOk = () => {
    //     setIsModalOpen(false);
    //     navigate(path.logIn)
    // };
    // const handleCancel = () => {
    //     setIsModalOpen(false);
    // };
    return (
        <Row className="book-details-page" >
            <Col md={10} sm={10} xs={24} className={"left"}>
                <div className="book-image">
                    <img src={currentBook.front_page_url} alt=""/>
                </div>
            </Col>
            <Col md={14} sm={14} xs={24} className={"right"} >
                <div className="book-info" >
                    <div className="author">Tác giả: {currentBook.author_name}</div>
                    <div className="title">{currentBook.title}</div>
                    <div className="price"> { new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentBook.price) } </div>
                </div>
                <div>
                    <Button  htmlType={"submit"} onClick={() => onClick(currentBook.id)}>Thêm vào giỏ hàng</Button>
                </div>
            </Col>
            {/*<Modal title="Bạn chưa đăng nhập"*/}
            {/*       open={isModalOpen}*/}
            {/*       onOk={handleOk}*/}
            {/*       okText="Đăng nhập"*/}
            {/*       onCancel={handleCancel}*/}
            {/*       cancelText="Hủy"*/}
            {/*>*/}
            {/*    <p>Đăng nhập để truy cập giỏ hàng</p>*/}

            {/*</Modal>*/}
        </Row>
    )
}

export default BookDetails;