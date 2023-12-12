"use client";

import { Profile, Sondage } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { PollCard } from './poll-card';
import { useState, useEffect } from 'react';

interface PollViewProps {
    sondages: Sondage[],
    profile?: Profile | null;
}

const PollView = ({ sondages, profile }: PollViewProps) => {

    const [searchQuery, setSearchQuery] = useState("")
    const [sondagesFiltered, setSondagesFiltered] = useState<Sondage[]>([])

    useEffect(() => {
        setSondagesFiltered(sondages)
    }, [])

    useEffect(() => {
        const newArr = sondages.filter(sondage => (sondage.title.toLowerCase() || sondage.description.toLowerCase()).includes(searchQuery.toLowerCase()))

        setSondagesFiltered(newArr)
    }, [searchQuery])

    return (
        <div className="max-w-[1400px] mx-auto flex flex-wrap gap-3 justify-center mt-10">
            <div className="w-full flex items-center">
                <Input 
                    className='min-w-[280px] w-full max-w-[450px] mx-auto md:mx-2'
                    placeholder="Search a poll..." 
                    onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            {sondagesFiltered && sondagesFiltered.map((sondage: Sondage) => (
                <PollCard key={sondage.id} sondage={sondage} profile={profile} />
            ))}
        </div>
    )
}

export default PollView