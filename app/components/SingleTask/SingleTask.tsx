"use client";

import React from "react";

interface TaskProps {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
}

export default function SingleTask({ task }: TaskProps) {
  const { title, description, date, isCompleted } = task;

  return (
    <div className="flex flex-col gap-y-4 p-4 h-[300px] min-w-[300px] border-2 border-slate-400 rounded-md justify-between hover:shadow-xl hover:cursor-pointer">
      <div className="flex justify-between">
        <h1>{title}</h1>
        <span className="text-2xl">X</span>
      </div>
      <p className="">{description}</p>
      <p className="text-slate-500">Created: {date.slice(0, 10)}</p>
      {isCompleted ? <p className="text-green-500">Completed</p> : <p className="text-red-500">Uncompleted</p>}
    </div>
  );
}
