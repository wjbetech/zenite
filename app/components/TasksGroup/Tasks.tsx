"use client";

import React from "react";
import SingleTask from "../SingleTask/SingleTask";
import { useGlobalState } from "@/app/context/globalProvider";

export default function Tasks() {
  const { theme } = useGlobalState();

  return (
    <main className="w-full my-4 overflow-y-auto h-full py-8 px-4">
      <SingleTask />
    </main>
  );
}
