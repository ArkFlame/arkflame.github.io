import { getCollection } from "astro:content";
import { CATEGORIES } from "@/data/categories";
import { CATEGORY_SLUGS, PRODUCTS } from "@/data/products";
import { HERO, SITE } from "@/data/site";

/** Build-time index for LLM crawlers, in the llmstxt.org format. */
export async function GET() {
  const abs = (path: string) => new URL(path, SITE.siteUrl).href;
  const docEntries = (await getCollection("docs")).sort((a, b) => a.data.title.localeCompare(b.data.title));
  const guideEntries = (await getCollection("guides")).sort((a, b) => a.data.title.localeCompare(b.data.title));

  const lines: string[] = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.brandLine} ${HERO.body}`,
    "",
    "ArkFlame Studios publishes Minecraft server plugins for Bukkit, Spigot, Paper, Folia, BungeeCord and Velocity servers. Products are grouped into security, performance, network, gameplay and SMP categories. Documentation covers selected plugins. Guides cover setup tasks across several products.",
    "",
    `Full text of every guide and doc: ${abs("/llms-full.txt")}`,
    "",
    "## Categories",
    "",
    ...CATEGORY_SLUGS.map((slug) => {
      const category = CATEGORIES.find((item) => item.slug === slug);
      if (category === undefined) throw new Error(`llms.txt: no category info for "${slug}"`);
      return `- [${category.name}](${abs(`/plugins/${category.slug}/`)}): ${category.intro}`;
    }),
    "",
    "## Products",
    "",
    ...CATEGORY_SLUGS.flatMap((slug) => {
      const category = CATEGORIES.find((item) => item.slug === slug);
      const products = PRODUCTS.filter((product) => product.category === slug);
      return [
        "",
        `### ${category?.name ?? slug}`,
        "",
        ...products.map((product) => `- [${product.name}](${abs(`/plugins/${product.slug}/`)}): ${product.summary}`),
      ];
    }),
    "",
    "## Documentation",
    "",
    ...docEntries.map((entry) => `- [${entry.data.title}](${abs(`/docs/${entry.id}/`)}): ${entry.data.description}`),
    "",
    "## Guides",
    "",
    ...guideEntries.map((entry) => `- [${entry.data.title}](${abs(`/guides/${entry.id}/`)}): ${entry.data.description}`),
    "",
    "## Optional",
    "",
    `- [About](${abs("/about/")}): ArkFlame Studios and its founder.`,
    `- [Documentation index](${abs("/docs/")}): All plugin docs.`,
    `- [Guides index](${abs("/guides/")}): All technical guides.`,
    `- [Full text](${abs("/llms-full.txt")}): Every guide and doc in one file.`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
