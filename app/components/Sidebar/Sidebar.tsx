"use client"

import React from 'react'
import styled from "styled-components"
import Image from "next/image"

// utilities
import menu from "@/app/utils/menu"
import getMenuIcon from "@/app/utils/icons"

// import global state
import { useGlobalState } from "@/app/context/globalProvider"

export default function Sidebar() {
  
  const { theme } = useGlobalState();
  
  return <SidebarStyles theme={theme}>
    <div className="profile">
      <div className="profile-overlay">

      </div>
      <div className="image">
        <Image 
          src="/avatar.jpg" 
          alt="stock avatar" 
          width={70} 
          height={70} 
        />
      </div>
      <h1>
        <span>John</span>
        <span>Doe</span>
      </h1>
    </div>
    <ul className="nav-items">
      {menu.map((item) => (
        <li className="nav-item" key={item.id}>
          <a className="nav-link" href={item.link}>
            {item.title}
          </a>
          <span>{getMenuIcon(item.icon)}</span>
        </li>
      ))}
    </ul>
  </SidebarStyles>
}

const SidebarStyles = styled.nav`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.bgSecondary};
  border-radius: 12px;
  border: 2px solid ${(props) => props.theme.borderColor};
  padding: ${(props) => props.theme}
`