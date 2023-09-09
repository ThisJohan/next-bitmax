'use client'

import { MarketOverview } from 'react-ts-tradingview-widgets'

export default function TradingView() {
  return (
    <div>
        <MarketOverview height={400} width="100%" showFloatingTooltip ></MarketOverview>
    </div>
  )
}