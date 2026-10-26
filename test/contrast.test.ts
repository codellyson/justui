import { test } from "node:test";
import assert from "node:assert/strict";
import { ALL_THEMES } from "../src/theme-plugins.ts";

const parse = (s: string) => s.split(" ").map(Number);
const lum = (c: number[]) => {
  const [r, g, b] = c.map((v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: number[], b: number[]) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// Every text token must be readable (WCAG AA, 4.5:1) on both page backgrounds, in every theme.
for (const theme of ALL_THEMES) {
  for (const mode of ["light", "dark"] as const) {
    test(`${theme.id} ${mode} text meets 4.5:1`, () => {
      const v = theme[mode];
      for (const key of ["textPrimary", "textSecondary", "textMuted"] as const) {
        for (const bg of ["bg", "bgSecondary"] as const) {
          const r = ratio(parse(v[key]), parse(v[bg]));
          assert.ok(r >= 4.5, `${key} on ${bg} is ${r.toFixed(2)}:1`);
        }
      }
    });
  }
}
