import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // make sure a user is logged in before POST
    const { userId } = auth();
    
    // send unauth'd user away
    if (!userId) {
      return NextResponse.redirect("/");
    }

    // gather and validate data if user is auth'd
    const { title, description, date, completed, status } = await req.json();



    // 
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
