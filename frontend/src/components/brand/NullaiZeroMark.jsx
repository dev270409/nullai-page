import React, { useId } from "react";

/**
 * Official NULLAI `0` logomark.
 *
 * Tall-ellipse ring with thicker crescents at top/bottom, thinner sides,
 * and a subtle counter-clockwise rotation of the inner cut that produces
 * the signature diagonal weight shift of the brand mark.
 *
 * Pure SVG — scales crisply at any size, inherits color via `currentColor`,
 * and uses a unique mask id per instance so multiple copies on the same page
 * never collide.
 */
export default function NullaiZeroMark({
  size,
  color = "currentColor",
  className = "",
  style = {},
  title = "NULLAI",
  decorative = false,
  ...rest
}) {
  const uid = useId();
  const maskId = `nullai-zero-mask-${uid.replace(/[:]/g, "")}`;

  const ariaProps = decorative
    ? { "aria-hidden": true, role: "presentation" }
    : { role: "img", "aria-label": title };

  // Sizing: callers can pass `size` (number → px width) or rely on CSS via
  // `style.width / className`. SVG viewBox keeps the 5:8 (200×320) aspect.
  const sizeProps =
    typeof size === "number"
      ? { width: size, height: Math.round(size * (320 / 200)) }
      : {};

  return (
    <svg
      viewBox="0 0 200 320"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={style}
      {...sizeProps}
      {...ariaProps}
      {...rest}
    >
      {!decorative && <title>{title}</title>}
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="200" height="320" fill="white" />
          {/* Inner ellipse cut, rotated -5° around the centre to produce
              the brand's diagonal weight shift. */}
          <ellipse
            cx="100"
            cy="160"
            rx="78"
            ry="128"
            fill="black"
            transform="rotate(-5 100 160)"
          />
        </mask>
      </defs>
      <ellipse
        cx="100"
        cy="160"
        rx="96"
        ry="156"
        fill={color}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
