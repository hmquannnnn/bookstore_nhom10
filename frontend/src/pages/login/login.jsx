// import { useState } from "react";

import { Button, Divider, Form, Input, message, notification } from "antd";
import FormItem from "antd/es/form/FormItem";
// import { useState } from "react";
// import { fetchUser } from "../../../utils/api"; 
import { useNavigate } from "react-router-dom";
import { callLogin } from "../../services/api/userAPI";
import { useDispatch } from "react-redux"
import "./login.scss"
import { doLoginAction } from "../../redux/reducer/accountSlice";
import { useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { callGetCart } from "../../services/api/cartAPI";
import { getCartAction } from "../../redux/reducer/cartSlice";



const Login = () => {
    // const [ isLoggedIn, setIsLoggedIn ] = useState();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const { email, password } = values;
        const res = await callLogin(email, password);
        // console.log(">>>res: ",res);
        //  console.log(res.access_token);
        if (res?.user?.email) {
            console.log(">>>res: ", res);

            dispatch(doLoginAction(res));
            localStorage.setItem("token", res.token);
            // const cartRes = await callGetCart();
            // if (cartRes) {
            //     dispatch(getCartAction(cartRes));
            const role = res.user.role;
            if (role === "admin") {
                navigate("/admin");
            } else {
                navigate('/')
            }
            message.success('Đăng nhập thành công!');



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
                                    className="input-box"
                                    labelCol={{ span: 24 }}
                                    label="Email"
                                    name="email"
                                    style={{ padding: "0" }}
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
                                    className="input-box"
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
                                <Button className="submit-btn" type="primary" htmlType="submit" style={{ width: "100%" }}>Đăng nhập</Button>
                                <Divider />
                                <p className="text text-normal" style={{ textAlign: "center" }}>Chưa có tài khoản?&#160;
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