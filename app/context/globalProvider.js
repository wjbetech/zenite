"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { NextResponse } from "next/server";
import axios from "axios";

// toast elements
import { Toaster, toast } from "react-hot-toast";

// get the User object
import { useUser } from "@clerk/nextjs";

// build our context
export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

// build our provider
export const GlobalProvider = ({ children }) => {
  // grab user info
  const { user } = useUser();

  const myThemes = ["light", "dark"];
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [tasks, setTasks] = useState([]);
  const theme = myThemes[selectedTheme];

  // fetch tasks from prisma
  const myTasks = async () => {
    setIsFetching(true);
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
      myTasks();
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      toast.error("Could not retrieve your tasks!");
      return new NextResponse({
        error: "Failed to fetch tasks!",
        status: 500,
      });
    }
  };

  // delete a single task
  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted");
      myTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // sort for completed or active tasks
  const completedTasks = tasks.filter((task) => task.completed);
  const activeTasks = tasks.filter((task) => !task.completed);

  // rerender page when user's tasks load in
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (user) myTasks();
  }, [user]);

  return (
    <GlobalContext.Provider value={{ theme, tasks, deleteTask, isFetching, completedTasks, activeTasks }}>
      <Toaster />
      <GlobalUpdateContext.Provider value>{children}</GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
