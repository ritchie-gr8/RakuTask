"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "@/context/userContext";
import Link from "next/link";

const LoginForm = () => {
  const { loginUser, userState, handleUserInput, resetUserState } =
    useUserContext();
  const { email, password } = userState;
  const [showPassword, setShowPassword] = useState(false);
  const togglerPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    resetUserState();
  }, []);

  return (
    <form
      className="m-[2rem] px-10 py-14
        rounded-lg bg-white w-full max-w-[520px]"
    >
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-[1.35rem] font-medium">
          {" "}
          Login to your account
        </h1>
        <p className="mb-8 px-[2rem] text-center text-[#999} text-[14px]">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-[#2ecc71] hover:text-[#7263f3]"
          >
            Register here
          </Link>
        </p>
        <div className="mt-[1rem] flex flex-col">
          <label htmlFor="email" className="mb-1 text-[#999]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => handleUserInput("email")(e)}
            className="px-4 py-3 border-[2px]
            rounded-md outline-[#2ecc71] text-gray-800"
            placeholder="johnwick@mail.com"
          />
        </div>
        <div className="relative mt-[1rem] flex flex-col">
          <label htmlFor="password" className="mb-1 text-[#999]">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => handleUserInput("password")(e)}
            className="px-4 py-3 border-[2px]
            rounded-md outline-[#2ecc71] text-gray-800"
          />
          <button
            type="button"
            className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="size-6"
              onClick={togglerPassword}
            />
          </button>
        </div>
        <div className="mt-4 flex justify-end">
          <Link
            href="/forgot-password"
            className="font-bold text-[#2ecc71] text-[14px] hover:text-[#7263f3]"
          >
            Forgot password?
          </Link>
        </div>
        <div className="flex">
          <button
            type="button"
            disabled={!email || !password}
            className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] 
            text-white rounded-md hover:bg-[#1abc9c] transition-colors"
            onClick={loginUser}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
