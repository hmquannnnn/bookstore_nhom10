// import { useState } from "react";

import { Alert, Button, Divider, Form, Input, message, notification } from "antd";
import FormItem from "antd/es/form/FormItem";
// import { useState } from "react";
// import { fetchUser } from "../../../utils/api"; 
import { useNavigate } from "react-router-dom";
import { callLogin } from "../../services/api";



const Login = () => {
    // const [data, setData] = useState("");
    const navigate = useNavigate();

    const onFinish = async (values) => {
        /*const user = await fetchUser(value);
        console.log(user);*/
        // const { email, password } = values;
        // const res = await callLogin(email, password);

        if (1) {
            message.success('Đăng nhập thành công!');

            navigate('/')
                // <Alert
                //     message="Success Tips"
                //     description="Detailed description and advice about successful copywriting."
                //     type="success"
                //     showIcon
                // />
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
                                <Button className="submit-btn" type="primary" htmlType="submit">Đăng nhập</Button>
                                <Divider />
                                <p className="text text-normal">Chưa có tài khoản?&#160;
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