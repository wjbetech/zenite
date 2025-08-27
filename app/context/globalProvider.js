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
  // grab user info
  const { user } = useUser();

  const myThemes = ["light", "dark"];
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [modalState, setModalState] = useState(false);

  const theme = myThemes[selectedTheme];

  const toggleModal = () => {
    console.log("clicking inside togglemodal!");
    setModalState(!modalState);
  };

  // fetch tasks from prisma
  const myTasks = async () => {
    setIsFetching(true);
    try {
      const res = await axios.get("/api/tasks");

      // sort tasks based on date created
      const sortedTasks = res.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setTasks(sortedTasks);
      setIsFetching(false);
    } catch (error) {
      console.log("myTasks error:", error?.response || error);
      const status = error?.response?.status;
      // If unauthenticated, just set empty tasks (don't spam the user in dev)
      if (status === 401) {
        setTasks([]);
      } else {
        if (process.env.NODE_ENV !== "development") {
          toast.error("Could not retrieve your tasks!");
        }
      }
      setIsFetching(false);
      return;
    }
    setIsFetching(false);
  };

  // delete a single task
  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted");
      myTasks();
    } catch (error) {
      console.log(error);
      toast.error("Could not delete task!");
    }
  };

  const updateTaskStatus = async (task) => {
    try {
      const res = await axios.put("/api/tasks", task);
      toast.success("Task updated successfully!");
      myTasks();
    } catch (error) {
      console.log("Could not update task!", error);
      toast.error("Could not update task!");
    }
  };

  // sort for completed or active tasks
  const completedTasks = tasks.filter((task) => task.isCompleted);
  const activeTasks = tasks.filter((task) => !task.isCompleted);

  // rerender page when user's tasks load in
  useEffect(() => {
    if (user) {
      myTasks();
    }
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isFetching,
        completedTasks,
        activeTasks,
        updateTaskStatus,
        toggleModal,
        modalState,
        myTasks,
      }}
    >
      <Toaster />
      <GlobalUpdateContext.Provider value={{ toggleModal }}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
