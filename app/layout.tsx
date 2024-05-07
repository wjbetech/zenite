import { Metadata } from "next";
import { Inter } from "next/font/google";

// clerk
import { ClerkProvider } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

// components
import Sidebar from "./components/Sidebar/Sidebar";

// our global stylesheet
import "./globals.css";
import ContextProvider from "./providers/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <div className="flex h-full">
            <ContextProvider>
              <Sidebar />
              <div className="w-full mx-2 p-6">{children}</div>
            </ContextProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
