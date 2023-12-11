import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        
        const { title, description, choice1, choice2 } = await req.json();
        
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const sondage = await db.sondage.create({
            data: {
                userId: profile.id,
                title,
                description,
                choice1,
                choice2,
            },
        });

        return NextResponse.json(sondage);

    } catch (error) {
        console.log("[SONDAGE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}