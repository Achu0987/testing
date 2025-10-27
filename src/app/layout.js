// app/layout.js
import localFont from "next/font/local";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../prismicio";
import './globals.css';
import Sidebar from './Sidebar';
import Header from '../components/Header';
import ViewCanvas from '../components/ViewCanvas';
import Footer from '../components/Footer';

const alpino = localFont({
  src: "../../public/fonts/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino"
});

export const metadata = {
  title: 'My App',
  description: 'A Next.js app with a sidebar layout',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={alpino.variable}>
      <body className="overflow-x-hidden bg-yellow-300">
        <Sidebar />
        <Header />
        <main>
          {children}
          <ViewCanvas />
        </main>
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}