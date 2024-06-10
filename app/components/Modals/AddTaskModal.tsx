"use client";

import type React from "react";
import { useGlobalState } from "@/app/context/globalProvider";

interface Props {
  content: React.ReactNode;
}

export default function AddTaskModal({ content }: Props) {
  const { toggleModal } = useGlobalState();

  return (
    <div className="fixed flex top-0 left-0 w-screen h-screen z-10 bg-black/50">
      <div className="bg-white m-auto justify-center align-middle w-[400px] rounded-md">{content}</div>
    </div>
  );
}
