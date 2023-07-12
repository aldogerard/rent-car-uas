import React from "react";

import Login from "../components/Fragments/FormLogin";
import AuthLayout from "../components/layouts/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout title="login">
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
