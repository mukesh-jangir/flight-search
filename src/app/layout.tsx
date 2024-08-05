"use client"

import Header from "./components/header";
import "./globals.css";
import useFlightsState from "./hooks/flights-state";
import { FlightsContext } from "./contexts/flights-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contextValue = useFlightsState();
  return (
    <html lang="en" className="h-full">
      <body className="w-full h-full">
        <section className="grid grid-cols-1 grid-rows-[max-content_1fr_max-content] w-full h-full">
          <Header></Header>
          <FlightsContext.Provider value={contextValue}>
            <section className="px-auto bg-blue-400 w-full h-full p-4">
              {children}
            </section>
          </FlightsContext.Provider>
        </section>
      </body>
    </html>
  );
}
