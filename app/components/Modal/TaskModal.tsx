import type React from "react";
import { useState } from "react";

import axios from "axios";

// types for our task modal inputs
interface TaskState {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  userId?: string;
}

export default function TaskModal() {
  // get clerk user info

  // states for tasks
  const [taskState, setTaskState] = useState<TaskState>({
    title: "",
    description: "",
    date: new Date().toISOString().slice(0, 16),
    isCompleted: false,
    // not sure I understand why we check for userId here when our app/route already checks
  });

  // dynamically handle data changes
  const handleInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTaskState({ ...taskState, [name]: value });
  };

  // handle submissions
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/tasks", taskState);
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 p-4 w-1/5 border-2">
      <h1>Create Task</h1>
      <div className="flex flex-col gap-2 py-2">
        <label htmlFor="title" className="text-gray-500">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={taskState.title}
          onChange={(e) => handleInputChanges(e)}
          placeholder="Set up PrismaDB..."
          className="p-2"
        />
      </div>
      <div className="flex flex-col gap-2 py-2">
        <label htmlFor="description" className="text-gray-500">
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          value={taskState.description}
          onChange={(e) => handleInputChanges(e)}
          placeholder="Set up basic Prisma processes..."
          className="overflow-x-clip p-2"
        />
      </div>
      <div className="submit-button">
        <button type="submit" className="border-2 p-2 w-full rounded-md">
          Add Task
        </button>
      </div>
    </form>
  );
}
