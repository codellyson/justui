import type { APIRoute } from "astro";
import { SETUP, SUMMARY, TITLE, llmsPages, url } from "../lib/llms";

// The llmstxt.org convention: an H1, a blockquote summary, then link sections.
export const GET: APIRoute = async ({ site }) => {
  const pages = await llmsPages();
  const groups = [...new Set(pages.map((p) => p.group))];

  const body = [
    `# ${TITLE}`,
    "",
    `> ${SUMMARY}`,
    "",
    SETUP,
    "",
    ...groups.flatMap((group) => [
      `## ${group}`,
      "",
      ...pages
        .filter((p) => p.group === group)
        .map((p) => `- [${p.title}](${url(site, p.path)})${p.description ? `: ${p.description}` : ""}`),
      "",
    ]),
    "## Optional",
    "",
    `- [Every page as one file](${url(site, "/llms-full.txt")}): the full documentation, including each component's props and examples.`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
