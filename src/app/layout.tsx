import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
});

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "結婚式コメントウォール",
  description: "結婚式の余興用LINE風コメントウォール - お祝いのメッセージをリアルタイムで共有",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`antialiased ${notoSerif.variable} ${notoSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
