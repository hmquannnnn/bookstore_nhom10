// import { useState } from "react";

import { Button, Checkbox, Divider, Form, Input, message, notification } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate()

    const onFinish = async () => {
        if(1) {
            message.success('Đăng ký thành công');
            navigate("/dang-nhap")
        } else {
            notification.error({
                message: "Đăng ký thất bại"
            })
        }
    }
    return (
        <>
            <div className="register-page">
                <main className="main">
                    <div className="container">
                        <section className="wrapper">
                            <div className="heading">
                                <h2 className="text text-large">Đăng ký</h2>

                            </div>
                            <Form
                                name="basic"
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <FormItem
                                    labelCol={{ span: 24 }}
                                    label="Tên tài khoản"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng điền tên tài khoản"
                                        },
                                        {
                                            min: 6,
                                            max: 24,
                                            message: "Tên tài khoản dài 6-24 kí tự"
                                        }

                                    ]}
                                >
                                    <Input />
                                </FormItem>
                                <FormItem
                                    labelCol={{span: 24}}
                                    label="Email"
                                    name="email"
                                    
                                    rules={[
                                        {
                                            required: true,
                                            
                                            message: "Vui lòng điền email"
                                        },
                                        {
                                            type:"email",
                                            message: "Vui lòng điền email hợp lệ"
                                        }
                                    ]}
                                >                   
                                    <Input/>
                                </FormItem>
                                <FormItem
                                    labelCol={{ span: 24 }}
                                    label="Số điện thoại"
                                    name="phone-number"

                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng điền số điện thoại"
                                        },
                                        {
                                            pattern: new RegExp(/^[0-9]+$/),
                                            message: "Vui lòng điền số điện thoại hợp lệ"
                                        }
                                    ]}
                                >
                                    <Input/>
                                </FormItem>
                                <FormItem
                                    labelCol={{ span: 24 }}
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng điền mật khẩu"
                                        },
                                        {
                                            min: 6,
                                            message: "Mật khẩu gồm ít nhất 6 kí tự"
                                        },
                                        {
                                            max: 24,
                                            message: "Mật khẩu gồm tối đa 24 kí tự"
                                        }
                                    ]}
                                >
                                    <Input.Password />
                                </FormItem>
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    name="confirm"
                                    label="Xác nhận mật khẩu"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng xác nhận mật khẩu',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Mật khẩu không trùng khớp'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Checkbox>Tôi đã đọc và đồng ý với&#160;
                                    <a href="/chinh-sach-su-dung">chính sách sử dụng</a>
                                    &#160;và&#160;
                                    <a href="/chinh-sach-bao-mat">chính sách bảo mật</a>
                                </Checkbox>
                                <Button className="submit-btn" type="primary" htmlType="submit">Đăng ký</Button>
                                <Divider />
                                <p className="text text-normal">Đã có tài khoản?&#160;
                                    <span>
                                        <a href="/dang-nhap">Đăng nhập</a>
                                    </span>
                                </p>
                            </Form>
                        </section>
                    </div>
                </main>
            </div>
        </>
    )

    // const [email, setEMail] = useState("");
    // const [password, setPassword] = useState("")
    // return (
    //     <>
    //         <input value={email} onChange={(e) => setEMail(e.target.value)} />
    //         <input value={password} onChange={(e) => setPassword(e.target.value)} />
    //     </>

    // )
}

export default Register;