import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lockie",
  description: "CryptoDevsDAO for holder of CryptoDevs NFTs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
