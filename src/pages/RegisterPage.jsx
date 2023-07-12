import React from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import Register from "../components/Fragments/FormRegister";

const RegisterPage = () => {
  return (
    <>
      <AuthLayout title="register">
        <Register />
      </AuthLayout>
    </>
  );
};

export default RegisterPage;
