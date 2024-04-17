"use client";

import React, { useState } from "react";
import { currentUser } from "@clerk/nextjs";

// types for our task modal inputs
interface TaskState {
	title: string;
	description: string;
	date: string;
	isCompleted: boolean;
	userId?: string;
}

export default async function TaskModal() {
	// clerk user info
	const user = await currentUser();

	// states for tasks
	const [taskState, setTaskState] = useState<TaskState>({
		title: "",
		description: "",
		date: new Date().toISOString().slice(0, 16),
		isCompleted: false,
		// not sure I understand why we check for userId here when our app/route already checks
		userId: user?.id,
	});

	// dynamically handle data changes
	const handleInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = event.target;
		const newValue = type === "checkbox" ? checked : value;
		setTaskState({ ...taskState, [name]: newValue });
	};

	// handle submissions
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(taskState);
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>Create Task</h1>
			<div className="title">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					id="title"
					value={taskState.title}
					onChange={(e) => handleInputChanges(e)}
					placeholder="Set up PrismaDB..."
				/>
			</div>
			<div className="description">
				<label htmlFor="description">Description</label>
				<input
					type="text"
					name="description"
					id="description"
					value={taskState.description}
					onChange={(e) => handleInputChanges(e)}
					placeholder="Set up basic Prisma processes..."
				/>
			</div>
		</form>
	);
}
