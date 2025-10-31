import { SliceZone } from "@prismicio/react";

import { createClient } from "@prismicio/client";
import { components } from "@/slices_suburbia";
import { Footer } from "@/components/suburbia/Footer";

const client = createClient("suburbia", {
  routes: [{
    type: "homepage",
    path: "/",
    uid: "home"
  }, {
    type: "homepage",
    path: "/:uid"
  }]
});

export default async function Page() {
  let page;
  try {
    page = await client.getSingle("homepage");
  } catch (error) {
    console.error("Error fetching homepage:", error);
    // Fallback: return empty page or error message
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Section 61</h1>
          <p className="text-gray-600">Unable to load content from Prismic. Please check your connection and repository access.</p>
          <p className="text-sm text-gray-500 mt-2">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  const slices = bundleTextAndImageSlices(page.data.slices);

  return (
    <>
      <SliceZone
        slices={slices}
        components={{
          ...components,
          text_and_image_bundle: ({ slice }) => (
            <div>
              <SliceZone slices={slice.slices} components={components} />
            </div>
          ),
        }}
      />
      <Footer />
    </>
  );
}

export async function generateMetadata() {
  const page = await client.getSingle("homepage");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

function bundleTextAndImageSlices(slices) {
  const res = [];

  for (const slice of slices) {
    if (slice.slice_type !== "text_and_image") {
      res.push(slice);
      continue;
    }

    const bundle = res.at(-1);
    if (bundle?.slice_type === "text_and_image_bundle") {
      bundle.slices.push(slice);
    } else {
      res.push({
        id: `${slice.id}-bundle`,
        slice_type: "text_and_image_bundle",
        slices: [slice],
      });
    }
  }
  return res;
}