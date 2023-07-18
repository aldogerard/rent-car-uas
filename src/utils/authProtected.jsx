import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AuthProtected = () => {
  const [datas, setDatas] = React.useState(JSON.parse(sessionStorage.getItem("auth")) || "");

  return datas == "" ? <Outlet /> : <Navigate to="/" />;
};
