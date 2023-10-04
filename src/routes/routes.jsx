import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "../components/Home/Home";
import Contact from "../pages/contact/contact";
import Login from "../pages/login/login";
import Footer from "../components/Footer/footer";
import Header from "../components/Header/header";
import Register from "../pages/register/register";

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
            errorElement: <div>Error 404 not found</div>,

            children: [
                { index: true, element: <Home /> },
                {
                    path: "contact",
                    element: <Contact />,
                },

            ],
        },

        {
            path: "/dang-nhap",
            element: <Login />,
        },

        {
            path: "/dang-ky",
            element: <Register />,
        }
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default Routes