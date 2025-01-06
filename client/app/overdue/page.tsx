"use client";

import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";

import { Task } from "@/utils/types";
import { filterTasks, overdueTasks } from "@/utils/utilities";
import Filter from "../_components/Filter";
import TaskItem from "../_components/TaskItem";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/utils/animation";

export default function page() {
  useRedirect("/login");
  const { openModalForAdd, priority, tasks, setPriority } = useTasks();
  const overdue = overdueTasks(tasks);
  const filteredTasks = filterTasks(overdue, priority);

  useEffect(() => {
    setPriority("all");
  }, []);

  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Overdue Tasks</h1>
        <Filter />
      </div>
      <motion.div
        className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {filteredTasks?.map((task: Task, index: number) => (
          <TaskItem key={index} task={task} />
        ))}
        <motion.button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}
          variants={item}
        >
          Add New Task
        </motion.button>
      </motion.div>
    </main>
  );
}
