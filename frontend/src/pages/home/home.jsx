import './home.scss';
import { Row, Col, Form, Checkbox, Divider, InputNumber } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { AiOutlineFilter } from 'react-icons/ai'

const Home = () => {
    return (
        <>
            <div className='homepage-container' >
                <main className='main' style={{ maxWidth: 1440, margin: '0 auto' }}>
                    <div className='sidebar'>
                        <Row gutter={[20, 20]}>
                            <Col
                                lg={4}
                                md={4}
                                sm={0}
                                xs={0}
                                style={{ border: "1px solid black" }}
                            >
                                <div>
                                    <span>
                                        <AiOutlineFilter /> Bộ lọc tìm kiếm
                                    </span>
                                </div>
                                <div className='genre'>
                                    <h4>Thể loại</h4>
                                    <Form>
                                        <FormItem
                                            name="category"
                                            labelCol={{ span: 24 }}
                                        >
                                            <Row>
                                                <Col span={24}>
                                                    <Checkbox>Tình cảm</Checkbox>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <Checkbox>Hành động</Checkbox>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <Checkbox>Hài hước</Checkbox>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <Checkbox>Phiêu lưu</Checkbox>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <Checkbox>Khác</Checkbox>
                                                </Col>
                                            </Row>

                                        </FormItem>
                                    </Form>
                                </div>
                                <Divider />
                                <div className='price'>
                                    <h4>Giá</h4>
                                    <div className='fast-price-filter'>
                                        <div className='item'>
                                            <span>Dưới 80.000</span>
                                        </div>
                                        <div className='item'>
                                            <span>80.000-120.000</span>
                                        </div>
                                        <div className='item'>
                                            <span>120.000-280.000</span>
                                        </div>
                                        <div className='item'>
                                            <span>Trên 280.000</span>
                                        </div>
                                    </div>
                                    <Form>
                                        <FormItem
                                            label="Khoảng giá"
                                            labelCol={{ span: 24 }}
                                        >
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>

                                                <FormItem name={["range", "from"]}>
                                                    <InputNumber
                                                        name='from'
                                                        min={0}
                                                        defaultValue={0}
                                                    />
                                                </FormItem>
                                                <span>-</span>
                                                <FormItem name={["range", "to"]}>
                                                    <InputNumber
                                                        name='to'
                                                        min={0}
                                                        defaultValue={0}
                                                    />
                                                </FormItem>
                                            </div>
                                            <div>
                                                <button className='submit-btn' type='submit' style={{ backgroundColor: "white", border: "1px solid rgb(11, 116, 229)", color: "rgb(11, 116, 229)", width: "100%", padding: "5px", borderRadius: "4px", cursor: "pointer"}}>Áp dụng</button>
                                            </div>

                                        </FormItem>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Home;