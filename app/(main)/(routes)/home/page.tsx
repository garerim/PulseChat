
import { PollCard } from "@/components/poll-card";
import PollCreateButton from "@/components/poll-create-button";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store"
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { Sondage } from "@prisma/client";

const HomePage = async () => {

  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const sondages = await db.sondage.findMany({
    where: {
      userId: profile.id
    }
  })

  return (
    <div>
      <div className="flex justify-between px-4 mt-4">
        <h2 className="text-2xl font-bold">My Polls</h2>
        <PollCreateButton />
      </div>
      <div className="mt-4 flex flex-wrap gap-5 px-5">
        {sondages.map((sondage) => (
          <PollCard key={sondage.id} sondage={sondage} />
        ))}
        {!sondages.length && (
          <div>
            <p className="text-xl mt-20 font-bold text-zinc-400">You don't have any polls yet...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
