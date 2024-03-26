"use client"

import React from 'react'
import styled from "styled-components";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// import global state
import { useGlobalState } from "@/app/context/globalProvider";

type Props = {}

export default function Navbar({}: Props) {

  const { myTheme } = useGlobalState();

  return (
    <StyledNav theme={myTheme}>Navbar</StyledNav>
  )
}

const StyledNav = styled.nav`
  height: 56px;
  background-color: ${(props) => props.theme.bgSecondary};
`