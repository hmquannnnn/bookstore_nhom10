<<<<<<< HEAD


const Header = () => {
    return (
        <>
            header
=======
// import { AiOutlineShoppingCart } from "react-icons/ai";
import "./header.scss"
// import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Badge, Button, Dropdown } from "antd"

const items = [
    {
        key: '1',
        label: (
            <a href="/dang-nhap">
                Đăng nhập
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a href="/dang-ky">
                Đăng ký
            </a>
        ),
    },
];

const Header = () => {
    // const [openDrawer, setOpenDrawer] = useState(false); 
    
    return (
        <>
            <div className="header-container">
                <div className="page-header">
                    <div className="page-header__top">
                        

                        <div className="page-header__logo">
                            <span className="logo">
                                <p className="brand-name">UETHUVIENSACH</p>
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
                            <a href="/gio-hang">
                                <Badge
                                    count={100}
                                    overflowCount={99}
                                    size={"small"}>
                                    <AiOutlineShoppingCart className="cart-icon" href="/gio-hang" />
                                </Badge>
                            </a>
                            <Dropdown
                                className="dropdown"
                                menu={{
                                    items,
                                }}
                                placement="bottomRight"
                            >
                                <Button>Quản lý tài khoản</Button>
                            </Dropdown>
                        </div>
                    </nav>
                    
                </div>
            </div>
>>>>>>> master
        </>
    )
}

export default Header;