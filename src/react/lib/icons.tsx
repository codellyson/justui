"use client";

import type { SVGProps } from "react";

export {
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ClockIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  PlusIcon,
  SwatchIcon,
  XMarkIcon as XIcon,
} from "@heroicons/react/16/solid";

// Heroicons has no filled dot, and the radio indicator needs one.
export const DotIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
    <circle cx="8" cy="8" r="4" />
  </svg>
);
