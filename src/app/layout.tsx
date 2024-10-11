import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

type Props = Readonly<{
  children: React.ReactNode;
}>;
const RootLayout = ({ children }: Props) => {
  return (
    <html lang="ko">
      <body> {children}</body>
    </html>
  );
};

export default RootLayout;
