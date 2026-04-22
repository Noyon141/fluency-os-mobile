import { create } from "zustand";

interface ActionState {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const useActionStore = create<ActionState>((set) => ({
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),
}));
