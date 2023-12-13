import { Button } from "@/components/ui/button";
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
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
            user: true
        }
    })

    if (!sondage) {
        redirect('/home');
    }

    const nbVote = sondage.nbVote1 + sondage.nbVote2;

    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col items-center mt-10">
                <h1 className="text-4xl font-bold text-center">{sondage.title}</h1>
                <p className="text-center text-xl">{sondage.description}</p>
                <p className="text-zinc-400">Created by {sondage.user.name.replace("null", "")}</p>
                <div className="flex items-center justify-between gap-x-2 mt-4">
                    <p className="text-base">{sondage.choice1}</p>
                    <p className="text-base">{sondage.choice2}</p>
                </div>
                <div className="flex w-full mt-2">
                    <div className="text-sm flex items-center p-1 h-5 bg-indigo-500 rounded-l-full grow origin-left" style={{ width: (sondage.nbVote1 * 100) / 20 + "%" }}>
                        {(sondage.nbVote1 * 100) / nbVote}%
                    </div>
                    <div className="text-sm flex items-center justify-end p-1 h-5 bg-rose-500 rounded-r-full grow origin-right" style={{ width: (sondage.nbVote2 * 100) / nbVote + "%" }}>
                        {(sondage.nbVote2 * 100) / nbVote}%
                    </div>
                </div>
                <div className="flex items-center justify-between w-full">
                    <p className="text-sm text-zinc-400">{sondage.nbVote1} votes</p>
                    <p className="text-sm text-zinc-400">{sondage.nbVote2} votes</p>
                </div>
                <div className="flex items-center justify-between w-full mt-2">
                    <Button className="w-[45%] bg-indigo-500 hover:bg-indigo-400 transition">Vote</Button>
                    <Button className="w-[45%] bg-rose-500 hover:bg-rose-400 transition">Vote</Button>
                </div>
            </div>
        </div>
    )
}

export default PollIdPage