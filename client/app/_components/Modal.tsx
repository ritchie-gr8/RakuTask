"use client";

import { useTasks } from "@/context/taskContext";
import useDetectOutsideModal from "@/hooks/useDetectOutsideModal";
import React, { useEffect, useRef } from "react";

const Modal = () => {
  const { task, handleInput, createTask, closeModal, isEditing } = useTasks();
  const ref = useRef(null);

  useDetectOutsideModal({ref, callback: () => {
    if (isEditing) {
        closeModal()
    }
  }})

  useEffect(() => {}, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTask(task);
  };

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden">
      <form
        ref={ref}
        action=""
        onSubmit={handleSubmit}
        className="py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="bg-[#f9f9f9] p-2 rounded-md border"
            placeholder="Task title"
            id="title"
            name="title"
            value={task.title}
            onChange={(e) => handleInput("title")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            className="bg-[#f9f9f9] p-2 rounded-md border resize-none"
            placeholder="Task description"
            name="description"
            rows={3}
            value={task.description}
            onChange={(e) => handleInput("description")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Select priority</label>
          <select
            className="bg-[#f9f9f9] p-2 rounded-md border cursor-pointer"
            name="priority"
            value={task.priority}
            onChange={(e) => handleInput("priority")(e)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dueDate">Due date</label>
          <input
            className="bg-[#f9f9f9] p-2 rounded-md border"
            name="dueDate"
            type="date"
            value={task.dueDate}
            onChange={(e) => handleInput("dueDate")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="completed">Task completed</label>
          <div className="flex items-center justify-between bg-[#F9F9F9] p-2 rounded-md border">
            <label htmlFor="completed">Completed</label>
            <div>
              <select
                className="bg-[#F9F9F9] p-2 cursor-pointer outline-none"
                name="completed"
                value={task.completed ? "true" : "false"}
                onChange={(e) => handleInput("completed")(e)}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className={`text-white py-2 rounded-md w-full hover:bg-blue-500 transition duration-200 ease-in-out ${
              //   modalMode === "edit" ? "bg-blue-400" :
              "bg-green-400"
            }`}
          >
            {
              // modalMode === "edit" ? "Update Task" :
              "Create Task"
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
