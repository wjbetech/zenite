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
    <div className="p-[18px] flex flex-col gap-y-6">
      <Link
        href="/"
        type="button"
        className="button flex flex-row justify-center gap-2 items-center border-2 border-black py-3 hover:bg-black/5 px-2 rounded-full w-[112px]"
      >
        <FaArrowLeft />
        Back
      </Link>
      <h1 className="text-3xl">{myTask?.title}</h1>
    </div>
  );
}
