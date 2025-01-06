"use client";

import { useUserContext } from "@/context/userContext";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faUser } from "@fortawesome/free-solid-svg-icons";
import { useTasks } from "@/context/taskContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, logoutUser } = useUserContext();
  const { openModalForAdd, activeTasks } = useTasks();
  const { name, _id: userId } = user;
  const router = useRouter();

  return (
    <header className="px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9]">
      <div>
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>
          {userId ? `Welcome, ${name}!` : "Welcome to RakuTask"}
        </h1>
        <p className="text-sm">
          {userId ? (
            <>
              You have{" "}
              <span className="font-bold text-[#3aafae]">
                {activeTasks.length}
              </span>{" "}
              active tasks
            </>
          ) : (
            "Please login or register to get started"
          )}
        </p>
      </div>
      <div className="h-[50px] flex items-center gap-4">
        <button
          className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
          hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
          onClick={() => {
            if (userId) {
              openModalForAdd();
            } else {
              router.push("/login");
            }
          }}
        >
          {userId ? "Add a new Task" : "Login / Register"}
        </button>
        {userId && (
          <button
            className="py-3 px-8 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3aafae] transition duration-200 ease-in-out"
            onClick={logoutUser}
          >
            Sign Out
          </button>
        )}

        {/* TODO: darkmode and maybe more user info */}
        {/* <div className="flex gap-4 items-center">
          <Link
            href="#"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            <FontAwesomeIcon icon={faMoon} />
          </Link>
          <Link
            href="#"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
