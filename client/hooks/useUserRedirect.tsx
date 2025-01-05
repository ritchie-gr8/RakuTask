"use client";

import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirect = (redirect: string) => {
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.email) {
      router.push(redirect);
    }
  }, [user, redirect, router]);
};

export default useRedirect;
