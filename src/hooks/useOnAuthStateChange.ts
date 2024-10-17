"use client";

import browserClient from "@/utils/supabase/client";
import { useEffect } from "react";

/** 유저정보를 실시간으로 zustand에 저장하는 함수 */
const useOnAuthStateChange = () => {

  useEffect(() => {
    const { data: authListener } = browserClient.auth.onAuthStateChange((_, session) => {
      // session 
      // console.log("session", session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
};

export default useOnAuthStateChange;
