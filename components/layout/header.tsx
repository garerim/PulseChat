import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "../theme-toggle";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 w-full flex items-center p-2 z-30 bg-background/90">
      <Link href='/home'>
        <h1 className="md:text-3xl text-2xl font-bold">PulseChat</h1>
      </Link>
      <div className="ml-auto flex items-center gap-x-2">

        <div className="md:flex hidden items-center gap-x-2">
          <Link href="/home" className="text-xl font-bold bottom-after block">Home</Link>
          <Link href="/poll" className="text-xl font-bold bottom-after block">My Polls</Link>
        </div>

        <div className="block md:hidden">
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className="px-2">
                <Menu className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/home">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/poll">My Polls</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ThemeToggle />
        <UserButton />
      </div>
    </header>
  )
}
