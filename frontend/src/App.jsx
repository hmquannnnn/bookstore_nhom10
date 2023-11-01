// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

// import React, { useState } from 'react';
import { useState } from "react";
import Routes from "./routes/routes";

export default function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const handleLogIn = () => {
    setIsLoggedIn(true);
  }
  const handleLogout = () => {
    setIsLoggedIn(false)
  }
  return (
    <Routes isLoggedIn={isLoggedIn} setIsLoggedIn={handleLogIn}  />
  )
}
