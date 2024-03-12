"use client"

import React, { useState, useEffect } from 'react'
import { GlobalProvider } from "../context/globalProvider";

interface Props {
  children: React.ReactNode;
}

export default function ContextProvider({children}: Props) {

  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <GlobalProvider>
      {children}
    </GlobalProvider>
  )
}