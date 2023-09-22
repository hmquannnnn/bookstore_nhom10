// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login/login';
import Contact from './pages/contact/contact';
import { Outlet } from "react-router-dom";
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Home from './components/Home/Home';



const Layout = () => {
  return (
    <div className='layout-app'>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
};

export default function App() {
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
      path: "/login",
      element: <Login />,
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
