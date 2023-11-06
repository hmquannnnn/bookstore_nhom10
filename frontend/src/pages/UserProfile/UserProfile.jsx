import { Avatar, Col, Divider, Form, Input, Row } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";

const UserProfile = () => {
    const user = useSelector(state => state.account.user)
    const onFinish = () => {

    }
    return (
        <>
            <div className="profile-page" style={{margin: "auto", width: "1440px", height: "500px"}}>
                <h3 style={{ fontFamily: "Arial, Helvetica, sans-serif"}}>Thông tin tài khoản</h3>
                <div className="main" style={{ backgroundColor: "white" }}>
                    <Row>
                        <Col className="info" md={15} style={{ border: "1px solid black", height: "500px" }}>
                            <h4 style={{fontSize: "20px", color: "grey", fontWeight: "400", margin: "5px 0 0 0"}}>Thông tin cá nhân</h4>
                            <Divider/>
                            <Row>
                                <Col span={5} style={{border: "1px solid pink"}}>
                                    <Avatar size={128} icon={<AiOutlineUser />} style={{ margin: "25px" }} />
                                </Col>
                                <Col span={19} style={{border: "1px solid blue"}}>
                                    <Form
                                        name="form"
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name="name"
                                            label="Tên tài khoản"
                                            labelCol={{ span: 24 }}
                                        >
                                            <Input placeholder={user.name} style={{borderRadius: "2px"}}/>
                                        </Form.Item>
                                        <Form.Item
                                            name="email"
                                            label="Email"
                                            labelCol={{span: 24}}
                                        >
                                            <Input placeholder={user.email} style={{ borderRadius: "2px" }} />
                                        </Form.Item>
                                        <Form.Item
                                            name="phone"
                                            label="Số điện thoại"
                                            labelCol={{ span: 24 }}
                                        >
                                            <Input placeholder={user.phone} style={{ borderRadius: "2px" }} />
                                        </Form.Item>
                                        <Form.Item
                                            name="address"
                                            label="Địa chỉ"
                                            labelCol={{ span: 24 }}
                                        >
                                            <Input placeholder={user.address} style={{ borderRadius: "2px" }} />
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                            
                        </Col>
                        <Col className="abc" md={9} style={{ border: "1px solid red", height: "500px" }}>

                        </Col>
                    </Row>
                </div>
                
            </div>
        </>
    )
}

export default UserProfile;