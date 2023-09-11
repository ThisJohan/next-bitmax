import { Metadata, ResolvingMetadata } from "next";
import CoinOverview from "./CoinOverview";
import CoinPost from "./CoinPost";
import CoinsList from "./CoinsList";
import MarketStats from "./MarketStats";
import { ServerRes, CryptoData, Coin, CoinStat, MergedCoin } from "./models";
import TradingView from "./TradingView";
import ClientOnly from "@/app/components/ClientOnly";
import { useStore } from "./state";
import StoreInitializer from "@/app/components/StoreInitializer";

type Props = {
  params: { id: string };
};

async function getData(marketId: string) {
  const market = marketId === "USDT" ? marketId + "IRT" : marketId + "USDT";

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

  return { stat: stat.message, coins: mergedCoins };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data = await getData(params.id);

  return {
    title: `${data.stat.symbol} | ${data.stat.last_price_irt} IRT`,
  };
}

export default async function MarketDetail({ params }: Props) {

  const data = await getData(params.id);
  
  useStore.setState({coins: data.coins,stat: data.stat,symbol: params.id})

  const selectedCoin = data.coins.find((c) => c.symbol === params.id)!;

  return (
    <main className="container mx-auto p-10 flex gap-5">
      <StoreInitializer data={{coins: data.coins,stat: data.stat,symbol: params.id}} />
      <div className="flex flex-col basis-2/3 gap-4">
        <div className="p-3 bg-white rounded-md flex flex-col">
          <CoinOverview coin={selectedCoin} />
          <ClientOnly>
          <TradingView />
          </ClientOnly>
        </div>
        <CoinPost coin={params.id} />
      </div>
      <div className="flex flex-col basis-1/3 gap-4">
        <MarketStats data={data.stat} />
        <CoinsList coins={data.coins.slice(0, 4)} title="بیشترین سود" />
        <CoinsList coins={data.coins.slice(5, 9)} title="ارز های جدید" />
      </div>
    </main>
  );
}
