import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx";

import { Bounded } from "@/app/Section_62/component/Bounded";
import { ButtonLink } from "@/app/Section_62/component/ButtonLink";
import { Heading } from "@/app/Section_62/component/Heading";
import { SlideIn } from "@/app/Section_62/component/SlideIn";
import { ParallaxImage } from "./ParallaxImage";

/**
 * Component for "TextAndImage" Slices.
 */
const TextAndImage = ({ slice, index }) => {
  const theme = slice.primary.theme;
  const isFirst = index === 0;
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        // base sticky position
        "sticky top-[calc(var(--index)*2rem)]",
        // keep existing theme classes (if any) so this slice remains flexible
        theme === "Blue" && "bg-texture bg-blue-500 text-white",
        theme === "Orange" && "bg-texture bg-orange-500 text-white",
        theme === "Navy" && "bg-texture bg-blue-900 text-white",
        theme === "Lime" && "bg-texture bg-lime-400",
        // first slice: full-bleed textured white hero (matches uploaded design)
        isFirst && "bg-texture bg-brand-pink text-black relative overflow-hidden min-h-[68vh] md:min-h-screen"
      )}
      style={{ "--index": index }}
    >
      <div
        className={clsx(
          "grid grid-cols-1 gap-12 text-left",
          "md:grid-cols-2 md:gap-24",
          // hero: content starts near top so heading sits higher on the page
          isFirst ? "items-start" : "items-center"
        )}
      >
        <div
          className={clsx(
            // hero: small centered heading near the top; body centered below
            "flex flex-col gap-8 text-left",
            isFirst
              ? "items-left text-left pt-12 md:pt-20 px-6"
              : "items-left justify-start text-left md:items-start md:text-left",
            slice.variation === "imageOnLeft" && "md:order-2"
          )}
        >
          <SlideIn>
            <Heading size={isFirst ? "md" : "lg"} as="h2" className={clsx(isFirst && "max-w-3xl leading-tight tracking-tight") }>
              <PrismicText field={slice.primary.heading} />
            </Heading>
          </SlideIn>
          <SlideIn>
            <div className={clsx("text-lg leading-relaxed", isFirst ? "max-w-2xl mx-auto md:mx-0" : "max-w-md mx-auto md:mx-0") }>
              <PrismicRichText field={slice.primary.body} />
            </div>
          </SlideIn>
          {!isFirst && (
            <SlideIn>
              <ButtonLink
                field={slice.primary.button}
                color={theme === "Lime" ? "orange" : "lime"}
              >
                {slice.primary.button.text}
              </ButtonLink>
            </SlideIn>
          )}
        </div>

        <ParallaxImage
          foregroundImage={slice.primary.foreground_image}
          backgroundImage={slice.primary.background_image}
          className={clsx(isFirst ? "hero justify-center" : "")}
        />
      </div>
    </Bounded>
  );
};

export default TextAndImage;
