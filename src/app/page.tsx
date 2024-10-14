"use client";

import React from "react";
import LogOutButton from "../components/LogOutButton";
import { useAuthStore } from "../store/useUserInfoStore";

const HomePage = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <div>
      HomePage <LogOutButton isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default HomePage;
