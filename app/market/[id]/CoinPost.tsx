import { ServerRes } from "./models";

async function getData(
  coin: string
): Promise<ServerRes<{ description: string; token_symbol: string }[]>> {
  const data = await fetch(`https://api-test.maxpool.site/coins/pdp/${coin}/`);

  return data.json();
}

export default async function CoinPost({ coin }: { coin: string }) {
  const data = await getData(coin);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: data.message[0].description }}
      className="p-3 bg-white rounded-md"
    ></div>
  );
}
