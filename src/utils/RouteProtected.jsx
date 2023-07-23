import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AuthProtected = () => {
  const datas = JSON.parse(sessionStorage.getItem("auth")) || "";

  return import.meta.env.VITE_REACT_APP_TOKEN !== datas.token ? <Outlet /> : <Navigate to="/" />;
};

export const OrderProtected = () => {
  const datas = JSON.parse(sessionStorage.getItem("auth")) || "";

  return import.meta.env.VITE_REACT_APP_TOKEN === datas.token ? <Outlet /> : <Navigate to="/" />;
};

export const AdminProtected = () => {
  const datas = JSON.parse(sessionStorage.getItem("auth")) || "";

  return import.meta.env.VITE_REACT_APP_TOKEN === datas.token && datas.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export const RoleProtected = () => {
  const datas = JSON.parse(sessionStorage.getItem("auth")) || "";

  if (datas == "") return <Outlet />;
  return import.meta.env.VITE_REACT_APP_TOKEN === datas.token && datas.role === "customer" ? <Outlet /> : <Navigate to="/admin" />;
};
