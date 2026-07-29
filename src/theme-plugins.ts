/**
 * Color values for a single mode (light or dark) within a theme. Each
 * field is a space-separated RGB triplet (e.g. `"22 20 18"`) so it
 * composes with Tailwind's `<alpha-value>`: `rgb(var(--bg) / 0.5)`.
 */
export interface ThemeVariant {
  bg: string;
  bgSecondary: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  /** Text colour on a solid accent fill. */
  accentText: string;
  danger: string;
  success: string;
  warning: string;
}

export interface ThemePlugin {
  id: string;
  label: string;
  description?: string;
  category?: "dev" | "consumer";
  swatch: { light: string; dark: string };
  light: ThemeVariant;
  dark: ThemeVariant;
}

const GITHUB: ThemePlugin = {
  id: "github",
  label: "GitHub",
  description: "GitHub Primer — clean and familiar.",
  swatch: { light: "#ffffff", dark: "#0d1117" },
  light: {
    bg: "255 255 255",
    bgSecondary: "246 248 250",
    border: "208 215 222",
    textPrimary: "31 35 40",
    textSecondary: "89 99 110",
    textMuted: "110 119 129",
    accent: "9 105 218",
    accentHover: "5 80 174",
    accentText: "255 255 255",
    danger: "207 34 46",
    success: "26 127 55",
    warning: "154 103 0",
  },
  dark: {
    bg: "13 17 23",
    bgSecondary: "22 27 34",
    border: "48 54 61",
    textPrimary: "230 237 243",
    textSecondary: "141 150 160",
    textMuted: "110 118 129",
    accent: "47 129 247",
    accentHover: "88 166 255",
    accentText: "13 17 23",
    danger: "248 81 73",
    success: "63 185 80",
    warning: "210 153 34",
  },
};

const ESPRESSO: ThemePlugin = {
  id: "espresso",
  label: "Espresso",
  description: "Warm dark with cream text.",
  swatch: { light: "#f9fafb", dark: "#161412" },
  light: {
    bg: "249 250 251",
    bgSecondary: "243 244 246",
    border: "229 231 235",
    textPrimary: "17 24 39",
    textSecondary: "107 114 128",
    textMuted: "156 163 175",
    accent: "99 102 241",
    accentHover: "79 70 229",
    accentText: "255 255 255",
    danger: "239 68 68",
    success: "34 197 94",
    warning: "234 179 8",
  },
  dark: {
    bg: "22 20 18",
    bgSecondary: "37 33 30",
    border: "56 50 45",
    textPrimary: "232 222 210",
    textSecondary: "178 167 152",
    textMuted: "124 114 102",
    accent: "168 180 220",
    accentHover: "195 205 235",
    accentText: "22 20 18",
    danger: "220 105 95",
    success: "165 195 130",
    warning: "230 195 115",
  },
};

const MOCHA: ThemePlugin = {
  id: "mocha",
  label: "Catppuccin Mocha",
  description: "Cool dark with lavender highlights.",
  swatch: { light: "#eff1f5", dark: "#1e1e2e" },
  light: {
    bg: "239 241 245",
    bgSecondary: "230 233 239",
    border: "220 224 232",
    textPrimary: "76 79 105",
    textSecondary: "92 95 119",
    textMuted: "156 160 176",
    accent: "30 102 245",
    accentHover: "4 165 229",
    accentText: "255 255 255",
    danger: "210 15 57",
    success: "64 160 43",
    warning: "223 142 29",
  },
  dark: {
    bg: "17 17 27",
    bgSecondary: "30 30 46",
    border: "49 50 68",
    textPrimary: "205 214 244",
    textSecondary: "166 173 200",
    textMuted: "127 132 156",
    accent: "137 180 250",
    accentHover: "180 190 254",
    accentText: "17 17 27",
    danger: "243 139 168",
    success: "166 227 161",
    warning: "249 226 175",
  },
};

const GRUVBOX: ThemePlugin = {
  id: "gruvbox",
  label: "Gruvbox",
  description: "Yellow-orange retro warmth.",
  swatch: { light: "#fbf1c7", dark: "#282828" },
  light: {
    bg: "251 241 199",
    bgSecondary: "235 219 178",
    border: "213 196 161",
    textPrimary: "60 56 54",
    textSecondary: "80 73 69",
    textMuted: "124 111 100",
    accent: "175 58 3",
    accentHover: "214 93 14",
    accentText: "251 241 199",
    danger: "157 0 6",
    success: "121 116 14",
    warning: "181 118 20",
  },
  dark: {
    bg: "40 40 40",
    bgSecondary: "60 56 54",
    border: "80 73 69",
    textPrimary: "235 219 178",
    textSecondary: "189 174 147",
    textMuted: "146 131 116",
    accent: "250 189 47",
    accentHover: "254 208 110",
    accentText: "40 40 40",
    danger: "251 73 52",
    success: "184 187 38",
    warning: "250 189 47",
  },
};

