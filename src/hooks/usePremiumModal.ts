import { create } from "zustand"

interface PremiumModal {
    isOpen: boolean
    setOpen: (open: boolean) => void
}
const usePremiumModal = create<PremiumModal>((set) => ({
    isOpen: false,
    setOpen: (open: boolean) => set({ isOpen: open })
}))

export default usePremiumModal;