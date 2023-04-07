import { Inter } from "next/font/google";
import RootLayout from "./layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
      <main className="h-[2000px]">
        <h1>shirin blog</h1>
      </main>
  );
}
