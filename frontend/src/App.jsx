// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

// import React, { useState } from 'react';
import { useEffect, useState } from "react";
import Routes from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";

import { doGetAccountAction } from "./redux/slice/accountSlice";
import { callFetchAccount } from "./services/api/userAPI";
import { callGetCart } from "./services/api/cartAPI.jsx";
import { getCartAction } from "./redux/slice/cartSlice.jsx";

export default function App() {
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);
  const dispatch = useDispatch();
  const getAccount = async () => {
    const res = await callFetchAccount();
    // console.log(">>> check fetchAccount: ", res)
    if (res) {
      dispatch(doGetAccountAction(res));
    }
  }
  const user = useSelector(state => state.account.user);
  const getCartInfo = async () => {
    const res = await callGetCart();
    // console.log(">>>check cart:", res, res.length);
    if (res) {
      dispatch(getCartAction(res));
      // console.log("success");
    }
  }
  useEffect(() => {
    getAccount();
    getCartInfo();
  }, [])
  // useEffect(() => {
  //   getAccount();
  //   getCartInfo();
  // }, [user])
  return (
    <Routes />
  )
}


