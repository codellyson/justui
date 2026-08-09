"use client";

import type { ImgHTMLAttributes } from "react";
import { cn } from "./cn.js";

export interface FlagProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> {
  code: string;
}

export const flagUrl = (code: string, size: "20x15" | "40x30" | "60x45" | "80x60") =>
  `https://flagcdn.com/${size}/${code.toLowerCase()}.png`;

export function Flag({ code, className, alt = "", ...props }: FlagProps) {
  return (
    <img
      src={flagUrl(code, "20x15")}
      srcSet={`${flagUrl(code, "40x30")} 2x, ${flagUrl(code, "60x45")} 3x`}
      width={20}
      height={15}
      loading="lazy"
      decoding="async"
      alt={alt}
      data-justui="flag"
      className={cn("shrink-0 rounded-[2px] object-cover", className)}
      {...props}
    />
  );
}
