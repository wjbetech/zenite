import { useState } from "react";
import { NextResponse } from "next/server";

// axios for handling API
import axios from "axios";

// toast
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { FaPlus } from "react-icons/fa";
import { useGlobalState } from "@/app/context/globalProvider";

// types for our task modal inputs
interface TaskState {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  userId: string | null | undefined;
}

export default function TaskModal() {
  const { myTasks, toggleModal } = useGlobalState();

  const user = useAuth();

  // states for tasks
  const [taskState, setTaskState] = useState<TaskState>({
    title: "",
    description: "",
    date: new Date().toISOString().slice(0, 16),
    isCompleted: false,
    userId: user.userId,
    // not sure I understand why we check for userId here when our app/route already checks
  });

  // dynamically handle data changes
  const handleInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTaskState({ ...taskState, [name]: value });
  };

  // handle submissions with validation, toast, and api POST
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // post via api
    try {
      const res = await axios.post("/api/tasks", taskState);
      // toast on error
      if (res.data.error) {
        console.log(res.data.error);
        toast.error("Could not create task!");
      }
      console.log("Succesfully created task!");
      toast.success("Task created successfully!");
      myTasks();
      toggleModal();
      return NextResponse.json(res);
    } catch (error) {
      // catch errors
      console.log(error);
    }
    // reset taskState
    setTaskState({
      title: "",
      description: "",
      date: new Date().toISOString().slice(0, 16),
      isCompleted: false,
      userId: user.userId,
    });
  };

  // render out the task form
  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4 rounded-md gap-y-6 hover:shadow-md">
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
        <button
          type="submit"
          className="flex flex-row gap-2 items-center bg-green-500 text-white hover:bg-green-600/90 border-2 p-2 rounded-md"
        >
          <FaPlus /> Add Task
        </button>
      </div>
    </form>
  );
}
