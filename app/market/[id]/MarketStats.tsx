import React from 'react'
import { CryptoData } from './page'

export default function MarketStats({data}: {data: CryptoData}) {
  return (
    <div className='p-3 bg-white rounded-md'>
      <h2 className='mb-2'>اطلاعات بازار جهانی</h2>

      <ul className="grid grid-cols-2 grid-rows-2 gap-2">
        <li>
          <span>حجم بازار</span>
          <p>{data.volume} USDT</p>
        </li>
        <li>
          <span>حجم معاملات</span>
          <p>{data.market_cap} IRT</p>
        </li>
        <li>
          <span>پایین ترین قیمت</span>
          <p>{data.low_price_irt} IRT</p>
        </li>
        <li>
          <span>بالاترین قیمت</span>
          <p>{data.high_price_irt} IRT</p>
        </li>
      </ul>
    </div>
  )
}
