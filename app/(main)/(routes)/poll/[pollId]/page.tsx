import { InviteButton } from "@/components/invite-button";
import { VoteButton } from "@/components/vote-button";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface PollIdPageProps {
    params: {
        pollId: string;
    }
}

const PollIdPage = async ({ params }: PollIdPageProps) => {

    const profile = await currentProfile();

    if (!profile) {
        redirectToSignIn();
    }

    const sondage = await db.sondage.findUnique({
        where: {
            id: params.pollId
        },
        include: {
            user: true,
            votes: true
        }
    })

    if (!sondage) {
        redirect('/home');
    }

    const isAlreadyVoted = sondage.votes.find(vote => vote.voterId === profile?.id);

    const nbVote = sondage.nbVote1 + sondage.nbVote2;

    return (
        <div className="flex flex-col items-center gap-y-4 w-full">
            <div className="flex flex-col items-center mt-20 px-10 py-6 rounded-md border">
                <h1 className="text-4xl font-bold text-center">{sondage.title}</h1>
                <p className="text-center text-xl">{sondage.description}</p>
                <p className="text-zinc-400">Created by {sondage.user.name.replace("null", "")}</p>
                <div className="flex items-center w-full justify-between gap-x-2 mt-4">
                    <p className="text-base">{sondage.choice1}</p>
                    <p className="text-base">{sondage.choice2}</p>
                </div>
                <div className="flex w-full mt-2">
                    <div className="text-sm flex items-center p-1 h-5 bg-indigo-500 rounded-l-full grow origin-left" style={{ width: (sondage.nbVote1 * 100) / nbVote + "%" }}>
                        {((sondage.nbVote1 * 100) / nbVote) > 0 ? Math.round((sondage.nbVote1 * 100) / nbVote) : 0}%
                    </div>
                    <div className="text-sm flex items-center justify-end p-1 h-5 bg-rose-500 rounded-r-full grow origin-right" style={{ width: (sondage.nbVote2 * 100) / nbVote + "%" }}>
                        {((sondage.nbVote2 * 100) / nbVote) > 0 ? Math.round((sondage.nbVote2 * 100) / nbVote) : 0}%
                    </div>
                </div>
                <div className="flex items-center justify-between w-full">
                    <p className="text-sm text-zinc-400">{sondage.nbVote1} votes</p>
                    <p className="text-sm text-zinc-400">{sondage.nbVote2} votes</p>
                </div>
                <div className="flex items-center justify-between w-full mt-2">
                    {!isAlreadyVoted ? <>
                        <VoteButton choice={1} sondageId={sondage.id} />
                        <VoteButton choice={2} sondageId={sondage.id} />
                    </> : (
                        <div className="py-2 px-4 bg-secondary w-fit mx-auto rounded-lg">
                            You already voted for <span className={cn("font-bold",
                                isAlreadyVoted.choice === "CHOICE1" ? "text-indigo-500" : "text-rose-500"
                            )}>
                                {isAlreadyVoted.choice === "CHOICE1" ? sondage.choice1 : sondage.choice2}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <InviteButton pollId={params.pollId} />
            </div>
        </div>
    )
}

export default PollIdPage