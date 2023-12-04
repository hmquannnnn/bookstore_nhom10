// import { AiOutlineShoppingCart } from "react-icons/ai";
import "./header.scss"
// import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Badge, Button, Dropdown, Modal } from "antd"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountDropDown from "./AccountDropDown/AccountDropDown";
import { Link, useNavigate } from "react-router-dom";
import { callFetchAccount } from "../../../services/api/userAPI";
import { doGetAccountAction, doLogOutAction } from "../../../redux/reducer/accountSlice";



const Header = () => {
    const dispatch = useDispatch();
    const handleLogOut = () => {
        console.log("logout");
        localStorage.clear();
        dispatch(doLogOutAction());
        // setIsLoggedIn(false);
        // setItems(defaultItems);
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
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const [items, setItems] = useState(defaultItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        isAuthenticated ? setItems( loggedInItems ) : setItems( defaultItems )
    }, [isAuthenticated])
    const showModal = () => {
        if(isAuthenticated) {
            navigate("/gio-hang")
        } else {
            setIsModalOpen(true);
        }
        
    };
    const handleOk = () => {
        setIsModalOpen(false);
        navigate("dang-nhap")
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="header-container" style={{marginBottom: "15px"}}>
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
                            <a  style={{ marginRight: "35px", marginLeft: "10px" }} onClick={showModal}>
                                <Badge
                                    count={100}
                                    overflowCount={99}
                                    size={"small"}>
                                    <AiOutlineShoppingCart className="cart-icon"  />
                                </Badge>
                            </a>
                            <Modal title="Bạn chưa đăng nhập" 
                                open={isModalOpen} 
                                onOk={handleOk} 
                                okText="Đăng nhập"
                                onCancel={handleCancel}
                                cancelText="Hủy"
                            >
                                <p>Đăng nhập để truy cập giỏ hàng</p>
                                
                            </Modal>
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