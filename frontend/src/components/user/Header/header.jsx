// import { AiOutlineShoppingCart } from "react-icons/ai";
import "./header.scss"
// import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Badge, Button, Dropdown } from "antd"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountDropDown from "./AccountDropDown/AccountDropDown";
import { Link } from "react-router-dom";



const Header = () => {
    const items = [
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
                            <a href="/gio-hang" style={{marginRight: "35px", marginLeft: "10px"}}>
                                <Badge
                                    count={100}
                                    overflowCount={99}
                                    size={"small"}>
                                    <AiOutlineShoppingCart className="cart-icon" href="/gio-hang" />
                                </Badge>
                            </a>
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