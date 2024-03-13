"use client";

import styled from "styled-components";

// next optimizations
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// utilities
import menu from "@/app/utils/menu";
import getMenuIcon from "@/app/utils/icons";

// import global state
import { useGlobalState } from "@/app/context/globalProvider";

export default function Sidebar() {
	const { myTheme } = useGlobalState();

	const router = useRouter();
	const pathName = usePathname();
	const handleClick = (link: string) => {
		router.push(link);
	};

	return (
		<SidebarStyles theme={myTheme}>
			<div className="profile">
				<div className="image">
					<Image src="/avatar.jpg" alt="stock avatar" width={70} height={70} />
				</div>
				<h1>
					<span>John</span>
					<span>Doe</span>
				</h1>
			</div>
			<ul className="nav-items">
				{menu.map((item) => {
					const link = item.link;
					return (
						<li
							key={item.id}
							className={`nav-item ${pathName === link ? "active" : ""}`}
							onKeyDown={() => link}
						>
							{getMenuIcon(item.icon)}
							<Link className="nav-link" href={item.link}>
								{item.title}
							</Link>
						</li>
					);
				})}
			</ul>
		</SidebarStyles>
	);
}

const SidebarStyles = styled.nav`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.bgSecondary};
  border-radius: 12px;
  border: 2px solid ${(props) => props.theme.borderColor};
  padding: ${(props) => props.theme.padding};
  color: ${(props) => props.theme.text}
`;
