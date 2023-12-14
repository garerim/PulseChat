"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import axios from 'axios';

interface VoteButtonProps {
    choice: number;
    sondageId: string
}

export const VoteButton = ({ choice, sondageId }: VoteButtonProps) => {

    const postVote = async (choice: number) => {
        await axios.post('/api/vote', {
            pollId: sondageId,
            choice: choice,
        })

        window.location.reload();
    }

    return (
        <Button
            className={cn("w-[45%] transition",
             choice === 1 ? "bg-indigo-500 hover:bg-indigo-400" : "bg-rose-500 hover:bg-rose-400")} 
            onClick={() => postVote(choice)}>
            Vote
        </Button>
    )
}
