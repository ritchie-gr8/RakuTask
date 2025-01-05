"use client";

import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import Filter from "./_components/Filter";
import TaskItem from "./_components/TaskItem";
import { Task } from "@/utils/types";

export default function Home() {
  useRedirect("/login");
  const { tasks } = useTasks().tasks;
  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <Filter />
      </div>
      <div className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]">
        {tasks?.map((task: Task, index: number) => (
          <TaskItem key={index} task={task} />
        ))}
      </div>
    </main>
  );
}
