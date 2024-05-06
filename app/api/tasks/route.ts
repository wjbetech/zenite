import prisma from "@/app/utils/connectDB";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

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

    // return the prisma task in json format
    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
