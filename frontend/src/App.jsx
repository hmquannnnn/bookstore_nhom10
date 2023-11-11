// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

// import React, { useState } from 'react';
import { useEffect, useState } from "react";
import Routes from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { callFetchAccount } from "./services/api";
import { doGetAccountAction } from "./redux/counter/accountSlice";

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
    useEffect(() => {
      getAccount();
    }, [])
  
  
  
  return (

    <Routes/>
  )
}


