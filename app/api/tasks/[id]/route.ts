import prisma from "@/app/utils/connectDB";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // find userId or error if no userId
    const { userId } = await auth();

    // get id from params
    const { id } = params;

    if (!userId) {
      return NextResponse.json("Unauthorised", { status: 401 });
    }

    // find and delete our task
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(task);

    // delete task
  } catch (error) {
    console.log("ERROR DELETING TASK", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
