"use client";

import styled from "styled-components";

// make sure that each child in GlobalStyles is a ReactNode object
interface Props {
	children: React.ReactNode;
}

// pass children to GlobalStyles typed to ReactNode
export default function GlobalStyleProvider({ children }: Props) {
	return <GlobalStyles>{children}</GlobalStyles>;
}

const GlobalStyles = styled.div`
  display: flex;
  gap: 1.5rem;
  height: 100%;
`;

// When you use the GlobalStyles component elsewhere in your application, you can pass any React node or component(s) as its children. The TypeScript type system ensures that only valid React nodes are passed as children because of the Props interface declaration.
