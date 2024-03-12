"use client"

import React, { createContext, useState, useContext } from "react"
import themes from "./themes"

export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({ children }) => {

  const [themeId, setThemeId] = useState(0);
  const myTheme = themes[themeId];


  return (
    <GlobalContext.Provider value={{
      myTheme
    }}>
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  )
}