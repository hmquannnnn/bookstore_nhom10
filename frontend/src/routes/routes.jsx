import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Login from "../pages/login/login";
import Footer from "../components/user/Footer/footer";
import Header from "../components/user/Header/header";
import Register from "../pages/register/register";
import NotFound from "../pages/notFound/notFound";
import AboutUs from "../pages/aboutUs/aboutUs";
import Admin from "../pages/admin/admin";
import BooksManagement from "../pages/admin/managedPages/booksManagement/booksManagement";
import UsersManagement from "../pages/admin/managedPages/usersManagement/userManagement";
import OrdersManagemennt from "../pages/admin/managedPages/ordersManagement/ordersManagement";
import AdminHeader from "../components/admin/AdminHeader";
import Home from "../pages/Home/homePage";
import ProtectedRoute from "../components/ProtectedRoute";
import LayoutAdmin from "../pages/admin/LayoutAdmin";
import UserProfile from "../pages/UserProfile/UserProfile";
import { useSelector } from "react-redux";
import ChangePhone from "../pages/EditUser/ChangePhone/ChangePhone";
import ChangePassword from "../pages/EditUser/ChangePassword/ChangePassword";
import path from "./path";
import BookDetails from "../pages/BookDetails/BookDetails";
import Cart from "../pages/cart/DefaultCart/Cart.jsx";
import Purchase from "../pages/purchased/Purchase.jsx";
import SearchBook from "../pages/searchBook/searchBook.jsx";

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
    const role = useSelector(state => state.account.user.role)
    return (
        <div className="layout-admin">
            {role === "admin" && <AdminHeader />}
            <Outlet />
        </div>
    )
}

const Routes = () => {
    const router = createBrowserRouter([
        {
            path: path.home,
            element: <Layout />,
            errorElement: <NotFound />,

            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: path.aboutUs,
                    element: <AboutUs />
                },
                {
                    path: path.cart,
                    element: <Cart />
                },
                {
                    path: path.userProfile,
                    element: <UserProfile />
                },
                {
                    path: path.changePhone,
                    element: <ChangePhone />
                },
                {
                    path: path.changePassword,
                    element: <ChangePassword />
                },
                {
                    path: path.bookDetails,
                    element: <BookDetails />
                },
                {
                    path: path.purchase,
                    element: <Purchase />
                },
                {
                    path: path.search,
                    element: <SearchBook />
                }
            ],
        },
        {
            path: path.logIn,
            element: <Login />,
        },
        {
            path: path.register,
            element: <Register />,
        },
        {
            path: path.admin,
            element: <AdminLayout />,
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element:
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute>
                },
                {
                    path: path.booksManagement,
                    element: <BooksManagement />
                },
                {
                    path: path.usersManagement,
                    element: <UsersManagement />
                },
                {
                    path: path.ordersManagemennt,
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