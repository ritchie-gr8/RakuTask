"use client";
import React from "react";
import { UserContextProvider } from "../context/userContext.js";
import { TasksProvider } from "../context/taskContext.js";
interface props {
  children: React.ReactNode;
}

function UserProvider({ children }: props) {
  return (
    <UserContextProvider>
      <TasksProvider>{children}</TasksProvider>
    </UserContextProvider>
  );
}

export default UserProvider;
