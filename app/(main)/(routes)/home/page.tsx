import { PollCard } from "@/components/poll/poll-card";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db"
import React from "react";
import { Input } from "@/components/ui/input";
import { Sondage } from "@prisma/client";
import PollView from "@/components/poll/poll-view";

const HomePage = async () => {

  const profile = await currentProfile();
  const sondages = await db.sondage.findMany({
    where: {
      isPublic: true
    }
  });

  return (
    <div className="pt-12">
      <h1 className="text-[10vw] md:text-8xl font-bold text-center">Welcome on <br /> <span className="text-primary">PulseChat</span></h1>
      <p className="text-[4vw] md:text-xl text-zinc-600 dark:text-zinc-400 text-center mt-4">The best way to create polls and vote on them.</p>
      <p className="text-[4vw] md:text-xl text-zinc-600 dark:text-zinc-400 text-center"> Explore the polls created by the community.</p>

      <PollView sondages={sondages} profile={profile} />
    </div>
  )
}
export default HomePage