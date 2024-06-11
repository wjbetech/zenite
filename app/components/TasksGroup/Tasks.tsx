"use client";

import React from "react";
import SingleTask from "../SingleTask/SingleTask";
import { useGlobalState } from "@/app/context/globalProvider";
import { FaPlus } from "react-icons/fa";
import AddTaskModal from "../Modals/AddTaskModal";
import TaskModal from "../Modals/TaskModal";

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
  const { theme, isFetching, editTask, toggleModal, modalState } = useGlobalState();

  console.log(modalState);

  return (
    <div>
      {isFetching ? (
        <div className="flex w-full h-screen justify-center items-center ">
          <div className="loader" />
        </div>
      ) : (
        <main className="grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-x-4 gap-y-8 w-full my-4 h-[300px] py-8">
          {modalState && <AddTaskModal content={<TaskModal />} />}
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
          {isFetching || modalState ? (
            ""
          ) : (
            <button
              type="button"
              className="flex flex-col h-[300px] w-full border-2 rounded-md border-slate-300 text-slate-500 justify-center align-middle items-center hover:cursor-pointer hover:border-slate-400 hover:bg-gray-900/15 transition-all ease-in-out duration-300"
              onClick={toggleModal}
            >
              <FaPlus />
              <p className="mt-2">Add Task</p>
            </button>
          )}
        </main>
      )}
    </div>
  );
}
