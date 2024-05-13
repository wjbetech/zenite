"use client";

import React from "react";
import { FaX } from "react-icons/fa6";
import menuIcons from "@/app/utils/icons";

interface TaskProps {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
}

export default function SingleTask({ title, description, date, isCompleted }: TaskProps) {
  return (
    <div className="flex flex-col gap-y-4 p-4 h-[300px] min-w-[300px] border-2 border-slate-400 rounded-md justify-between hover:shadow-xl hover:cursor-pointer hover:slate-400 transition-all ease-in-out duration-300">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <h1>{title}</h1>
          <button type="button" className="text-xl p-1 rounded-lg border-2 bg-red-500 text-white hover:bg-red-600">
            Delete
          </button>
        </div>
        <p className="mt-2">{description}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-slate-500">Created: {date.slice(0, 10)}</p>
        {isCompleted ? <p className="text-green-500">Completed</p> : <p className="text-red-500">Incomplete</p>}
      </div>
    </div>
  );
}

// # # # # # # # # # # # # # # # #
// I haven't figured out how to use the icons utils file to grab the
// FaX icon for the delete task button, may be worth looking into
// later on.
