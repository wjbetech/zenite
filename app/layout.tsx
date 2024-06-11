// biome-ignore lint/style/useImportType: <explanation>
import { Metadata } from "next";
import { Inter } from "next/font/google";

// clerk
import { ClerkProvider } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

// nextTopLoader
import NextTopLoader from "nextjs-toploader";

// components
import Sidebar from "./components/Sidebar/Sidebar";

// our global stylesheet
import "./globals.css";
import ContextProvider from "./providers/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zenite | Your New Task Manager.",
  description: "A NextJs task management application hosted on Vercel.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();
  const user = await currentUser();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <NextTopLoader height={4} color="#B57EDC" easing="cubic-bezier(.53, .21, 0, 1)" />
          <div className="flex h-full">
            <ContextProvider>
              <Sidebar />
              <div className="w-full px-2 ml-[260px] p-6">{children}</div>
            </ContextProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
