// Example file where you should handle auth
// This will ensure the user is authenticated before accessing the pages in this directory

export default function ProtectedPathsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // some sort of auth check here

  return <div>{children}</div>;
}
