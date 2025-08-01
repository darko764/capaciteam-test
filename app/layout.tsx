import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeRegistry from '../components/ThemeRegistry';
import { FavouritesProvider } from '../contexts/FavouritesContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Irish Bills Explorer",
  description: "Test Assignment by Darko Vasic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeRegistry>
          <FavouritesProvider>
            {children}
          </FavouritesProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
