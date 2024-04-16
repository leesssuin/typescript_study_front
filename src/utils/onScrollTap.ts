export const onScrollTab = (ref: HTMLElement | null) => {
  ref?.scrollIntoView({ behavior: "smooth" });
};
