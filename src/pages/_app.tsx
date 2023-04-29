import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";

import { CardContextProvider } from "../context/CardContext";
import { InventoryContextProvider } from "../context/InventoryContext";
import { AlertContextProvider } from "../context/AlertContext";
import { ProductContextProvider } from "../context/ProductContext";

const inter = Inter({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProductContextProvider>
      <AlertContextProvider>
        <InventoryContextProvider>
          <CardContextProvider>
            <Component {...pageProps} />
          </CardContextProvider>
        </InventoryContextProvider>
      </AlertContextProvider>
    </ProductContextProvider>
  );
}
