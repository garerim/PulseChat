import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const { pollId, choice } = await req.json();

        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const choiceString = choice === 1 ? "CHOICE1" : "CHOICE2";

        const vote = await db.vote.create({
            data: {
                sondageId: pollId,
                choice: choiceString,
                voterId: profile.id
            },
        });

        if (vote) {
            if (choiceString === "CHOICE1") {
                const sondage = await db.sondage.update({
                    where: {
                        id: pollId
                    },
                    data: {
                        nbVote1: { increment: 1 }
                    },
                });
            } else {
                const sondage = await db.sondage.update({
                    where: {
                        id: pollId
                    },
                    data: {
                        nbVote2: { increment: 1 }
                    },
                });
            }
        }

        return NextResponse.json(vote);

    } catch (error) {
        console.log("[VOTE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}