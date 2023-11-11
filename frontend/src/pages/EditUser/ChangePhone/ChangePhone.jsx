import { Button, Form, Input } from "antd";
import { callChangePhone } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import path from "../../../routes/path";

const ChangePhone = () => {
    const navigate = useNavigate();
    const onFinish = async({phone}) => {
        const res = await callChangePhone(phone);
        if(res.message === "update success") {
            console.log(">>>call success: ", phone);
            navigate(path.userProfile);
        }
    }
    return (
        <>
            <div className="container">
                <div className="main">
                    <h3>Đổi số điện thoại</h3>
                    <Form
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="phone"
                            label="Số điện thoại mới"
                            labelCol={{ span: 24 }}
                            rules={
                                [
                                    {
                                        required: true,
                                        pattern: new RegExp(/^[0-9]+$/),
                                        message: "Vui lòng điền số điện thoại hợp lệ"
                                    }
                                ]
                            }
                        >
                            <Input />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" style={{width: "100%"}}>Xác nhận</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default ChangePhone;