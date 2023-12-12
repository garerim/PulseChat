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
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent
} from '@/components/ui/dropdown-menu';

import { Sondage } from '@prisma/client';
import Link from 'next/link';
import { Button } from "./ui/button";
import { ChevronRight, Edit, MoreVertical, Trash } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface PollCardProps {
    sondage: Sondage
}

export const PollCard = ({ sondage }: PollCardProps) => {
    const { onOpen } = useModal()
    const nbVote = sondage.nbVote1 + sondage.nbVote2;

    return (
        <Card className='min-w-[300px] max-w-[450px] cursor-pointer relative'>
            <CardHeader>
                <CardTitle>{sondage.title}</CardTitle>
                <CardDescription>{sondage.description}</CardDescription>
                <div className="absolute top-0 right-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost'>
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right">
                            <DropdownMenuItem onClick={() => onOpen('editSondage', {sondage})}>
                                <Edit className="w-4 h-4 mr-auto" />
                                <p>Edit</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onOpen('deleteSondage', {sondage})}>
                                <Trash className="w-4 h-4 mr-auto" />
                                <p>Delete</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
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
            <CardFooter className="flex justify-end items-center -my-3">
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