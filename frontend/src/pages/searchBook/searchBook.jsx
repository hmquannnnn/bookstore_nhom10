import { Link, useNavigate, useSearchParams } from "react-router-dom"
import "./searchBook.scss"
import { callGetBook, callSearchBook } from "../../services/api/bookAPI";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResultAction } from "../../redux/slice/searchSlice";
import { useEffect, useState } from "react";
import path from "../../routes/path";
import { Divider, Rate, Row } from "antd";
import { getCurrentBookAction } from "../../redux/slice/bookSlice";

const SearchBook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [hoveredBookId, setHoveredBookId] = useState(null);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const getSearchResult = async () => {
        const res = await callSearchBook(query);
        if (res) {
            dispatch(getSearchResultAction(res));
        }
    }
    useEffect(() => {
        getSearchResult();
    }, []);
    const result = useSelector(state => state.search.result);
    const handleMouseEnter = (bookId) => {
        // setIsHovered(true);
        setHoveredBookId(bookId);
        console.log(">>>check hover: ", bookId, hoveredBookId);
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
            <div className="search-page">
                <p>Kết quả tìm kiếm cho &#34;{query}&#34;</p>
                <Row className="books" style={{ marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {/*<Col className="book-cell">*/}
                    {
                        result.map(book => (
                            // <Link to="book-details">
                            <div className="book-cell" key={book.id} style={hoveredBookId === book.id ? { boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)", width: "calc(20% - 9px)", backgroundColor: "white", cursor: "pointer", borderRadius: "4px" } : { width: "calc(20% - 9px)", backgroundColor: "white", cursor: "pointer", borderRadius: "4px" }}
                                onMouseEnter={() => handleMouseEnter(book.id)} onMouseLeave={handleMouseLeave}
                                onClick={() => onBookClick(book.id)}>

                                <span style={{ display: "inline" }}>
                                    <div className="thumbnail" >
                                        <img src={book.front_page_url} alt="" style={{ height: "250px", display: "block", margin: "auto", objectFit: "contain", backgroundColor: "white", border: "1px solid black" }} />
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

export default SearchBook;