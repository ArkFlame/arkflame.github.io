/**
 * Shared JSON-LD builders. Every page emits one @graph that starts with the
 * site-wide Organization and WebSite nodes, so cross-references by @id resolve
 * within the page. Nodes only carry data from site.ts, products.ts and
 * store-stats.ts; a missing source field omits the property.
 */
import { SITE } from "./site";
import { getProduct, type Product } from "./products";
import { STORE_STATS } from "./store-stats";

export type SchemaNode = Record<string, unknown>;

export const ORG_ID = `${SITE.siteUrl}/#organization`;
export const WEBSITE_ID = `${SITE.siteUrl}/#website`;

export const absUrl = (path: string): string => new URL(path, SITE.siteUrl).href;

const ORG_SAME_AS_PRODUCTS = ["exploitfixer", "fairplay", "flamecord", "veloflame"] as const;

function siteNodes(): SchemaNode[] {
  const productSites = ORG_SAME_AS_PRODUCTS.map((slug) => getProduct(slug)?.officialUrl);
  return [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      url: absUrl("/"),
      logo: absUrl(SITE.logo),
      image: absUrl(SITE.ogImage),
      description:
        "ArkFlame Studios builds Minecraft server software for security, performance, proxies, anticheat and SMP gameplay.",
      founder: { "@type": "Person", name: SITE.founderName, url: SITE.founderUrl },
      sameAs: [SITE.githubUrl, SITE.builtByBitUrl, SITE.discordUrl, SITE.founderUrl, ...productSites].filter(
        (url): url is string => url !== undefined,
      ),
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE.name,
      url: absUrl("/"),
      publisher: { "@id": ORG_ID },
      inLanguage: "en-US",
    },
  ];
}

/** Reference to the site Organization, for publisher/author fields. */
export const orgRef = { "@id": ORG_ID } as const;

export interface Crumb {
  name: string;
  url: string;
}

/** BreadcrumbList with Home prepended. `trail` URLs must be absolute. */
export function breadcrumb(id: string, trail: readonly Crumb[]): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      ...trail.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: crumb.name,
        item: crumb.url,
      })),
    ],
  };
}

/** ItemList of absolute URLs, in display order. */
export function itemList(id: string, items: readonly Crumb[]): SchemaNode {
  return {
    "@type": "ItemList",
    "@id": id,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

/** CollectionPage, AboutPage, WebPage and similar, linked to the site and optional breadcrumb. */
export function webPage(
  type: "CollectionPage" | "AboutPage" | "WebPage",
  id: string,
  name: string,
  url: string,
  description: string,
  extra: SchemaNode = {},
): SchemaNode {
  return {
    "@type": type,
    "@id": id,
    name,
    url,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    ...extra,
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqPage(id: string, items: readonly FaqItem[]): SchemaNode {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Full SoftwareApplication node for a product. The @id is `<product url>#software`. */
export function softwareApplication(product: Product): SchemaNode {
  const url = absUrl(`/plugins/${product.slug}/`);
  const stat = STORE_STATS[product.slug];
  const offers =
    stat?.price === undefined
      ? undefined
      : {
          "@type": "Offer",
          price: stat.price.toFixed(2),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: product.storeUrl,
        };
  return {
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: product.name,
    url,
    description: product.summary,
    image: absUrl(product.image ?? SITE.ogImage),
    keywords: product.tags.join(", "),
    applicationCategory: "GameApplication",
    operatingSystem: "Java",
    publisher: orgRef,
    isPartOf: { "@id": WEBSITE_ID },
    ...(offers === undefined ? {} : { offers }),
  };
}

/** Short reference to a product's SoftwareApplication node, for use inside other pages' nodes. */
export function softwareRef(product: Product): SchemaNode {
  const url = absUrl(`/plugins/${product.slug}/`);
  return { "@type": "SoftwareApplication", "@id": `${url}#software`, name: product.name, url };
}

export interface ArticleInput {
  type: "Article" | "TechArticle";
  url: string;
  headline: string;
  description: string;
  dateModified: Date;
  author: SchemaNode;
  image?: string;
  about?: SchemaNode;
}

/** Article or TechArticle for guides and docs. datePublished is omitted: the content schema has no publish date. */
export function article(input: ArticleInput): SchemaNode {
  return {
    "@type": input.type,
    "@id": `${input.url}#article`,
    headline: input.headline,
    description: input.description,
    url: input.url,
    mainEntityOfPage: input.url,
    dateModified: input.dateModified.toISOString(),
    image: absUrl(input.image ?? SITE.ogImage),
    inLanguage: "en-US",
    author: input.author,
    publisher: orgRef,
    isPartOf: { "@id": WEBSITE_ID },
    ...(input.about === undefined ? {} : { about: input.about }),
  };
}

/** Wraps nodes in one @graph, prefixed by the site Organization and WebSite. */
export function graph(...nodes: (SchemaNode | undefined)[]): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@graph": [...siteNodes(), ...nodes.filter((node): node is SchemaNode => node !== undefined)],
  };
}
