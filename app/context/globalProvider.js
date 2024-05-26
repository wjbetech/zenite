"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
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
  const myThemes = ["light", "dark"];
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [tasks, setTasks] = useState([]);
  const theme = myThemes[selectedTheme];

  // grab user info
  const { user } = useUser();

  // fetch tasks from prisma
  const myTasks = async () => {
    setIsFetching(true);
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      toast.error("Could not retrieve your tasks!");
      return NextResponse({
        error: "Failed to fetch tasks!",
        status: 500,
      });
    }
  };

  // rerender page when user's tasks load in
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (user) myTasks();
  }, [user]);

  return (
    <GlobalContext.Provider value={{ theme, tasks }}>
      <Toaster />
      <GlobalUpdateContext.Provider value>{children}</GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
