"use client"

import React from 'react'
import GlobalStyles from "./GlobalStyles";

interface Props {
  children: React.ReactNode;
}

export default function ContextProvider({children}: Props) {
  return (
    <GlobalStyles>
      {children}
    </GlobalStyles>
  )
}