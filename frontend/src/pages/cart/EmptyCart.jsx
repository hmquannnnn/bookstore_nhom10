import { Link, useNavigate } from "react-router-dom";
import "./DefaultCart/cart.scss"
import { useDispatch, useSelector } from "react-redux";
import path from "../../routes/path";
import { Divider, Rate, Row } from "antd";
import { useEffect, useState } from "react";
import { callBooksSortByPurchased, callGetBook } from "../../services/api/bookAPI";
import { getCurrentBookAction } from "../../redux/slice/bookSlice";

const EmptyCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([]);
    const [hoveredBookId, setHoveredBookId] = useState(null);
    const getBookList = async () => {
        const res = await callBooksSortByPurchased(1);
        if (res) {
            setBookList(res.slice(0, 6));
        }
    }
    useEffect(() => {
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
    return (
        <>
            <div className="empty-cart" style={{ marginBottom: "15px", backgroundColor: "white", borderRadius: "4px" }}>
                <img className="cart-image" src="https://salt.tikicdn.com/desktop/img/mascot@2x.png"></img>
                <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                <Link to={path.home}>
                    <button className="btn-back" type="submit">Tiếp tục mua sắm</button>
                </Link>
            </div>
            <div style={{ backgroundColor: "white", borderRadius: "4px", padding: "10px 20px", marginTop: "15px", position: "relative", top: "15px" }}>
                <p style={{ marginTop: "5px", fontWeight: "600", fontSize: "16px", fontFamily: "sans-serif" }}>Sản phẩm bán chạy</p>
                <Row className="books" style={{ marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "10px", backgroundColor: "white", borderRadius: "4px" }}>
                    {
                        bookList.map(book => (
                            <div className="book-cell" key={book.id} style={hoveredBookId === book.id ? { boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)", width: "calc(17% - 15px)", backgroundColor: "white", cursor: "pointer", borderRadius: "4px", border: "1px solid lightgrey" } : { width: "calc(17% - 15px)", backgroundColor: "white", cursor: "pointer", borderRadius: "4px", border: "1px solid lightgrey" }}
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
    )
}

export default EmptyCart;