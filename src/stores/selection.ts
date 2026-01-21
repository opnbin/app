import { create } from "zustand";

interface SelectionState {
  selectMode: boolean;
  selectedIds: string[];
  setSelectMode: (mode: boolean) => void;
  toggleSelect: (id: string) => void;
  clearSelection: () => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectMode: false,
  selectedIds: [],
  setSelectMode: (mode) =>
    set(() => ({
      selectMode: mode,
      selectedIds: [],
    })),
  toggleSelect: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((i) => i !== id)
        : [...state.selectedIds, id],
    })),
  clearSelection: () => set(() => ({ selectedIds: [] })),
}));
