import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

import { Bounded } from "@/app/Section_62/component/Bounded";
import { Heading } from "@/app/Section_62/component/Heading";
import { SlideIn } from "@/app/Section_62/component/SlideIn";
import { SkateboardProduct } from "./SkateboardProduct";

/**
 * Component for "ProductGrid" Slices.
 */
const ProductGrid = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-gray"
    >
      <SlideIn>
        <Heading className="text-center ~mb-4/6 font-bold ~text-2xl/4xl" as="h2">
          <PrismicText field={slice.primary.heading} />
        </Heading>
      </SlideIn>
      <SlideIn>
        <div className="text-center ~mb-6/10 font-semibold ~text-lg/xl">
          <PrismicRichText field={slice.primary.body} />
        </div>
      </SlideIn>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {slice.primary.product.map(
          ({ skateboard }) =>
            isFilled.contentRelationship(skateboard) && (
              <SkateboardProduct key={skateboard.id} id={skateboard.id} />
            )
        )}
      </div>
    </Bounded>
  );
};

export default ProductGrid;
