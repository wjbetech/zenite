import prisma from "@/app/utils/connectDB";
import { User, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

// POST requests with data validation (fin)
export async function POST(req: Request) {
  try {
    // make sure a user is logged in before POST
    const { userId } = auth();

    // send unauth'd user away
    if (!userId) {
      return NextResponse.json({
        error: "Unauthorised",
        status: redirect("/login"),
      });
    }

    // gather and validate data from inputs
    const { title, description, date, completed } = await req.json();

    if (!title || !description) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters",
        status: 400,
      });
    }

    if (description.length < 10) {
      return NextResponse.json({
        error: "Description must be at least 15 characters",
        status: 400,
      });
    }

    // build our prisma task
    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        userId,
      },
    });

    // return the prisma task in JSON
    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// GET requests with userId protection (fin)
export async function GET() {
  // find userId or error if no userId
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({
      error: "Unauthorised",
      status: 401,
      // status: redirect("/login"),
    });
  }
  // match userId to logged in userId posts
  const tasks = await prisma.task.findMany({
    where: { userId },
  });
  // return the matching tasks in JSON
  return NextResponse.json(tasks);
}

// PUT requests for updating task status
export async function PUT(req: Request) {
  try {
    // find userId or error if no userId
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({
        error: "Unauthorised",
        status: 401,
        // status: redirect("/login"),
      });
    }

    // gather data from task
    const { isCompleted, id } = await req.json;

    const taskToUpdate = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted: !isCompleted,
      },
    });
  } catch (error) {
    console.log("Could not update task!", error);
    return NextResponse.json({
      error: "Could not update task",
      status: 500,
    });
  }
}
