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
			<div className="profile flex p-4 items-center gap-4 justify-evenly rounded-lg bg-black/25 hover:bg-black/20 cursor-pointer h-[84px]">
				<div className="image w-[33%]">
					<Image
						src="/avatar.jpg"
						alt="stock avatar"
						width={60}
						height={60}
						className="rounded-full"
					/>
				</div>
				<div className="w-[66%] text-center">
					<h1 className="flex flex-col">
						<span>John</span>
						<span>Doe</span>
					</h1>
				</div>
			</div>
			<ul className="cursor-pointer relative mb-10">
				{menu.map((item) => {
					const link = item.link;
					return (
						<li
							key={item.id}
							className={`hover:bg-white/10 w-full ${
								pathName === link ? "active" : ""
							}`}
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
			<button>Sign Out</button>
		</SidebarStyles>
	);
}

const SidebarStyles = styled.nav`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.bgPrimary};
  border-radius: 12px;
  border: 2px solid ${(props) => props.theme.borderColor};
  padding: ${(props) => props.theme.padding};
  color: ${(props) => props.theme.text};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .profile {
    border: 2px solid #bbb;
  }

  & .image {
    border-radius: 100%;
    flex-shrink: 0;
    display: inline-block;
    overflow: hidden;
    transition: all 0.25s ease;
    border: 2px solid #bbb;
  }

  & li {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.gridGap};
    padding: ${(props) => props.theme.listPadding};
  }
`;
