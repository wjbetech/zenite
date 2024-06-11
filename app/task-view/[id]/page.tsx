import prisma from "@/app/utils/connectDB";
import React from "react";
import Link from "next/link";

// arrow icon
import { FaArrowLeft } from "react-icons/fa";

export default async function page({ params }: { params: { id: string } }) {
  const myTask = await prisma.task.findFirst({
    where: {
      id: params.id,
    },
  });

  return (
    <div className="p-[48px] flex flex-col gap-y-6">
      <Link
        href="/"
        type="button"
        className="flex flex-row gap-2 items-center border-2 justify-center w-[100px] py-2 rounded-full bg-black/5 hover:bg-black/10"
      >
        <FaArrowLeft />
        Back
      </Link>
      <h1 className="text-3xl">{myTask?.title}</h1>
    </div>
  );
}
