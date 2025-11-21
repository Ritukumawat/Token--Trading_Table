"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import RealTimeProvider from "@/components/RealTimeProvider";
import "./globals.css"; // THIS is correct for App Router

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <RealTimeProvider />
          {children}
        </Provider>
      </body>
    </html>
  );
}
