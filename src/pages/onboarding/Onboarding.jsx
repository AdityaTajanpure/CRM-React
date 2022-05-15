import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import SignUp from "./components/SignUp";
import SetPassword from "./components/SetPassword";
import { useLocation } from "react-router-dom";

const Onboarding = () => {
  useEffect(() => {}, []);

  const location = useLocation();
  console.log(location.pathname);
  const getLocation = () => {
    switch (location.pathname) {
      case "/":
        return <Login />;
      case "/forgotPassword":
        return <ForgotPassword />;
      case "/signup":
        return <SignUp />;
      case "/updatePassword":
        return <SetPassword />;
      default:
        return <Login />;
    }
  };
  return getLocation();
};

export default Onboarding;
