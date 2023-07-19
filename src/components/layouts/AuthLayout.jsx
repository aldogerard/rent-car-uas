import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children, title }) => {
  const Navigation = () => {
    return (
      <p className="text-sm mt-5 text-center md:pb-0">
        {title === "login" ? "Don't have an account? " : "Already have an account? "}
        <Link to={`/${title === "login" ? "register" : "login"}`} className="text-primary">
          {title === "login" ? "Register" : "Login"}
        </Link>
      </p>
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container flex mx-auto justify-center px-4 md:px-0 pb-8 pt-[50px] md:pt-[150px] lg:pt-[130px]">
        <div className="w-full max-w-md md:max-w-2xl pt-10 md:pt-5">
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
