"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { useModal } from "@/hooks/use-modal-store";
import { Profile, Sondage } from '@prisma/client';
import { ChevronRight, Edit, Lock, MoreVertical, Trash, Unlock } from "lucide-react";
import Link from 'next/link';
import { ActionTooltip } from "@/components/action-tootip";
import { Button } from "@/components/ui/button";

interface PollCardProps {
    sondage: Sondage,
    profile?: Profile | null;
}

export const PollCard = ({ sondage, profile }: PollCardProps) => {
    const { onOpen } = useModal()
    const nbVote = sondage.nbVote1 + sondage.nbVote2;

    return (
        <Card className='min-w-[280px] w-full max-w-[450px] relative'>
            <CardHeader>
                <CardTitle className="flex items-center">
                    {sondage.title}
                    <ActionTooltip label={sondage.isPublic ? "Public" : "Private"}>
                        {sondage.isPublic ?
                            <Unlock className="w-5 h-5 ml-2 mt-1 text-green-500 stroke-[3px]" /> :
                            <Lock className="w-5 h-5 ml-2 mt-1 text-rose-500 stroke-[3px]" />
                        }
                    </ActionTooltip>
                </CardTitle>
                <CardDescription>{sondage.description}</CardDescription>
                {sondage.userId === profile?.id && (
                    <div className="absolute top-0 right-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost'>
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right">
                                <DropdownMenuItem onClick={() => onOpen('editSondage', { sondage })}>
                                    <Edit className="w-4 h-4 mr-auto" />
                                    <p>Edit</p>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onOpen('deleteSondage', { sondage })}>
                                    <Trash className="w-4 h-4 mr-auto" />
                                    <p>Delete</p>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <div className='flex justify-between items-center'>
                    <p className='text-xs text-zinc-700 dark:text-zinc-300 font-bold'>{sondage.choice1}</p>
                    <p className='text-xs text-zinc-700 dark:text-zinc-300 font-bold'>{sondage.choice2}</p>
                </div>
                <div className='flex items-center mt-1'>
                    <div className='h-3 bg-indigo-500 rounded-l-full'
                        style={{ width: (sondage.nbVote1 * 100) / nbVote > 0 ? (sondage.nbVote1 * 100) / nbVote + "%" : "50%" }}></div>

                    <div className='h-3 bg-rose-500 rounded-r-full'
                        style={{ width: (sondage.nbVote2 * 100) / nbVote > 0 ? (sondage.nbVote2 * 100) / nbVote + "%" : "50%" }}></div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center -my-3">
                <p className="text-zinc-500">{nbVote} Vote(s)</p>
                <Button className="flex items-center" variant='ghost'>
                    <Link href={`/poll/${sondage.id}`} className="flex items-center">
                        See
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}