import CoinPost from "./CoinPost";
import CoinsList from "./CoinsList";
import MarketStats from "./MarketStats";

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

export interface ServerRes<T> {
  message: T;
}

async function getData(marketId: string) {
  const market = marketId === "USDT" ? marketId + "IRT" : marketId + "USDT";

  // const statRes = await fetch(
  //   `https://api-test.maxpool.site/watcher/price/coins/stat?market=${market}`
  // );
  // const coinsRes = await fetch("https://api-test.maxpool.site/coins/");

  let [stat, coins] = await Promise.all([
    fetch(
      `https://api-test.maxpool.site/watcher/price/coins/stat?market=${market}/`
    ).then((v) => v.json() as Promise<ServerRes<CryptoData>>),
    fetch("https://api-test.maxpool.site/coins/").then(
      (v) => v.json() as Promise<ServerRes<Coin[]>>
    ),
  ]);

  // const stat: ServerRes<CryptoData> = await statRes.json();
  // const coins: ServerRes<Coin[]> = await coinsRes.json();

  return { state: stat.message, coins: coins.message };
}

export default async function MarketDetail({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  return (
    <main className="container mx-auto p-10 flex gap-5">
      <div className="flex flex-col basis-2/3">
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
