"use client";

import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface TaskProps {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
}

export default function SingleTask({ title, description, date, isCompleted }: TaskProps) {
  return (
    <div className="flex flex-col gap-y-4 p-4 h-[300px] min-w-[300px] rounded-md justify-between bg-black/5 hover:shadow-xl hover:cursor-pointer hover:slate-400 transition-all ease-in-out duration-300">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <h1>{title}</h1>
        </div>
        <p className="mt-2">{description}</p>
      </div>
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-col">
          <p className="text-slate-500">Created: {date.slice(0, 10)}</p>
          {isCompleted ? <p className="text-green-500">Completed</p> : <p className="text-red-500">Incomplete</p>}
        </div>
        <div className="flex flex-row gap-2 p-1">
          <FaEdit className="text-xl text-blue-600 hover:text-blue-700" />
          <FaTrashAlt className="text-xl text-red-600 hover:text-red-700" />
        </div>
      </div>
    </div>
  );
}

// # # # # # # # # # # # # # # # #
// I haven't figured out how to use the icons utils file to grab the
// FaX icon for the delete task button, may be worth looking into
// later on.
