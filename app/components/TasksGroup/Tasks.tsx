"use client";

import React from "react";
import SingleTask from "../SingleTask/SingleTask";
import { useGlobalState } from "@/app/context/globalProvider";
import TaskModal from "../Modal/TaskModal";

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
      <TaskModal />
    </main>
  );
}
