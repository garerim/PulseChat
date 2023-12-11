import { initialProfile } from "@/lib/initial-profile";

export default async function Home() {
  const profile = await initialProfile();

  return (
    <div>
      
    </div>
  )
}
