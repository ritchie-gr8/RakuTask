import React from "react";
import LoginForm from "../_components/auth/LoginForm";

const page = () => {
  return (
    <div
      className="auth-page w-full h-full
        flex justify-center items-center"
    >
      <LoginForm />
    </div>
  );
};

export default page;
