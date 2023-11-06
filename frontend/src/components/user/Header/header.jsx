// import { AiOutlineShoppingCart } from "react-icons/ai";
import "./header.scss"
// import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Badge, Button, Dropdown, Modal } from "antd"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountDropDown from "./AccountDropDown/AccountDropDown";
import { Link, useNavigate } from "react-router-dom";
import { callFetchAccount } from "../../../services/api";
import { doGetAccountAction, doLogOutAction } from "../../../redux/counter/accountSlice";



const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
    useEffect(() => {
        setIsLoggedIn(isAuthenticated);
        console.log("check: ", isAuthenticated, isLoggedIn);
    }, [isAuthenticated])
    const handleLogIn = () => {
        setIsLoggedIn(true);
    }
    const dispatch = useDispatch();

    const handleLogOut = () => {
        console.log("logout");
        localStorage.clear();
        dispatch(doLogOutAction());
        setIsLoggedIn(false);
        setItems(defaultItems);
        
    }
    const defaultItems = [
        {
            key: '1',

            label: (
                <Link to="/dang-nhap">
                    Đăng nhập
                </Link>
            )

        },
        {
            key: '2',
            label: (
                <Link to="/dang-ky">
                    Đăng ký
                </Link>
            )

        },
    ]
    const loggedInItems = [
        {
            key: "3",
            label: (
                <Link to="/thong-tin-tai-khoan">
                    Thông tin cá nhân
                </Link>
            )
        },
        {
            key: "4",
            label: (
                <Link to="/" onClick={handleLogOut}>
                    Đăng xuất
                </Link>
            )
        }
    ]
    console.log("isauth: ", isAuthenticated);
    console.log("login status: ", isLoggedIn);
    const [ openAlert, setOpenAlert ] = useState(false);
    const handleCartClick = () => {
        if(!isLoggedIn) {
            setOpenAlert(true);
        } else {
            navigate("/gio-hang");
        }
    }


    const [items, setItems] = useState(isLoggedIn ? loggedInItems : defaultItems);
    // console.log(">>>log in status", isLoggedIn);
    // console.log(">>>dropdown: ", items);

    return (
        <>
            <div className="header-container">
                <div className="page-header">
                    <div className="page-header__top">


                        <div className="page-header__logo">
                            <span className="logo">
                                <a href="/" >
                                    <p className="brand-name">UETHUVIENSACH</p>
                                </a>

                            </span>
                            <input
                                className="input-seacrh"
                                type="text"
                                placeholder="Bạn đọc gì hôm nay"
                            />

                        </div>
                    </div>
                    <nav className="page-header__bottom">
                        <div className="navigation">
                            <a href="/gio-hang" style={{ marginRight: "35px", marginLeft: "10px" }} onClick={handleCartClick}>
                                <Badge
                                    count={100}
                                    overflowCount={99}
                                    size={"small"}>
                                    <AiOutlineShoppingCart className="cart-icon" href="/gio-hang" />
                                </Badge>
                            </a>
                            {/* <Modal
                                title="Bạn cần đăng nhập để truy cập giỏ hàng"
                                open={openAlert}
                                onOk={handelOk, onClick=(navigate("/dang-nhap"))}
                                onCancel={handleCloseAlert}
                                okText={"Đăng nhập"}
                                cancelText={"Tiếp tục sử dụng không cần đăng nhập"}
                            >

                            </Modal>  */}
                            {/* <AccountDropDown style={{marginLeft: "35px"}}/>  */}
                            <Dropdown
                                menu={{ items }}
                                placement="bottom"
                            >
                                <Button>Quản lí tài khoản</Button>
                            </Dropdown>
                        </div>
                    </nav>

                </div>
            </div>
        </>
    )
}

export default Header;