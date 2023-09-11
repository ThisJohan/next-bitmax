"use client";

import { useRef } from "react";
import { UseBoundStore } from "zustand";
import { useStore } from "../market/[id]/state";

function StoreInitializer({ data }: { data: any }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState(data);
    initialized.current = true;
  }
  return null;
}

export default StoreInitializer;