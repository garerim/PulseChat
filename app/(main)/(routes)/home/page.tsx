"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store"

const HomePage = () => {

    const { onOpen } = useModal();

  return (
    <div>
        <Button onClick={() => onOpen('createSondage')}>
            Salut
        </Button>
    </div>
  )
}

export default HomePage
