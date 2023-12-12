"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";

const PollCreateButton = () => {
    const { onOpen } = useModal();

    return (
        <Button className="font-bold" onClick={() => onOpen('createSondage')}>
            Create a poll
        </Button>
    )
}

export default PollCreateButton