import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers/RQProvider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: " 응답하라 2024",
  description: "향수를 일으키는 레트로 SNS"
};

type Props = Readonly<{ children: React.ReactNode }>;

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="ko">
      <body>
        <Suspense fallback={<>... 로딩</>}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
