import { Sondage } from '@prisma/client';
import { create } from 'zustand'

export type ModalType = "createSondage";

interface ModalData{
    sondage?: Sondage;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void; 
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ type: type, isOpen: true, data: data }),
    onClose: () => set({ isOpen: false, type: null }),
}))