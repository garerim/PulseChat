"use client";

import React, { useState } from 'react'

import { useOrigin } from '@/hooks/use-origin';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';

interface InviteButtonProps {
    pollId: string;
}

export const InviteButton = ({ pollId }: InviteButtonProps) => {

    const origin = useOrigin();
    const [copied, setCopied] = useState(false);

    const inviteUrl = `${origin}/poll/${pollId}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    return (
        <Button className="font-bold flex gap-x-2 items-center" onClick={onCopy}>
            Invite People
            {copied
                ? <Check className="w-5 h-5" />
                : <Copy className="w-5 h-5" />
            }
        </Button>
    )
}
