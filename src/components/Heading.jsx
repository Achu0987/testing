import clsx from "clsx";

export function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
}) {
  return (
    <Comp
      className={clsx(
        "font-sans uppercase",
        size === "xl" && "~text-4xl/8xl",
        size === "lg" && "~text-4xl/7xl",
        size === "md" && "~text-3xl/5xl",
        size === "sm" && "~text-2xl/4xl",
        size === "xs" && "~text-lg/xl",
        className
      )}
    >
      {children}
    </Comp>
  );
}