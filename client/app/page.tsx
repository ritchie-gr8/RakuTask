"use client";

import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";

export default function Home() {
  useRedirect("/login");
  const { tasks } = useTasks();
  // return <main className="py-[2rem] mx-[10rem]"></main>;
  return <div></div>;
}
