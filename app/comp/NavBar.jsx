import { auth } from "@/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default async function Navbar() {
  const sess = await auth();
  return (
    <nav className=" backdrop-blur-3xl sticky top-0 right-0  z-10  opacity-95">
      <div className="flex justify-between items-center">
        <SidebarTrigger size={"icon-sm"} className="ms-1" />
        <Link href={"/"} className="logo">
          Elneelen shop
        </Link>
      </div>
      <div className="flex items-center justify-center gap-1">
        <Link className="p-1 flex gap-1 items-center" href="/products">
          <Search size={18} />
        </Link>{" "}
        <Avatar className="me-2">
          <AvatarImage
            width={30}
            className="rounded-full"
            src={
              sess?.user?.image
                ? sess?.user?.image
                : "https://github.com/evilrabbit.png"
            }
          />
          <AvatarFallback className="m-1">CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
