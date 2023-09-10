"use client";

import TradingView from "./TradingView";
import Image from "next/image";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MergedCoin } from "./page";
import { useState } from "react";
import { useStore } from "./state";

export default function CoinOverview({ coin }: { coin: MergedCoin }) {
  const store = useStore();

  const handleChange = (event: SelectChangeEvent) => {
    useStore.setState({ symbol: event.target.value as string });
  };

  return (
    <div className="flex justify-between mb-3 items-center">
      <span className="flex gap-2 items-center">
        <Image
          src={`/icons/coin-icons/${coin.symbol}.svg`}
          alt={`${coin.symbol} Icon`}
          width={48}
          height={48}
        />
        <p className="font-bold text-xl">
          {coin.name.fa} {coin.symbol}
        </p>
      </span>

      <div className="text-xl font-bold flex items-center gap-2">
        <FormControl>
          <InputLabel id="demo-simple-select-label">Symbol</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={store.symbol}
            onChange={handleChange}
          >
            <MenuItem value={"USDT"}>USDT</MenuItem>
            <MenuItem value={"IRT"}>IRT</MenuItem>
          </Select>
        </FormControl>
        <span>
          {useStore().symbol === "IRT" ? coin.last_price_irt : coin.last_price}
        </span>
      </div>
    </div>
  );
}
