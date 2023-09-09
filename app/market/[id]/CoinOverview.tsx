import TradingView from "./TradingView";
import Image from "next/image";
import { MergedCoin } from "./page";

export default function CoinOverview({ coin }: { coin: MergedCoin }) {
  return (
    <div className="p-3 bg-white rounded-md flex flex-col">
      <div className="flex justify-between mb-3">
        <span className="flex gap-2 items-center">
          <Image
            src={`/icons/coin-icons/${coin.symbol}.svg`}
            alt={`${coin.symbol} Icon`}
            width={48}
            height={48}
          />
          <p className="font-bold text-xl">{coin.name.fa} {coin.symbol}</p>
        </span>
        <span className="text-xl font-bold">{coin.last_price} USDT</span>
      </div>
      <TradingView />
    </div>
  );
}
