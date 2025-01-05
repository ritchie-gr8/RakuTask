"use client";

import { useUserContext } from "@/context/userContext";
import useRedirect from "@/hooks/useUserRedirect";
import { useState } from "react";
import ChangePasswordForm from "./_components/auth/ChangePasswordForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  useRedirect("/login");
  const {
    logoutUser,
    user,
    handleUserInput,
    userState,
    updateUser,
    emailVerification,
    allUsers,
    deleteUser,
  } = useUserContext();
  const { name, photo, isVerified, bio } = user;

  const [isOpenBioForm, setIsOpenBioForm] = useState(false);
  const [isSendingVerifyEmail, setIsSendingVerifyEmai] = useState(false);

  const toggleBioForm = () => {
    setIsOpenBioForm(!isOpenBioForm);
  };

  return (
    <main className="py-[2rem] mx-[10rem]">
      <header className="flex justify-between">
        <h1 className="text-[2rem] font-bold">
          Welcome <span className="text-red-600">{name}</span>
        </h1>
        <div className="flex items-center gap-4">
          <img src={photo} alt={name} className="size-[40px] rounded-full" />
          {!isVerified && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:pointer-events-none disabled:bg-gray-500"
              disabled={isSendingVerifyEmail}
              onClick={async () => {
                setIsSendingVerifyEmai(true);
                await emailVerification();
                setIsSendingVerifyEmai(false);
              }}
            >
              Verify Account
            </button>
          )}
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </header>
      <section>
        <p className="text-[#999] text-[2rem]">{bio}</p>
        <h1>
          <button
            onClick={toggleBioForm}
            className="px-4 py-2 bg-[#2ecc71] text-white rounded-md"
          >
            Update Bio
          </button>
        </h1>
        {isOpenBioForm && (
          <form className="mt-4 py-4 max-w-[520px] w-full rounded-md">
            <div className="flex flex-col">
              <label htmlFor="bio" className="mb-1 text-[#999]">
                Bio
              </label>
              <textarea
                name="bio"
                defaultValue={bio}
                onChange={(e) => handleUserInput("bio")(e)}
                className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
              />
            </div>
            <button
              type="submit"
              onClick={(e) => updateUser(e, { bio: userState.bio })}
              className="mt-4 px-4 py-2  bg-blue-500 text-white rounded-md"
            >
              Update
            </button>
          </form>
        )}
      </section>
      <div className="mt-4 flex gap-8">
        <div className="flex-1">
          <ChangePasswordForm />
        </div>
        <div className="flex-1">
          {user.role === "admin" && (
            <ul>
              {allUsers.map(
                (user: any, index: number) =>
                  user.role !== "admin" && (
                    <li
                      key={index}
                      className="mb-2 px-2 py-3 border grid grid-cols-4 items-center gap-8 rounded-md"
                    >
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-[40px]  h-[40px] rounded-full"
                      />
                      <p>{user.name}</p>
                      <p>{user.bio}</p>
                      <button
                        className="bg-red-500 text-white rounded-full p-2 place-content-end"
                        onClick={() => {
                          deleteUser(user._id);
                        }}
                      >
                        <FontAwesomeIcon className="size-4" icon={faTrash} />
                      </button>
                    </li>
                  )
              )}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
