"use client";
import { useUserContext } from "@/context/userContext";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface Props {
  params: {
    resetToken: string;
  };
}

function page({ params: { resetToken } }: Props) {
  const { resetPassword } = useUserContext();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: any) => {
    setNewPassword(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    resetPassword(resetToken, password);
    setIsLoading(false);
  };

  return (
    <main className="auth-page w-full h-full flex justify-center items-center">
      <form className="m-[2rem] px-10 py-14 rounded-lg bg-white max-w-[520px] w-full">
        <div className="relative z-10">
          <h1 className="mb-2 text-center text-[1.35rem] font-medium">
            Reset your password
          </h1>
          <div className="relative mt-[1rem] flex flex-col">
            <label htmlFor="email" className="mb-1 text-[#999]">
              Current Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              id="password"
              name="password"
              className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            />
            <button
              type="button"
              className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="size-6"
                onClick={togglePassword}
              />
            </button>
          </div>
          <div className="relative mt-[1rem] flex flex-col">
            <label htmlFor="email" className="mb-1 text-[#999]">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={handleNewPasswordChange}
              id="password"
              name="password"
              className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            />
            <button
              type="button"
              className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="size-6"
                onClick={togglePassword}
              />
            </button>
          </div>
          <div className="flex">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default page;
