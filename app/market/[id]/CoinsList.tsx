import Image from "next/image";
import { Coin, MergedCoin } from "./page";

export default function CoinsList({
  coins,
  title,
}: {
  title: string;
  coins: MergedCoin[];
}) {
  return (
    <div className="p-3 bg-white rounded-md">
      <h2 className="font-bold text-lg mb-2">{title}</h2>
      <ul className="flex flex-col gap-2">
        {coins.map((coin) => (
          <li key={coin.symbol} className="flex justify-between items-center">
            <span className="flex gap-1 items-center">
              <Image
                src={`/icons/coin-icons/${coin.symbol}.svg`}
                alt={`${coin.symbol} Icon`}
                width={28}
                height={28}
              />
              <p>{coin.name.fa}</p>
            </span>
            <span className="flex gap-1 items-center">
              <p>{coin.last_price} USDT</p>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
