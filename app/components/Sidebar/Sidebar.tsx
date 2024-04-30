"use client";

// next optimizations
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// utilities
import menu from "@/app/utils/menu";
import getMenuIcon from "@/app/utils/icons";

// clerk
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
  useAuth,
  useUser,
} from "@clerk/nextjs";

// import global state
import { useGlobalState } from "@/app/context/globalProvider";

export default function Sidebar() {
  // theme
  const { theme } = useGlobalState();
  // clerk
  const { isLoaded, isSignedIn, user } = useUser();

  console.log(theme);

  const router = useRouter();
  const pathName = usePathname();
  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    // entire sidebar
    <SignedIn>
      <div className="relative w-[15rem] flex flex-col justify-between border-none bg-slate-200 p-4">
        {/* user section */}
        <div className="flex px-4 items-center gap-4 justify-evenly rounded-lg cursor-pointer hover:bg-slate-300 p-2">
          <div className="image w-[33%]">
            <UserButton />
          </div>
          <div className="w-[66%] text-center">
            <p>{user?.firstName}</p>
          </div>
        </div>
        {/* menu items */}
        <div className="workspace">
          <h5 className="text-slate-500 mb-2 text-sm pb-2 border-b-2 border-slate-400/50">WORKSPACE</h5>
          <ul className="flex flex-col gap-1 cursor-pointer relative mb-10">
            {menu.map((item) => {
              const link = item.link;
              return (
                <li
                  key={item.id}
                  className="flex items-baseline text-xs gap-3 p-2 hover:bg-slate-400/10 text-slate-500 w-full rounded-md"
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
        <SignOutButton />
      </div>
    </SignedIn>
  );
}
