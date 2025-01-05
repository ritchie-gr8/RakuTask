"use client";
import React from "react";
import { UserContextProvider } from "../context/userContext.js";
interface props {
  children: React.ReactNode;
}

function UserProvider({ children }: props) {
  return <UserContextProvider>{children}</UserContextProvider>;
}

export default UserProvider;
