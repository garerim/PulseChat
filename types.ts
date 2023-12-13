import { Profile, Sondage } from "@prisma/client";

export type SondageWithProfile = Sondage & {
    profile: Profile;
}[];