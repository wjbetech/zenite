"use client";

import React, { useEffect } from "react";
import { GlobalProvider } from "../context/globalProvider";

interface Props {
  children: React.ReactNode;
}

export default function ContextProvider({ children }: Props) {
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 250);
  }, []);

  if (!isReady) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader" />
      </div>
    );
  }

  return <GlobalProvider>{children}</GlobalProvider>;
}
