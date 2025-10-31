import { Bounded } from "@/components/suburbia/Bounded";
import { Heading } from "@/components/suburbia/Heading";
import { createClient } from "@prismicio/client";
import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import React from "react";
import { Skater } from "./Skater";
import { SlideIn } from "@/components/suburbia/SlideIn";

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid = async ({ slice }) => {
  const client = createClient("suburbia");
  const skaters = await client.getAllByType("skater");

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-navy"
    >
      <SlideIn>
        <Heading as="h2" size="lg" className="~mb-4/6 text-center text-white">
          <PrismicText field={slice.primary.heading} />
        </Heading>
      </SlideIn>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {skaters.map((skater, index) => (
          <React.Fragment key={index}>
            {skater.data.first_name && (
              <SlideIn>
                <Skater index={index} skater={skater} />
              </SlideIn>
            )}
          </React.Fragment>
        ))}
      </div>
    </Bounded>
  );
};

export default TeamGrid;
