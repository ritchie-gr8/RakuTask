import { Task } from "@/utils/types";
import { formatTime } from "@/utils/utilities";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTasks } from "@/context/taskContext";
import { motion } from "framer-motion";
import { item } from "@/utils/animation";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
      default:
        return "text-red-500";
    }
  };

  const { getTask, openModalForEdit, deleteTask } = useTasks();

  return (
    <motion.div
      className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white"
      variants={item}
    >
      <div>
        <h4 className="font-bold text-2xl">{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <p>{formatTime(task.createdAt)}</p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>
        <div>
          <div className="flex items-center gap-3 text-gray-400 text-[1.2rem]">
            <button
              className={`pointer-events-none ${
                task.completed ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              <FontAwesomeIcon icon={faStar} />
            </button>
            <button
              className="text-[#00a1f1]"
              onClick={() => {
                getTask(task._id);
                openModalForEdit(task);
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              className="text-[#f65314]"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
