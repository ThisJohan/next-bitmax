"use client";

import React from "react";
import { CryptoData } from "./models";
import { useStore } from "./state";

export default function MarketStats({ data }: { data: CryptoData }) {
  return (
    <div className="p-3 bg-white rounded-md">
      <h2 className="mb-2">اطلاعات بازار جهانی</h2>

      <ul className="grid grid-cols-2 grid-rows-2 gap-2">
        <li>
          <span>حجم بازار</span>
          <p>{data.market_cap} USDT</p>
        </li>
        <li>
          <span>حجم معاملات</span>
          <p>
            {useStore().currency === "USDT" ? data.volume : data.volume_irt}{" "}
            {useStore().currency}
          </p>
        </li>
        <li>
          <span>پایین ترین قیمت</span>
          <p>
            {useStore().currency === "USDT" ? data.low_price : data.low_price_irt}{" "}
            {useStore().currency}
          </p>
        </li>
        <li>
          <span>بالاترین قیمت</span>
          <p>
            {useStore().currency === "USDT"
              ? data.high_price
              : data.high_price_irt}{" "}
            {useStore().currency}
          </p>
        </li>
      </ul>
    </div>
  );
}
