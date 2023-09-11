
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
