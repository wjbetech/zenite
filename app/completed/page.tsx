"use client";

import React from "react";
import { useGlobalState } from "@/app/context/globalProvider";
import { FaPlus } from "react-icons/fa";
import SingleTask from "../components/SingleTask/SingleTask";
import { DiVim } from "react-icons/di";

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
  const { theme, isFetching, completedTasks } = useGlobalState();

  return (
    <div>
      <div>
        <h1 className="underline underline-offset-[8px] decoration-red-500 decoration-[8px]">Completed Tasks</h1>
      </div>
      {isFetching ? (
        <div className="flex w-full h-screen justify-center items-center ">
          <div className="loader" />
        </div>
      ) : (
        <main className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-8 w-full my-4 h-[300px] py-8">
          {completedTasks.length ? (
            completedTasks.map((task: Task) => (
              <SingleTask
                key={task.id}
                title={task.title}
                description={task.description}
                date={task.date}
                isCompleted={task.isCompleted}
                id={task.id}
              />
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <h1>You have no completed tasks!</h1>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
