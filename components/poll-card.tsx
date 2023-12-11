"use client";

import { Sondage } from '@prisma/client'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { redirect } from 'next/navigation'
import Link from 'next/link';

interface PollCardProps {
    sondage: Sondage
}

export const PollCard = ({ sondage }: PollCardProps) => {

    const nbVote = sondage.nbVote1 + sondage.nbVote2;

    return (
        <Link href={`/poll/${sondage.id}`}>
            <Card className='min-w-[300px] max-w-[450px] cursor-pointer'>
                <CardHeader>
                    <CardTitle>{sondage.title}</CardTitle>
                    <CardDescription>{sondage.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex justify-between items-center'>
                        <p className='text-xs text-zinc-300 font-bold'>{sondage.choice1}</p>
                        <p className='text-xs text-zinc-300 font-bold'>{sondage.choice2}</p>
                    </div>
                    <div className='flex items-center mt-1'>
                        <div className='h-3 bg-indigo-500 rounded-l-full'
                            style={{ width: (sondage.nbVote1 * 100) / nbVote > 0 ? (sondage.nbVote1 * 100) / nbVote + "%" : "50%" }}></div>

                        <div className='h-3 bg-rose-500 rounded-r-full'
                            style={{ width: (sondage.nbVote2 * 100) / nbVote > 0 ? (sondage.nbVote2 * 100) / nbVote + "%" : "50%" }}></div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
