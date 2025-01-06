"use client";

import React, { useEffect } from "react";
import RegisterForm from "../_components/auth/RegisterForm";
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

  if (user && user._id) {
    return null;
  }

  return (
    <div className="auth-page w-full h-full flex justify-center items-center">
      <RegisterForm />
    </div>
  );
};

export default page;
