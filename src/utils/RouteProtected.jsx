import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AuthProtected = () => {
  const datas = JSON.parse(sessionStorage.getItem("auth")) || "";

  return import.meta.env.VITE_REACT_APP_TOKEN !== datas.token ? <Outlet /> : <Navigate to="/" />;
};

export const OrderProtected = () => {
  const datas = JSON.parse(sessionStorage.getItem("auth")) || "";

  return import.meta.env.VITE_REACT_APP_TOKEN === datas.token ? <Outlet /> : <Navigate to="/cars" />;
};