const NORD: ThemePlugin = {
  id: "nord",
  label: "Nord",
  description: "Cool arctic slate.",
  swatch: { light: "#eceff4", dark: "#2e3440" },
  light: {
    bg: "236 239 244",
    bgSecondary: "229 233 240",
    border: "216 222 233",
    textPrimary: "46 52 64",
    textSecondary: "76 86 106",
    textMuted: "129 161 193",
    accent: "94 129 172",
    accentHover: "129 161 193",
    accentText: "255 255 255",
    danger: "191 97 106",
    success: "163 190 140",
    warning: "235 203 139",
  },
  dark: {
    bg: "46 52 64",
    bgSecondary: "59 66 82",
    border: "76 86 106",
    textPrimary: "236 239 244",
    textSecondary: "216 222 233",
    textMuted: "129 161 193",
    accent: "136 192 208",
    accentHover: "143 188 187",
    accentText: "46 52 64",
    danger: "191 97 106",
    success: "163 190 140",
    warning: "235 203 139",
  },
};

const SOLARIZED: ThemePlugin = {
  id: "solarized",
  label: "Solarized",
  description: "Ethan Schoonover’s classic.",
  swatch: { light: "#fdf6e3", dark: "#002b36" },
  light: {
    bg: "253 246 227",
    bgSecondary: "238 232 213",
    border: "230 219 184",
    textPrimary: "101 123 131",
    textSecondary: "88 110 117",
    textMuted: "147 161 161",
    accent: "38 139 210",
    accentHover: "108 113 196",
    accentText: "253 246 227",
    danger: "220 50 47",
    success: "133 153 0",
    warning: "181 137 0",
  },
  dark: {
    bg: "0 43 54",
    bgSecondary: "7 54 66",
    border: "34 64 80",
    textPrimary: "147 161 161",
    textSecondary: "131 148 150",
    textMuted: "101 123 131",
    accent: "38 139 210",
    accentHover: "108 113 196",
    accentText: "0 43 54",
    danger: "220 50 47",
    success: "133 153 0",
    warning: "181 137 0",
  },
};

const SUNSET: ThemePlugin = {
  id: "sunset",
  label: "Sunset",
  description: "Warm tangerine — friendly and energetic.",
  category: "consumer",
  swatch: { light: "#fffbf7", dark: "#1a1410" },
  light: {
    bg: "255 251 247",
    bgSecondary: "255 244 236",
    border: "240 226 214",
    textPrimary: "41 32 26",
    textSecondary: "92 76 64",
    textMuted: "150 130 116",
    accent: "234 88 12",
    accentHover: "194 65 12",
    accentText: "255 255 255",
    danger: "220 38 38",
    success: "22 163 74",
    warning: "217 119 6",
  },
  dark: {
    bg: "26 20 16",
    bgSecondary: "38 29 23",
    border: "60 46 37",
    textPrimary: "245 236 228",
    textSecondary: "200 184 172",
    textMuted: "150 130 116",
    accent: "251 146 60",
    accentHover: "253 186 116",
    accentText: "26 20 16",
    danger: "248 113 113",
    success: "74 222 128",
    warning: "251 191 36",
  },
};

const OCEAN: ThemePlugin = {
  id: "ocean",
  label: "Ocean",
  description: "Fresh teal — calm and trustworthy.",
  category: "consumer",
  swatch: { light: "#f7fbfd", dark: "#0c161a" },
  light: {
    bg: "247 251 253",
    bgSecondary: "236 246 250",
    border: "210 230 238",
    textPrimary: "15 34 42",
    textSecondary: "51 78 88",
    textMuted: "120 148 158",
    accent: "13 148 136",
    accentHover: "15 118 110",
    accentText: "255 255 255",
    danger: "220 38 38",
    success: "22 163 74",
    warning: "217 119 6",
  },
  dark: {
    bg: "12 22 26",
    bgSecondary: "18 32 38",
    border: "34 54 62",
    textPrimary: "224 240 244",
    textSecondary: "168 196 204",
    textMuted: "110 140 150",
    accent: "45 212 191",
    accentHover: "94 234 212",
    accentText: "12 22 26",
    danger: "248 113 113",
    success: "74 222 128",
    warning: "251 191 36",
  },
};

