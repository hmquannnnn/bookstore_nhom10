import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Login from "../pages/login/login";
import Footer from "../components/Footer/footer";
import Header from "../components/Header/header";
import Register from "../pages/register/register";
import NotFound from "../pages/notFound/notFound";
import AboutUs from "../pages/aboutUs/aboutUs";
import Cart from "../pages/cart/cart";
import Admin from "../pages/admin/admin";
import BooksManagement from "../pages/admin/managedPages/booksManagement/booksManagement";
import UsersManagement from "../pages/admin/managedPages/usersManagement/userManagement";
import OrdersManagemennt from "../pages/admin/managedPages/ordersManagement/ordersManagement";
import Home from "../pages/Home/Home";
import Test from "../pages/test/test";

const Layout = () => {
    return (
        <div className='layout-app'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
};

const Routes = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <NotFound />,

            children: [
                { index: true, element: <Home /> },
                {
                    path: "gioi-thieu",
                    element: <AboutUs />
                },
                {
                    path: "gio-hang",
                    element: <Cart />
                }
            ],
        },
        {
            path: "dang-nhap",
            element: <Login />,
        },
        {
            path: "dang-ky",
            element: <Register />,
        },
        {
            path: "admin",
            element: <Admin />,
            children: [
                {
                    path: "books-management",
                    element: <BooksManagement />
                },
                {
                    path: "users-management",
                    element: <UsersManagement />
                },
                {
                    path: "orders-management",
                    element: <OrdersManagemennt />
                }
            ]
        },
        {
            path: "test",
            element: <Test/>
        }
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default Routes;