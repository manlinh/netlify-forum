import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/components/Providers";
import AuthButton from "@/components/AuthButton";
import Link from "next/link";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #ddd" }}>
            <Link href="/">Home</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/admin">Admin</Link>
            <Link href="/forums/general">General</Link>
            <span style={{ marginLeft: "auto" }}><AuthButton /></span>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
