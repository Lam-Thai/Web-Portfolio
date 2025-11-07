import { Inter } from "next/font/google";
import "./globals.css";
import MyNavbar from "@/components/my-navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tuoc Lam Thai - Portfolio",
  description: "My personal portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MyNavbar />
        {children}
      </body>
    </html>
  );
}
