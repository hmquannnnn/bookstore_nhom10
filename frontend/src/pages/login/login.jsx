// import { useState } from "react";

import { Button, Divider, Form, Input, message, notification } from "antd";
import FormItem from "antd/es/form/FormItem";
// import { useState } from "react";
// import { fetchUser } from "../../../utils/api"; 
import { useNavigate } from "react-router-dom";
import { callLogin } from "../../services/api";
import "./login.scss"



const Login = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const { email, password } = values;
        const res = await callLogin(email, password);
        console.log(res);
        if (res) {
            // localStorage.setItem('access_token', res.data.access_token)
            console.log(res);
            message.success('Đăng nhập thành công!');
            navigate('/')
        } else {
            notification.error({
                message: "Sai email hoặc mật khẩu",
            })
        }
    }

    return (
        <>
            <div className="login-page">
                <main className="main">
                    <div className="container">
                        <section className="wrapper">
                            <div className="heading">
                                <h2 className="text text-large">Đăng nhập</h2>
                            </div>
                            <Form
                                name="basic"
                                onFinish={onFinish}
                                autoComplete="off"
                            >

                                <FormItem
                                    labelCol={{ span: 24 }}
                                    label="Email"
                                    name="email"
                                    style={{padding: "0"}}
                                    rules={[
                                        {
                                            required: true,

                                            message: "Vui lòng điền email"
                                        },
                                        {
                                            type: "email",
                                            message: "Vui lòng điền email hợp lệ"
                                        }
                                    ]}
                                >
                                    <Input />
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
                                            max: 24,
                                            message: "Mật khẩu dài 6-24 kí tự"
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </FormItem>
                                <Button className="submit-btn" type="primary" htmlType="submit" style={{width: "100%"}}>Đăng nhập</Button>
                                <Divider />
                                <p className="text text-normal" style={{textAlign: "center"}}>Chưa có tài khoản?&#160;
                                    <span>
                                        <a href="/dang-ky">Đăng ký</a>
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

export default Login;