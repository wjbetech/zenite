"use client";

import React from "react";
import SingleTask from "../SingleTask/SingleTask";
import { useGlobalState } from "@/app/context/globalProvider";
import TaskModal from "../Modal/TaskModal";

interface TaskGroupProps {
  title: string;
  tasks: any[];
}

export default function Tasks({ title, tasks }: TaskGroupProps) {
  const { theme } = useGlobalState();

  return (
    <main className="grid grid-cols-4 gap-8 w-full my-4 h-[300px] py-8">
      {tasks.map((task) => (
        <SingleTask key={task.id} task={{ ...task }} />
      ))}
      <TaskModal />
    </main>
  );
}
