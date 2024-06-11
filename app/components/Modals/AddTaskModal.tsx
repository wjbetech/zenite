"use client";

import type React from "react";
import { useGlobalState } from "@/app/context/globalProvider";
import { useEffect } from "react";

interface Props {
  content: React.ReactNode;
}

export default function AddTaskModal({ content }: Props) {
  const { toggleModal } = useGlobalState();

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      toggleModal();
    }
  };

  // cannot pass handleEscape directly to the wrapper div because
  // global keyboard events should be attached to the document
  // or window object
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);

    // clean up
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleEscape]);

  return (
    <div className="fixed flex top-0 left-0 w-screen h-screen z-10 bg-black/50">
      <div className="bg-white m-auto justify-center align-middle w-[400px] rounded-md">{content}</div>
    </div>
  );
}
