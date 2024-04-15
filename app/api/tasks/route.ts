import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data } = req.body;
  } catch (error) {
    console.log("ERROR CREATING TASK!");
    return new NextResponse({
      error: "Error creating new task",
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
  } catch (error) {
    console.log("ERROR REACHING TASK!");
    return new NextResponse({
      error: "Error reaching task",
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  try {
  } catch (error) {
    console.log("ERROR EDITING TASK!");
    return new NextResponse({
      error: "Error editing task",
      status: 500,
    });
  }
}

export async function DELETE(task: Task) {
  try {
    await 
  } catch (error) {
    console.log("ERROR DELETING TASK!");
    return new NextResponse({
      error: "Error deleting task",
      status: 500,
    });
  }
}
