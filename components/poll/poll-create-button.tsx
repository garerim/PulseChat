"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface PollCreateButtonProps {
    className?: string
}

const PollCreateButton = ({className} : PollCreateButtonProps) => {
    const { onOpen } = useModal();

    return (
        <Button className={cn("font-bold", className)} onClick={() => onOpen('createSondage')}>
            Create a poll
        </Button>
    )
}

export default PollCreateButton