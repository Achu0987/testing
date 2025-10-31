import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "../../prismicio";
import { components } from "./slices";
import localFont from "next/font/local";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../../prismicio";
import Header from "./component/Header";
import ViewCanvas from "./component/ViewCanvas";
import Footer from "./component/Footer";

const alpino = localFont({
  src: "../../../public/fonts/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino"
});

// This component renders the Fizzi homepage content inside the testing app
export async function generateMetadata() {
  const client = createClient();
  const home = await client.getByUID("page", "home");
  return {
    title: prismic.asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{
        url: home.data.meta_image.url ?? ""
      }]
    }
  };
}

export default async function Section_60() {
  // The client queries content from the Prismic API
  const client = createClient();
  const home = await client.getByUID("page", "home");
  return <div className={alpino.variable + " bg-yellow-300 overflow-x-hidden"}>
      <Header />
      <main>
        <SliceZone slices={home.data.slices} components={components} />
        <ViewCanvas />
      </main>
      <Footer />
      <PrismicPreview repositoryName={repositoryName} />
    </div>;
}