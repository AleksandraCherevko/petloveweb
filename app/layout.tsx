import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const geistManrope = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Petloves",
  description: "For pets with love",
  icons: {
    icon: "/love.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistManrope.variable} ${geistManrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
