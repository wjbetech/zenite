"use client";

import React from "react";
import { useGlobalState } from "@/app/context/globalProvider";
import SingleTask from "../components/SingleTask/SingleTask";

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
  const { theme, isFetching, activeTasks } = useGlobalState();

  return (
    <div>
      <div>
        <h1 className="underline underline-offset-[8px] decoration-green-500 decoration-[8px]">Active Tasks</h1>
      </div>
      {isFetching ? (
        <div className="flex w-full h-screen justify-center items-center ">
          <div className="loader" />
        </div>
      ) : (
        <main className="grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 w-full my-4 h-[300px] py-8">
          {activeTasks.length ? (
            activeTasks.map((task: Task) => (
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
              <h1>You have no active tasks!</h1>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
