import { Bowlby_One_SC, DM_Mono } from "next/font/google";

const bowlby = Bowlby_One_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bowlby-sc",
  weight: "400",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
  weight: "500",
});

export default function Layout({ children }) {
  return (
    <div className={`${bowlby.variable} ${dmMono.variable}`}>
      {children}
    </div>
  );
}
