"use client";

import Tasks from "./components/TasksGroup/Tasks";
import { useGlobalState } from "./context/globalProvider";

export default function Home() {
  const { tasks } = useGlobalState();

  return (
    <div className="">
      <h1 className="underline underline-offset-[8px] decoration-blue-500 decoration-[8px] p-[18px]">All Tasks</h1>
      <Tasks tasks={tasks} />
    </div>
  );
}
