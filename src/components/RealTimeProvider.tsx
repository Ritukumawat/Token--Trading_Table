"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startPriceFeed } from "@/lib/mockSocket";
import { updatePrice } from "@/store/tokenSlice";

export default function RealTimeProvider() {
  const dispatch = useDispatch();

  useEffect(() => {
    // start feed, dispatch updates
    const stop = startPriceFeed((id, price, volume) => {
      dispatch(updatePrice({ id, newPrice: price, newVolume: volume }));
    });

    return () => stop();
  }, [dispatch]);

  return null;
}
