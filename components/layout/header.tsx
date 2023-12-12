import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "../theme-toggle";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 w-full flex items-center p-2">
      <Link href='/home'>
        <h1 className="text-3xl font-bold">PulseChat</h1>
      </Link>
      <div className="ml-auto flex items-center gap-x-2">
        <ThemeToggle />
        <UserButton />
      </div>
    </header>
  )
}
