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
			<div className="flex p-4 items-center gap-4 justify-evenly rounded-lg cursor-pointer h-[84px]">
				<div className="image w-[33%]">
					<Image
						src="/avatar.jpg"
						alt="stock avatar"
						width={50}
						height={50}
						className="rounded-full"
					/>
				</div>
				<div className="w-[66%] text-center">
					<h1 className="">
						<p className="">John Smith</p>
            <p className="text-sm text-gray-500">Software Eng.</p>
					</h1>
				</div>
			</div>
      <div className="workspace">
        <h5 className="text-slate-500 mb-4 pb-4 border-b-2 border-slate-400/50">WORKSPACE</h5>
        <ul className="cursor-pointer relative mb-10">
          {menu.map((item) => {
            const link = item.link;
            return (
              <li
                key={item.id}
                className={`hover:bg-white/10 text-slate-500 w-full ${
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
      </div>
			<button type="button">Sign Out</button>
		</SidebarStyles>
	);
}

const SidebarStyles = styled.nav`
  display: flex;
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.bgSecondary};
  border: 0;
  padding: ${(props) => props.theme.padding};
  color: ${(props) => props.theme.text};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .image {
    border-radius: 100%;
    flex-shrink: 0;
    display: inline-block;
    overflow: hidden;
    transition: all 0.25s ease;
  }



  & .workspace {
    margin: auto;
  }

  & li {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.gridGap};
    padding: ${(props) => props.theme.listPadding};
  }

  & active {
    background-color: ${(props) => props.theme.bgPrimary};
    color: ${(props) => props.theme.text};
    border-radius: 10px;
  }
`;
