"use client";

import { useEffect } from "react";
import { useLoggedIn } from "@/hooks/useLoggedIn";
import { useRouter } from "next/navigation";
import { useGetUserIds } from "./[userId]/setting/hooks/useGetUserIds";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const HomePage = () => {
  const isLoggedIn = useLoggedIn();
  const router = useRouter();
  const { loginUserId } = useGetUserIds();

  useEffect(() => {
    if (isLoggedIn) {
      router.push(`/${loginUserId}`);
    } else {
      router.push("/login");
    }
  }, [isLoggedIn, loginUserId, router]);

  return (
    <LoadingSpinner/>
  );
};

export default HomePage;
