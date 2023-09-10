import { create } from "zustand";

export const useStore = create<{ symbol: string }>((set) => ({
  symbol: "USDT",
}));