const BLOOM: ThemePlugin = {
  id: "bloom",
  label: "Bloom",
  description: "Soft rose — playful and personal.",
  category: "consumer",
  swatch: { light: "#fffafc", dark: "#1a1216" },
  light: {
    bg: "255 250 252",
    bgSecondary: "253 242 248",
    border: "245 218 232",
    textPrimary: "44 26 36",
    textSecondary: "96 66 80",
    textMuted: "156 122 138",
    accent: "219 39 119",
    accentHover: "190 24 93",
    accentText: "255 255 255",
    danger: "220 38 38",
    success: "22 163 74",
    warning: "217 119 6",
  },
  dark: {
    bg: "26 18 22",
    bgSecondary: "38 26 32",
    border: "60 40 50",
    textPrimary: "246 230 238",
    textSecondary: "208 178 192",
    textMuted: "158 124 140",
    accent: "244 114 182",
    accentHover: "249 168 212",
    accentText: "26 18 22",
    danger: "248 113 113",
    success: "74 222 128",
    warning: "251 191 36",
  },
};

const MEADOW: ThemePlugin = {
  id: "meadow",
  label: "Meadow",
  description: "Natural green — wholesome and clean.",
  category: "consumer",
  swatch: { light: "#f8fcf8", dark: "#101812" },
  light: {
    bg: "248 252 248",
    bgSecondary: "240 248 240",
    border: "214 234 216",
    textPrimary: "24 38 28",
    textSecondary: "62 84 68",
    textMuted: "124 150 130",
    accent: "22 163 74",
    accentHover: "21 128 61",
    accentText: "255 255 255",
    danger: "220 38 38",
    success: "22 163 74",
    warning: "217 119 6",
  },
  dark: {
    bg: "16 24 18",
    bgSecondary: "24 34 26",
    border: "40 56 44",
    textPrimary: "230 244 232",
    textSecondary: "180 204 186",
    textMuted: "120 148 126",
    accent: "74 222 128",
    accentHover: "134 239 172",
    accentText: "16 24 18",
    danger: "248 113 113",
    success: "74 222 128",
    warning: "251 191 36",
  },
};

const GRAPE: ThemePlugin = {
  id: "grape",
  label: "Grape",
  description: "Vivid violet — modern and bold.",
  category: "consumer",
  swatch: { light: "#faf9ff", dark: "#14121c" },
  light: {
    bg: "250 249 255",
    bgSecondary: "244 242 253",
    border: "224 219 245",
    textPrimary: "34 28 46",
    textSecondary: "78 70 100",
    textMuted: "138 130 160",
    accent: "124 58 237",
    accentHover: "109 40 217",
    accentText: "255 255 255",
    danger: "220 38 38",
    success: "22 163 74",
    warning: "217 119 6",
  },
  dark: {
    bg: "20 18 28",
    bgSecondary: "30 26 42",
    border: "48 42 66",
    textPrimary: "236 232 246",
    textSecondary: "194 186 214",
    textMuted: "140 132 160",
    accent: "167 139 250",
    accentHover: "196 181 253",
    accentText: "20 18 28",
    danger: "248 113 113",
    success: "74 222 128",
    warning: "251 191 36",
  },
};

const MONO: ThemePlugin = {
  id: "mono",
  label: "Mono",
  description: "Refined monochrome — minimal and elegant.",
  category: "consumer",
  swatch: { light: "#ffffff", dark: "#111110" },
  light: {
    bg: "255 255 255",
    bgSecondary: "246 246 245",
    border: "226 226 224",
    textPrimary: "24 24 23",
    textSecondary: "82 82 80",
    textMuted: "148 148 145",
    accent: "24 24 23",
    accentHover: "60 60 58",
    accentText: "255 255 255",
    danger: "220 38 38",
    success: "22 163 74",
    warning: "217 119 6",
  },
  dark: {
    bg: "17 17 16",
    bgSecondary: "28 28 27",
    border: "48 48 46",
    textPrimary: "245 245 244",
    textSecondary: "190 190 188",
    textMuted: "130 130 128",
    accent: "245 245 244",
    accentHover: "214 214 212",
    accentText: "17 17 16",
    danger: "248 113 113",
    success: "74 222 128",
    warning: "251 191 36",
  },
};

export const BUILT_IN_THEMES: readonly ThemePlugin[] = [
  GITHUB,
  ESPRESSO,
  MOCHA,
  GRUVBOX,
  NORD,
  SOLARIZED,
];

export const CONSUMER_THEMES: readonly ThemePlugin[] = [
  SUNSET,
  OCEAN,
  BLOOM,
  MEADOW,
  GRAPE,
  MONO,
];

export const ALL_THEMES: readonly ThemePlugin[] = [...BUILT_IN_THEMES, ...CONSUMER_THEMES];

export const DEFAULT_THEME_ID = "espresso";

/** Maps each ThemeVariant key to the CSS custom property it writes to. */
export const VAR_MAP: Readonly<Record<keyof ThemeVariant, string>> = {
  bg: "--bg",
  bgSecondary: "--bg-secondary",
  border: "--border",
  textPrimary: "--text-primary",
  textSecondary: "--text-secondary",
  textMuted: "--text-muted",
  accent: "--accent",
  accentHover: "--accent-hover",
  accentText: "--accent-text",
  danger: "--danger",
  success: "--success",
  warning: "--warning",
};
