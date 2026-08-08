import type { Config } from "tailwindcss";

declare const preset: Partial<Config> & {
  /** Absolute globs covering JustUI's own shipped files. */
  content: string[];
  /** Applies the preset and prepends JustUI's globs to your `content`. */
  withJustUI(config?: Partial<Config>): Config;
};

export = preset;
