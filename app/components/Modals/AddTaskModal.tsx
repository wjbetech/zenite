"use client";

import React from "react";
import { useGlobalState } from "@/app/context/globalProvider";

interface Props {
  content: React.ReactNode;
}

export default function AddTaskModal({ content }: Props) {
  const { toggleModal } = useGlobalState();

  return (
    <div>
      <div className="" onMouseUp={toggleModal}>
        <div className="modal-content">{content}</div>
      </div>
    </div>
  );
}
