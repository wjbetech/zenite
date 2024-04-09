"use client";

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
	const { theme } = useGlobalState();

	console.log(theme);

	const router = useRouter();
	const pathName = usePathname();
	const handleClick = (link: string) => {
		router.push(link);
	};

	return (
		// entire sidebar
		<div
			className={`relative w-[15rem] flex flex-col justify-between border-none bg-slate-200 p-2 ${
				theme === "light" ? "bg-slate-200" : "bg-slate-700 text-gray-100"
			}`}
		>
			{/* user section */}
			<div
				className={`flex px-4 items-center gap-4 justify-evenly rounded-lg cursor-pointer hover:bg-slate-300 p-2 ${
					theme === "dark" ? "hover:bg-slate-600" : ""
				}`}
			>
				<div className="image w-[33%]">
					<Image
						src="/avatar.jpg"
						alt="stock avatar"
						width={50}
						height={50}
						className="rounded-full flex-shrink-0 inline-block overflow-hidden transition-all ease-in-out"
					/>
				</div>
				<div className="w-[66%] text-center">
					<h1 className="">
						<p className="text-sm">John Smith</p>
						<p
							className={`text-xs text-gray-500 ${
								theme === "dark" ? "text-gray-300/75" : ""
							}`}
						>
							Software Eng.
						</p>
					</h1>
				</div>
			</div>
			{/* menu items */}
			<div className="workspace">
				<h5
					className={`text-slate-500 mb-2 text-sm pb-2 border-b-2 border-slate-400/50 ${
						theme === "dark" ? "text-gray-300" : ""
					}`}
				>
					WORKSPACE
				</h5>
				<ul className="flex flex-col gap-1 cursor-pointer relative mb-10">
					{menu.map((item) => {
						const link = item.link;
						return (
							<li
								key={item.id}
								className={`flex items-baseline text-xs gap-3 p-2 hover:bg-slate-400/10 text-slate-500 w-full rounded-md ${
									pathName === link
										? "bg-slate-300 hover:bg-slate-500 hover:text-slate-200 rounded-md"
										: ""
								} ${theme === "dark" ? "bg-none hover:bg-slate-600/50" : ""}
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
			{/* sign out button */}
			<button type="button" className="text-sm">
				Sign Out
			</button>
		</div>
	);
}
