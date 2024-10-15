import { getAllUsers } from "@/services/auth/serverAction";
import React from "react";

const UserSearchBar = async () => {
  const { data } = await getAllUsers();

  console.log("test", data);
  return <input />;
};

export default UserSearchBar;
