import CoinOverview from "./CoinOverview";
import CoinPost from "./CoinPost";
import CoinsList from "./CoinsList";
import MarketStats from "./MarketStats";
import TradingView from "./TradingView";

export interface CryptoData {
  high_price: number;
  low_price: number;
  last_price: number;
  price_change: number;
  price_change_percent: number;
  volume: number;
  open_price: number;
  ascending: boolean;
  high_price_irt: number;
  low_price_irt: number;
  last_price_irt: number;
  volume_irt: number;
  popularity: number;
  symbol: string;
  market: string;
  chart_url: string;
  market_cap: number;
}

export interface Coin {
  canOtc: boolean;
  contractAddress: {
    [key: string]: string;
  };
  createdAt: string;
  decimal: {
    [key: string]: number;
  };
  depositable: {
    [key: string]: boolean;
  };
  floatingPoint: number;
  icon: string;
  isCrypto: boolean;
  name: {
    en: string;
    fa: string;
  };
  networks: string[];
  priority: number;
  symbol: string;
  tradable: boolean;
  tradeMin: number;
  updatedAt: string | null;
  withdrawFee: {
    [key: string]: string;
  };
  withdrawFloatingPoint: {
    [key: string]: number;
  };
  withdrawMin: {
    [key: string]: string;
  };
  withdrawable: {
    [key: string]: boolean;
  };
}

export interface CoinStat {
  ascending: boolean;
  chart_url: string;
  high_price: number;
  high_price_irt: number;
  last_price: number;
  last_price_irt: number;
  low_price: number;
  low_price_irt: number;
  market: string;
  market_cap: number;
  open_price: number;
  popularity: number;
  price_change: number;
  price_change_percent: number;
  symbol: string;
  volume: number;
  volume_irt: number;
}

export type MergedCoin = Coin & CoinStat;

export interface ServerRes<T> {
  message: T;
}

async function getData(marketId: string) {
  const market = marketId === "USDT" ? marketId + "IRT" : marketId + "USDT";

  // const statRes = await fetch(
  //   `https://api-test.maxpool.site/watcher/price/coins/stat?market=${market}`
  // );
  // const coinsRes = await fetch("https://api-test.maxpool.site/coins/");

  let [stat, coins, coinsStat] = await Promise.all([
    fetch(
      `https://api-test.maxpool.site/watcher/price/coins/stat?market=${market}`,
      {
        next: { revalidate: 10 },
      }
    ).then((v) => v.json() as Promise<ServerRes<CryptoData>>),
    fetch("https://api-test.maxpool.site/coins/", {
      next: { revalidate: 10 },
    }).then((v) => v.json() as Promise<ServerRes<Coin[]>>),
    fetch("https://api-test.maxpool.site/watcher/price/coins/stat", {
      next: { revalidate: 10 },
    }).then((v) => v.json() as Promise<ServerRes<CoinStat[]>>),
  ]);

  let mergedCoins: MergedCoin[] = coins.message.map((c) => {
    const stat = coinsStat.message.find((s) => s.symbol === c.symbol)!;

    return { ...stat, ...c };
  });

  // const stat: ServerRes<CryptoData> = await statRes.json();
  // const coins: ServerRes<Coin[]> = await coinsRes.json();

  return { state: stat.message, coins: mergedCoins };
}

export default async function MarketDetail({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  const selectedCoin = data.coins.find(c => c.symbol === params.id)!

  return (
    <main className="container mx-auto p-10 flex gap-5">
      <div className="flex flex-col basis-2/3 gap-4">
        <CoinOverview coin={selectedCoin} />
        <CoinPost coin={params.id} />
      </div>
      <div className="flex flex-col basis-1/3 gap-4">
        <MarketStats data={data.state} />
        <CoinsList coins={data.coins.slice(0, 4)} title="بیشترین سود" />
        <CoinsList coins={data.coins.slice(5, 9)} title="ارز های جدید" />
      </div>
    </main>
  );
}
