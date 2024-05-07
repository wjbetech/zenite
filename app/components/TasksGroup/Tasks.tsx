"use client";

import React from "react";
import SingleTask from "../SingleTask/SingleTask";
import { useGlobalState } from "@/app/context/globalProvider";
import TaskModal from "../Modal/TaskModal";
import { FaPlus } from "react-icons/fa";

interface Task {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
}

interface TaskProps {
  tasks: Task[];
}

export default function Tasks({ tasks }: TaskProps) {
  const { theme } = useGlobalState();

  return (
    <main className="grid grid-cols-4 gap-8 w-full my-4 h-[300px] py-8">
      {tasks.map((task: Task) => (
        <SingleTask
          key={task.id}
          title={task.title}
          description={task.description}
          date={task.date}
          isCompleted={task.isCompleted}
          id={task.id}
        />
      ))}
      <button
        type="button"
        className="flex flex-col h-[300px] w-full border-2 rounded-md border-slate-300 text-slate-500 justify-center align-middle items-center hover:cursor-pointer hover:border-slate-400 hover:bg-gray-900/15 transition-all ease-in-out duration-300"
      >
        <FaPlus />
        <p className="mt-2">Add Task</p>
      </button>
    </main>
  );
}
