import { create } from "zustand";
import { v4 } from "uuid";

export const useBrowseObject = create((set) => ({
  object: {},

  setObject: (object: any) => set({ object }),
}));
