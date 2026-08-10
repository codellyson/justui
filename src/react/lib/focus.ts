/**
 * One focus treatment per kind of focusable, so a focused element is always
 * visible — including on a row that already carries a selected background.
 */

/** Field-like controls with their own border: inputs, triggers, standalone buttons. */
export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

/** Rows in a list or sidebar. Inset, so it hugs the row instead of boxing it. */
export const focusRingInset =
  "outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent";

/** Inline text links, where a ring would box the words. */
export const focusLink = "outline-none focus-visible:underline focus-visible:text-primary";
