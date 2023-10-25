import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Login from "../pages/login/login";
import Footer from "../components/user/Footer/footer";
import Header from "../components/user/Header/header";
import Register from "../pages/register/register";
import NotFound from "../pages/notFound/notFound";
import AboutUs from "../pages/aboutUs/aboutUs";
import Cart from "../pages/cart/cart";
import Admin from "../pages/admin/admin";
import BooksManagement from "../pages/admin/managedPages/booksManagement/booksManagement";
import UsersManagement from "../pages/admin/managedPages/usersManagement/userManagement";
import OrdersManagemennt from "../pages/admin/managedPages/ordersManagement/ordersManagement";
// import Test from "../pages/test/test";
import AdminHeader from "../components/admin/AdminHeader";
import Home from "../pages/Home/homePage";

const Layout = () => {
    return (
        <div className='layout-app'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
};

const AdminLayout = () => {
    return (
        <div className="layout-admin">
            <AdminHeader />
            <Outlet />
        </div>
    )
}

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
            element: <AdminLayout />,
            children: [
                {
                    path: "books",
                    element: <BooksManagement />
                },
                {
                    path: "users",
                    element: <UsersManagement />
                },
                {
                    path: "orders",
                    element: <OrdersManagemennt />
                }
            ]
        },
        // {
        //     path: "test",
        //     element: <Test />
        // }
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default Routes;