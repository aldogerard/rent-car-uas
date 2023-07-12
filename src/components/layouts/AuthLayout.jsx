import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children, title }) => {
  const Navigation = () => {
    return (
      <p className="text-sm mt-5 text-center">
        {title === "login" ? "Don't have an account? " : "Already have an account? "}
        <Link to={`/${title === "login" ? "register" : "login"}`} className="text-primary">
          {title === "login" ? "Register" : "Login"}
        </Link>
      </p>
    );
  };

  return (
    <>
      <div className="container flex mx-auto mt-10 justify-center h-[60vh] ">
        <div className="w-full max-w-sm ">
          <h1 className="text-3xl text-primary font-bold mb-2 capitalize">{title}</h1>
          <p className="font-medium text-gray-500 mb-8">Welcome, Please enter your details</p>
          {children}
          <Navigation />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
