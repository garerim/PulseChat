"use client";

import { initialProfile } from "@/lib/initial-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupPage() {
  const profile = await initialProfile();

  if (!profile) {
    redirectToSignIn();
  }

  return redirect('/home')
}
