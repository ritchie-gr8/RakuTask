"use client";

import useRedirect from "@/hooks/useUserRedirect";

export default function Home() {
  useRedirect("/login");
  // return <main className="py-[2rem] mx-[10rem]"></main>;
  return <div></div>
}
