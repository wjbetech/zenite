"use client";

import React from 'react'
import styled from "styled-components";

// make sure that each child in GlobalStyles is a ReactNode object
interface Props {
  children: React.ReactNode;
}


// pass children to GlobalStyles typed to ReactNode
export default function GlobalStyles({children}: Props) {
  return (
    <MyGlobalStyle>
      {children}
    </MyGlobalStyle>
  )
}

const MyGlobalStyle = styled.div`
  padding: 2rem;
  font-size: 16px;
  color: white;
  display: flex;
  gap: 1.5rem;
  height: 100%;
`

// When you use the GlobalStyles component elsewhere in your application, you can pass any React node or component(s) as its children. The TypeScript type system ensures that only valid React nodes are passed as children because of the Props interface declaration. 