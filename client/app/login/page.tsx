"use client";
import React, { useEffect } from "react";
import LoginForm from "../_components/auth/LoginForm";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

const page = () => {
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (user && user._id) {
      router.push("/");
    }
  }, [user, router]);

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
