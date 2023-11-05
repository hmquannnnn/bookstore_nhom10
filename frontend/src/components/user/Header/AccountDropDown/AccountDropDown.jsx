import { Button, Dropdown } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AccountDropDown = () => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
    const handleLogIn = () => {
        setIsLoggedIn(true);
    }
    const handleLogOut = () => {
        setIsLoggedIn(false);
    }
    const defaultItems = [
        {
            key: '1',
            
            label:(
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
            label: "Thông tin cá nhân"
        },
        {
            key: "4",
            label: "Đăng xuất"
        }
    ]
    const [items, setItems] = useState(isAuthenticated ? loggedInItems : defaultItems);
    useEffect(() => {
        if (isAuthenticated) {
            setItems(loggedInItems);
        } else {
            setItems(defaultItems);
        }
    }, [isAuthenticated])
    return (
        <>
            <Dropdown
                menu={{ items }}
                placement="bottom"
            >
                <Button>Quản lí tài khoản</Button>
            </Dropdown>
        </>
    )
}

export default AccountDropDown;