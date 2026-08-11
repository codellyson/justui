export const HEX = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

export const isHex = (raw: string) => HEX.test(raw.trim());

export const normaliseHex = (raw: string) => {
  const hex = raw.startsWith("#") ? raw : `#${raw}`;
  if (hex.length !== 4) return hex.toLowerCase();
  // #abc -> #aabbcc, since <input type="color"> only accepts the long form.
  const [, r, g, b] = hex;
  return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
};

export const DEFAULT_SWATCHES = [
  "#0f172a",
  "#64748b",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

export const DEFAULT_PRESET_COLORS = [
  "#0f172a",
  "#334155",
  "#64748b",
  "#94a3b8",
  "#cbd5e1",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#a2845e",
  "#78716c",
];
