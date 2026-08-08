// The preset names Geist but doesn't ship it — consumers install it themselves,
// so the gallery has to as well or it renders in the system fallback.
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";

import { ALL_THEMES, bootTheme } from "@codellyson/justui";
import { createRoot } from "react-dom/client";
import { App } from "./App.js";
import "./styles.css";

// Before render, same as a real host app — otherwise the first paint flashes
// the tokens.css fallback.
bootTheme({ keyPrefix: "justui-gallery", themes: ALL_THEMES });

createRoot(document.getElementById("root")!).render(<App />);
