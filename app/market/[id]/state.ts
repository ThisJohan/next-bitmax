import { create } from "zustand";
import { CryptoData, MergedCoin } from "./models";

export const useStore = create<{
  currency: string;
  symbol: string;
  stat: CryptoData | null;
  coins: MergedCoin[];
}>((set, get) => ({
  symbol: "BTC",
  currency: "USDT",
  stat: null,
  coins: [],
}));
