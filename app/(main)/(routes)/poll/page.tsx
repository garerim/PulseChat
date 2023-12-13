import { PollCard } from "@/components/poll/poll-card";
import PollCreateButton from "@/components/poll/poll-create-button";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";

const PollPage = async () => {

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
      <div className="flex justify-between mx-4 mt-4 pb-4 border-b">
        <h2 className="text-2xl font-bold">My Polls</h2>
        <PollCreateButton />
      </div>
      <div className="mt-4 flex flex-wrap gap-5 md:px-5 justify-center md:justify-start">
        {sondages.map((sondage) => (
          <PollCard key={sondage.id} sondage={sondage} profile={profile} />
        ))}
        {!sondages.length && (
          <div className="w-full">
            <p className="text-xl mt-20 font-bold text-zinc-400 text-center">You don't have any polls yet...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PollPage
