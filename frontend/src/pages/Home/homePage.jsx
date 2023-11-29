import { Button, Checkbox, Col, Divider, Form, InputNumber, Rate, Row, Tabs } from "antd";
import {useEffect, useState} from "react";
import { callBooksSortByRating } from "../../services/api/bookAPI";
import { useDispatch, useSelector } from "react-redux";
import { getBooksAction } from "../../redux/counter/bookSlice";
// import {useSelector} from "react-redux"
const Home = () => {
    // const user = useSelector(state => state.account.user);
    const dispatch = useDispatch();
    const [ isActive, setIsActive] = useState("1")
    const [form] = Form.useForm();
    const handleChangeFilter = (changeValues, values) => {
        console.log(">>> check handleChangeFilter", changeValues, values);
    }
    const onFinish = () => {

    }
    // const onChange = (key) => {
    //     console.log(key);
    //     setIsActive(key)
    //     switch (key)
    //         case "1":
    //
    // }
    const items = [
        {
            key: "1",
            label: "Phổ biến",
            children: <></>
        },
        {
            key: "2",
            label: "Đánh giá",
            children: <></>
        },
        {
            key: "3",
            label: "Giá thấp đến cao",
            children: <></>
        },
        {
            key: "4",
            label: "Giá cao đến thấp",
            children: <></>
        }
    ]
    const initBooks = async () => {
        const res = await callBooksSortByRating();
        if (res) {
            dispatch(getBooksAction(res));
            console.log(">>>dispatch success: ", res);
        }
    }
    useEffect(() => {
        initBooks();
    }, [])
    const bookList = useSelector(state => state.books.bookList);
    console.log(">>>here is bookList: ", bookList);
    return (
        <div className="homepage-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
            <Row gutter={[20, 20]}>
                <Col className="sidebar" md={4} sm={0} xs={0} style={{ border: "1px solid black", backgroundColor: "white" }}>
                    <div>
                        <p>Bộ lọc tìm kiếm</p>
                    </div>
                    <Form
                        onFinish={onFinish}
                        form={form}
                        onValuesChange={(changeValues, values) => handleChangeFilter(changeValues, values)}
                    >
                        <Form.Item name="category" label="Thể loại" labelCol={{ span: 24 }}>
                            <Checkbox.Group>
                                <Row>
                                    <Col span={24}>
                                        <Checkbox value="Kinh dị">
                                            Kinh dị
                                        </Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="Khoa học">
                                            Khoa học
                                        </Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="Lãng mạn">
                                            Lãng mạn
                                        </Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="Sức khỏe">
                                            Sức khỏe
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                        <Divider />
                        <Form.Item
                            name="price-range"
                            label="Khoảng giá"
                            labelCol={{ span: 24 }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 0 }}>
                                <Form.Item name={["range", "form"]}>
                                    <InputNumber
                                        name="from"
                                        min={0}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    />


                                </Form.Item>
                                <span>-</span>
                                <Form.Item name={["range", "to"]}>
                                    <InputNumber
                                        name="to"
                                        min={0}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    />


                                </Form.Item>
                            </div>
                            <div>
                                <button onClick={() => form.submit()} style={{ width: "100%", backgroundColor: "white", border: "1px solid #0B74E5", color: "#0B74E5", borderRadius: "4px", padding: "7px 0" }} type="primary">
                                    Áp dụng
                                </button>
                                {/* <Button 
                                    onClick={() => form.submit()}
                                    style={{ width: "100%" }} 
                                    type='primary'
                                >
                                    Áp dụng
                                </Button> */}
                            </div>
                        </Form.Item>
                        <Divider />
                        <Form.Item
                            name="rating"
                            label="Đánh giá"
                            labelCol={{ span: 24 }}
                        >
                            <div style={{ cursor: "pointer" }}>
                                <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">từ 5 sao</span>
                            </div>
                            <div style={{ cursor: "pointer" }}>
                                <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">từ 4 sao</span>
                            </div>
                            <div style={{ cursor: "pointer" }}>
                                <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">từ 3 sao</span>
                            </div>
                        </Form.Item>
                    </Form>
                </Col>
                <Col className="content" md={20} sm={24} xs={24} style={{ border: "1px solid red" }}>
                    <Row className="category-bar" style={{ border: "1px solid green", backgroundColor: "white" }}>
                        <div>
                            <h3 style={{ margin: "5px" }}>UETHUVIENSACH</h3>
                            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                        </div>
                    </Row>
                    <Row className="books" style={{ border: "1px solid orange", marginTop: "8px" }}>
                        <Col>
                            {
                                bookList.map(book => (
                                    <>
                                        <span style={{ display: "inline" }}>
                                            <div className="thumbnail">
                                                <img src={book.front_page_url} alt="" />
                                            </div>
                                            <div className="book-title">
                                                {book.title}
                                            </div>
                                            <div className="book-price">
                                                {/* {
                                                // new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)
                                                // bookList[0].price
                                                // haha
                                            } */}
                                                haha
                                            </div>
                                        </span>

                                    </>

                                ))
                            }

                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Home;


