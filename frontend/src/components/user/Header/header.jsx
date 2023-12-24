import "./header.scss"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Badge, Button, Dropdown, Modal } from "antd"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountDropDown from "./AccountDropDown/AccountDropDown";
import { Link, useNavigate } from "react-router-dom";
import { callFetchAccount } from "../../../services/api/userAPI";
import { doGetAccountAction, doLogOutAction } from "../../../redux/reducer/accountSlice";
import path from "../../../routes/path.jsx";
import { deleteCart } from "../../../redux/reducer/cartSlice.jsx";



const Header = () => {
    const dispatch = useDispatch();
    const total = useSelector(state => state.cart.total);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const [booksInCart, setBooksInCart] = useState(total);
    const handleLogOut = () => {
        console.log("logout");
        localStorage.clear();
        dispatch(doLogOutAction());
        dispatch(deleteCart());

    }

    const defaultItems = [
        {
            key: '1',

            label: (
                <Link to={path.logIn}>
                    Đăng nhập
                </Link>
            )

        },
        {
            key: '2',
            label: (
                <Link to={path.register}>
                    Đăng ký
                </Link>
            )

        },
    ]
    const loggedInItems = [
        {
            key: "3",
            label: (
                <Link to={path.userProfile}>
                    Thông tin cá nhân
                </Link>
            )
        },
        {
            key: "4",
            label: (
                <Link to={path.home} onClick={handleLogOut}>
                    Đăng xuất
                </Link>
            )
        }
    ]
    const navigate = useNavigate();
    const [items, setItems] = useState(defaultItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        isAuthenticated ? setItems(loggedInItems) : setItems(defaultItems)
    }, [isAuthenticated])
    useEffect(() => {
        setBooksInCart(total)
    }, [total]);
    const showModal = () => {
        if (isAuthenticated) {
            navigate(path.cart)
        } else {
            setIsModalOpen(true);
        }
    };
    const handleOk = () => {
        setIsModalOpen(false);
        navigate(path.logIn)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="header-container" style={{ marginBottom: "15px" }}>
                <div className="page-header">
                    <div className="page-header__top">
                        <div className="page-header__logo">
                            <span className="logo">
                                <a href="/" >
                                    <p className="brand-name">UETHUVIENSACH</p>
                                </a>
                            </span>
                            <input
                                className="input-search"
                                type="search"
                                placeholder="Bạn đọc gì hôm nay"
                            />
                        </div>
                    </div>
                    <nav className="page-header__bottom">
                        <div className="navigation">
                            <a style={{ marginRight: "35px", marginLeft: "10px" }} onClick={showModal}>
                                <Badge
                                    count={booksInCart}
                                    overflowCount={10}
                                    size={"small"}
                                    showZero="true"
                                    style={{ cursor: "pointer" }}
                                >
                                    <AiOutlineShoppingCart className="cart-icon" />
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