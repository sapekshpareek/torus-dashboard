import type { Metadata } from "next";
import { Providers } from '../store/provider';
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "Analytics and User Management Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
