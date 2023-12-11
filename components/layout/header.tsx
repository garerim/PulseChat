import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "../theme-toggle";

export default function Header() {
  return (
    <header className="fixed top-0 w-full flex items-center p-2">
        <h1 className="text-3xl font-bold">PulseChat</h1>
        <div className="ml-auto flex items-center gap-x-2">
            <ThemeToggle />
            <UserButton />
        </div>
    </header>
  )
}
