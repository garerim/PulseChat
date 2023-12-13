"use client";

import { Profile, Sondage } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { PollCard } from './poll-card';
import { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import PollCreateButton from './poll-create-button';


interface PollViewProps {
    sondages: Sondage[],
    profile?: Profile | null;
}

const PollView = ({ sondages, profile }: PollViewProps) => {

    const [searchQuery, setSearchQuery] = useState("")
    const [sondagesFiltered, setSondagesFiltered] = useState<Sondage[]>([])
    const [filter, setFilter] = useState("");

    useEffect(() => {
        setSondagesFiltered(sondages)
    }, [])

    useEffect(() => {
        const newArr = sondages.filter(sondage => (sondage.title.toLowerCase() || sondage.description.toLowerCase()).includes(searchQuery.toLowerCase())).sort((a, b) => {
            if (filter === "mostVotes") {
                return (b.nbVote1 + b.nbVote2) - (a.nbVote1 + a.nbVote2)
            } else if (filter === "leastVotes") {
                return (a.nbVote1 + a.nbVote2) - (b.nbVote1 + b.nbVote2)
            } else if (filter === "recent") {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            } else if (filter === "oldest") {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            } else {
                return 0
            }
        })

        setSondagesFiltered(newArr)
    }, [searchQuery, filter])

    return (
        <div className="max-w-[1400px] mx-auto flex flex-wrap gap-3 justify-center mt-10">
            <div className="w-full flex items-center">
                <Input
                    className='min-w-[280px] w-full max-w-[450px] ml-auto'
                    placeholder="Search a poll..."
                    onChange={(e) => setSearchQuery(e.target.value)} />

                <Select onValueChange={(value) => setFilter(value)}>
                    <SelectTrigger className="w-[180px] mx-2">
                        <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="mostVotes">Most Votes</SelectItem>
                        <SelectItem value="leastVotes">Least Votes</SelectItem>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                    </SelectContent>
                </Select>

                <PollCreateButton className="mr-auto" />
            </div>
            {sondagesFiltered && sondagesFiltered.map((sondage: Sondage) => (
                <PollCard key={sondage.id} sondage={sondage} profile={profile} />
            ))}
        </div>
    )
}

export default PollView