import { getCollection } from "astro:content";
import { SITE } from "@/data/site";

/** Build-time plain text of every guide and doc, for LLM crawlers. */
export async function GET() {
  const abs = (path: string) => new URL(path, SITE.siteUrl).href;
  const guides = (await getCollection("guides")).sort((a, b) => a.data.title.localeCompare(b.data.title));
  const docs = (await getCollection("docs")).sort((a, b) => a.data.title.localeCompare(b.data.title));

  const sections = [
    `# ${SITE.name}: full text`,
    "",
    `Source: ${abs("/")}. Guides and docs are Markdown. Each section names its page URL.`,
    "",
    ...guides.map((entry) =>
      [
        "---",
        `# ${entry.data.title}`,
        "",
        `URL: ${abs(`/guides/${entry.id}/`)}`,
        `Updated: ${entry.data.updated.toISOString().slice(0, 10)}`,
        "",
        entry.body?.trim() ?? "",
        "",
      ].join("\n"),
    ),
    ...docs.map((entry) =>
      [
        "---",
        `# ${entry.data.title}`,
        "",
        `URL: ${abs(`/docs/${entry.id}/`)}`,
        `Updated: ${entry.data.updated.toISOString().slice(0, 10)}`,
        "",
        entry.body?.trim() ?? "",
        "",
      ].join("\n"),
    ),
  ];

  return new Response(sections.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
