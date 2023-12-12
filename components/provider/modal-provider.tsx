"use client";

import { useEffect, useState } from "react";
import { CreateSondageModal } from "@/components/modal/create-sondage-modal";
import { DeleteSondageModal } from "@/components/modal/delete-sondage-modal";
import { EditSondageModal } from "@/components/modal/edit-sondage-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <CreateSondageModal />
            <DeleteSondageModal />
            <EditSondageModal />
        </>
    )
} 