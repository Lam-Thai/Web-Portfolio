import { Inter } from "next/font/google";
import "./globals.css";
import MyNavbar from "@/components/my-navbar";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tuoc Lam Thai - Portfolio",
  description: "My personal portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <MyNavbar />
          {children}
          <Toaster position="top-right" richColors />
        </body>
      </UserProvider>
    </html>
  );
}
