import Footer from "./components/footer";
import Header from "./components/header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="w-full h-full">
        <section className="grid grid-cols-1 grid-rows-[max-content_1fr_max-content] w-full h-full">
          <Header></Header>
          <section className="px-auto bg-blue-400 w-full h-full p-4">
            {children}
          </section>
          {/* <Footer></Footer> */}
        </section>
      </body>
    </html>
  );
}
