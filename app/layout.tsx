import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Host AI",
    template: `%s - Host AI`,
  },
  description: "Host AI ...",
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-satoshi bg-primary h-screen text-primary">
        {children}
      </body>
    </html>
  );
}
