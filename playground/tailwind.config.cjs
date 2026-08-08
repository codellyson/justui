const { withJustUI } = require("../src/tailwind-preset.cjs");

module.exports = withJustUI({
  content: [`${__dirname.replace(/\\/g, "/")}/**/*.{html,ts,tsx,mdx}`],
});
