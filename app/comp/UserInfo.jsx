"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import getUser from "../data/getUser";

function UserInfo() {
  const [user, setSess] = useState();
  useEffect(() => {
    async function getAuth() {
      const authRes = await getUser();
      setSess(authRes);
    }
    getAuth();
    console.log("user info", user);
  }, []);
  if (user)
    return (
      <div className="p-2 flex items-center justify-between bg-blue-500 text-white rounded-2xl shadow-2xl">
        <Avatar className="me-2 ">
          <AvatarImage width={40} className="rounded-full" src={user.image} />
          <AvatarFallback className="m-1">CN</AvatarFallback>
        </Avatar>{" "}
        <div className="grow ">
          <div>{user.name}</div>
          <div className="text-xs text-muted">{user.email}</div>
        </div>
        <Settings size={17} />
      </div>
    );
}

export default UserInfo;
