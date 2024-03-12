"use client"

import React, { createContext, useState, useContext } from "react"
import theme from "@/app/context/theme"

export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({ children }) => {

  const [themeId, setThemeId] = useState(0);
  const myTheme = theme[themeId];


  return (
    <GlobalContext.Provider value={{myTheme}}>
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);

