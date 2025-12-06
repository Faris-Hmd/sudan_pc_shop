"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Settings } from "lucide-react";
import { useSession } from "next-auth/react";

function UserInfo() {
  const { data: session, status } = useSession();

  if (session)
    return (
      <div className="p-2 flex items-center justify-between">
        <Avatar className="me-2 ">
          <AvatarImage
            width={40}
            className="rounded-full"
            src={session.user.image}
          />
          <AvatarFallback className="m-1">CN</AvatarFallback>
        </Avatar>
        <div className="grow ">
          <div>{session.user.name}</div>
          <div className="text-xs text-muted">{session.user.email}</div>
        </div>
        <Settings size={17} />
      </div>
    );
}

export default UserInfo;
