"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TokenGroup = "new" | "final" | "migrated";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  prevPrice?: number;
  volume: number;
  change24h?: number;
  group: TokenGroup;
  holders?: number;
  liquidity?: number;
  fdv?: number;
  bonding?: number;
  age?: string;
  image?: string;
}

interface TokenState {
  tokens: Token[];
  loading: boolean;
  error?: string | null;
}

const img = (seed: string) =>
  `https://api.dicebear.com/8.x/shapes/png?seed=${seed}&backgroundType=gradientLinear&radius=20`;

const initialState: TokenState = {
  loading: false,
  error: null,
  tokens: [
    // ---------- NEW PAIRS ----------
    {
      id: "1",
      name: "ZXZK Forge",
      symbol: "ZXZK",
      price: 4.37,
      volume: 920,
      change24h: 10.2,
      group: "new",
      holders: 120,
      liquidity: 2030,
      fdv: 4370,
      bonding: 99.6,
      age: "8s",
      image: img("token1"),
    },
    {
      id: "2",
      name: "NOVA",
      symbol: "NOVA",
      price: 5.84,
      volume: 1020,
      change24h: -2.3,
      group: "new",
      holders: 460,
      liquidity: 2500,
      fdv: 5840,
      bonding: 78.4,
      age: "18s",
      image: img("token2"),
    },
    {
      id: "3",
      name: "INOSHishi",
      symbol: "INOSH",
      price: 8.66,
      volume: 2100,
      change24h: 37.0,
      group: "new",
      holders: 900,
      liquidity: 5000,
      fdv: 8660,
      bonding: 55.3,
      age: "18s",
      image: img("token3"),
    },
    {
      id: "4",
      name: "INSIGHT",
      symbol: "INS",
      price: 3.62,
      volume: 647,
      change24h: 0.0,
      group: "new",
      holders: 140,
      liquidity: 700,
      fdv: 3620,
      bonding: 23.1,
      age: "22s",
      image: img("token4"),
    },

    // ---------- FINAL STRETCH ----------
    {
      id: "5",
      name: "MTXMAX",
      symbol: "MTX",
      price: 1.27,
      volume: 980,
      change24h: -45.0,
      group: "final",
      holders: 220,
      liquidity: 1200,
      fdv: 1270,
      bonding: 69.0,
      age: "1d",
      image: img("token5"),
    },
    {
      id: "6",
      name: "MetaMask Fake",
      symbol: "MMT",
      price: 0.86,
      volume: 2100,
      change24h: -20.0,
      group: "final",
      holders: 444,
      liquidity: 3300,
      fdv: 862000,
      bonding: 24.5,
      age: "10m",
      image: img("token6"),
    },
    {
      id: "7",
      name: "PolyMatrix",
      symbol: "POLY",
      price: 1.35,
      volume: 2800,
      change24h: 20.0,
      group: "final",
      holders: 890,
      liquidity: 4200,
      fdv: 1350000,
      bonding: 12.1,
      age: "3m",
      image: img("token7"),
    },
    {
      id: "8",
      name: "MST",
      symbol: "MST",
      price: 0.60,
      volume: 150,
      change24h: 96.0,
      group: "final",
      holders: 63,
      liquidity: 420,
      fdv: 60100,
      bonding: 96.0,
      age: "2d",
      image: img("token8"),
    },

    // ---------- MIGRATED ----------
    {
      id: "9",
      name: "NVIDIA",
      symbol: "NVDA",
      price: 49.2,
      volume: 12000,
      change24h: 75.0,
      group: "migrated",
      holders: 3600,
      liquidity: 82000,
      fdv: 49200000,
      bonding: 5.0,
      age: "27s",
      image: img("token9"),
    },
    {
      id: "10",
      name: "PTSD Token",
      symbol: "PTSD",
      price: 23.8,
      volume: 1300,
      change24h: 8.0,
      group: "migrated",
      holders: 138,
      liquidity: 23000,
      fdv: 23800,
      bonding: 50.0,
      age: "43s",
      image: img("token10"),
    },
    {
      id: "11",
      name: "bbB",
      symbol: "B",
      price: 56.3,
      volume: 13000,
      change24h: -75.0,
      group: "migrated",
      holders: 440,
      liquidity: 56000,
      fdv: 56300,
      bonding: 9.0,
      age: "50s",
      image: img("token11"),
    },
    {
      id: "12",
      name: "MigrateX",
      symbol: "MGX",
      price: 1.35,
      volume: 37,
      change24h: -2.1,
      group: "migrated",
      holders: 22,
      liquidity: 280,
      fdv: 135,
      bonding: 12.0,
      age: "4m",
      image: img("token12"),
    },
  ],
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    updatePrice: (state, action: PayloadAction<{ id: string; newPrice: number; newVolume?: number }>) => {
      const t = state.tokens.find((x) => x.id === action.payload.id);
      if (!t) return;
      t.prevPrice = t.price;
      t.price = action.payload.newPrice;
      if (action.payload.newVolume !== undefined) t.volume = action.payload.newVolume;
    },
    setTokens(state, action: PayloadAction<Token[]>) {
      state.tokens = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { updatePrice, setTokens, setLoading, setError } = tokenSlice.actions;
export default tokenSlice.reducer;
