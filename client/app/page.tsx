"use client";

import { useUserContext } from "@/context/userContext";

export default function Home() {
  const { logoutUser } = useUserContext();
  const name = "Great";
  return (
    <main className="py-[2rem] mx-[10rem]">
      <header className="flex items-center justify-center">
        <h1 className="text-[2rem]">
          Hello <span className="text-red-600">{name}</span>, Welcome to task
          manager
        </h1>
        <div className="flex items-center gap-4">
          <img src="" alt="" />
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </header>
    </main>
  );
}
