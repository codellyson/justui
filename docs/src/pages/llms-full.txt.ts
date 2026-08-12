import type { APIRoute } from "astro";
import { SETUP, SUMMARY, TITLE, llmsPages, url } from "../lib/llms";

// Every page in one file, for a model that would rather not fetch 51 URLs.
export const GET: APIRoute = async ({ site }) => {
  const pages = await llmsPages();

  const body = [
    `# ${TITLE}`,
    "",
    `> ${SUMMARY}`,
    "",
    SETUP,
    "",
    ...pages.flatMap((page) => [
      "---",
      "",
      `# ${page.title}`,
      "",
      ...(page.description ? [`> ${page.description}`, ""] : []),
      `Source: ${url(site, page.path)}`,
      "",
      page.body,
      "",
    ]),
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
