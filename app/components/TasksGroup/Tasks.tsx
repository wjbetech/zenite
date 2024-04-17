"use client";

import React from "react";
import SingleTask from "../SingleTask/SingleTask";
import { useGlobalState } from "@/app/context/globalProvider";
import TaskModal from "../Modal/TaskModal";

export default function Tasks() {
	const { theme } = useGlobalState();

	return (
		<main className="w-full my-4 overflow-y-auto h-full py-8 px-4">
			<TaskModal />
		</main>
	);
}
