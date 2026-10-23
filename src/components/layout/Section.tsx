import type { HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  spacing?: boolean;
};

export function Section({
  className = "",
  spacing = true,
  ...props
}: SectionProps) {
  const spacingClass = spacing ? "section-spacing" : "";

  return (
    <section
      className={`${spacingClass} ${className}`.trim()}
      {...props}
    />
  );
}
