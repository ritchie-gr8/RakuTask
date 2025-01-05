"use client";

import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirect = (redirect: string) => {
  const { getUserLoginStatus } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      try {
        const isLoggedIn = await getUserLoginStatus();

        if (!isLoggedIn) router.push(redirect);
      } catch (error) {
        console.log("Error redirecting user:", error);
      }
    };

    redirectUser();
  }, [redirect, getUserLoginStatus, router]);
};

export default useRedirect;
