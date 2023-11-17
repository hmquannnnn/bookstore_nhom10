import { Button, Form, Input } from "antd";
import { callChangePassword } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import path from "../../../routes/path";

const ChangePassword = () => {
    const navigate = useNavigate();
    const onFinish = async (values ) => {
        const { oldPassword, newPassword } = values;
        console.log(">>>input: ", values.old, "  ", values.new);
        const res = await callChangePassword(values.old, values.new);
        console.log(res);
        if (res.message === "update success") {
            console.log(">>>call success: ");
            navigate(path.logIn);
        }
    }
    return (
        <>
            <div className="container">
                <div className="main">
                    <h3>Đổi mật khẩu</h3>
                    <Form
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="old"
                            label="Mật khẩu cũ"
                            labelCol={{ span: 24 }}
                            rules={
                                [
                                    {
                                        required: true,
                                        message: "Vui lòng điền số điện thoại hợp lệ"
                                    }
                                ]
                            }
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="new"
                            label="Mật khẩu mới"
                            labelCol={{ span: 24 }}
                            rules={
                                [
                                    {
                                        required: true,
                                        
                                        message: "Vui lòng điền số điện thoại hợp lệ"
                                    }
                                ]
                            }
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Nhập lại mật khẩu mới"
                            labelCol={{ span: 24 }}
                            rules={
                                [
                                    {
                                        required: true,

                                        message: "Vui lòng điền số điện thoại hợp lệ"
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('new') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu không trùng khớp'));
                                        },
                                    }),
                                ]
                            }
                        >
                            <Input.Password />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>Xác nhận</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default ChangePassword;