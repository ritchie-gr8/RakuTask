import type { Metadata } from "next";
import "./globals.css";
import UserProvider from "@/providers/UserProvider";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import MiniSidebar from "./_components/MiniSidebar";
import Header from "./_components/Header";
import MainContentLayout from "@/providers/MainContentLayout";
import SidebarProvider from "@/providers/SidebarProvider";
import MainLayout from "@/providers/MainLayout";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RakuTask",
  description: "Your task manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Toaster position="top-center" />
          <div className="h-full flex overflow-hidden">
            <MiniSidebar />
            <div className="flex flex-1 flex-col">
              <Header />
              <MainContentLayout>
                <MainLayout>{children}</MainLayout>
                <SidebarProvider />
              </MainContentLayout>
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
