import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { pollId: string } }
) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const sondage = await db.sondage.delete({
            where: {
                id: params.pollId,
                userId: profile.id
            }
        })

        return NextResponse.json(sondage);


    } catch (error) {
        console.log("[POLL_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function PATCH(
    req: Request,
    {params}: {params: {pollId: string}}
) {
    try {
        const profile = await currentProfile();
        const {title, description, choice1, choice2, isPublic} = await req.json();

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!params.pollId) {
            return new NextResponse("Poll Id Missing", {status: 400});
        }

        const sondage = await db.sondage.update({
            where: {
                id: params.pollId,
                userId: profile.id
            },
            data: {
                title,
                description,
                choice1,
                choice2,
                isPublic
            }
        });

        return NextResponse.json(sondage);

    } catch (error) {
        console.log("[SONDAGE_ID_PATCH]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}