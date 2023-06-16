import Navbar from "./components/Navbar";
import Provider from "./components/Provider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Streaks",
  description: "Build good habits",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div id="modal"></div>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
