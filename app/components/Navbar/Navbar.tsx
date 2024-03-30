"use client"

import React from 'react'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


export default function Navbar() {

  return (
    <nav className="py-2 px-6 w-full h-[64px] flex justify-between">
      <h1 className="text-3xl">Zenite</h1>
    </nav>
  )
}