"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-[#fff3] backdrop-blur-2xl sticky shadow top-0 right-0  z-10 flex justify-between items-center px-2 py-2 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <SidebarTrigger size={"icon-sm"} className="ms-1" />
        <Link href={"/"} className="uppercase font-bold text-lg ms-4">
          <span className="text-blue-500">sudan</span> pc shop
        </Link>
      </div>
      <div className="flex items-center justify-center gap-1">
        <Link className="p-1 flex gap-1 items-center" href="/products">
          <Search size={18} />
        </Link>{" "}
        {session?.user && (
          <Avatar className="me-2">
            <AvatarImage
              width={30}
              className="rounded-full"
              src={
                session.user?.image
                  ? session.user?.image
                  : "https://github.com/evilrabbit.png"
              }
            />
            <AvatarFallback className="m-1">CN</AvatarFallback>
          </Avatar>
        )}
      </div>
    </nav>
  );
}
