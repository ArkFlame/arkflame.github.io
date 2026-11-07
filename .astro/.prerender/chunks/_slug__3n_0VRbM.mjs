import { c as SITE, d as __exportAll, t as $$BaseLayout, u as createComponent } from "./BaseLayout_5XlJqx1o.mjs";
import { O as createAstro, c as renderComponent, g as maybeRenderHead, h as renderTemplate, v as addAttribute } from "./server_C1-8vluA.mjs";
import { n as getEntry, r as render, t as getCollection } from "./_astro_content_Bdqfz2bL.mjs";
import { t as $$ArticleLayout } from "./ArticleLayout_Ady5G77B.mjs";
import { n as getProduct } from "./products_DHgwqqLo.mjs";
//#region src/pages/guides/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://arkflame.com");
async function getStaticPaths() {
	return (await getCollection("guides")).map((entry) => ({
		params: { slug: entry.id },
		props: { slug: entry.id }
	}));
}
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.props;
	const entry = await getEntry("guides", slug);
	if (entry === void 0) throw new Error(`guides/[slug]: no entry for "${slug}"`);
	const { Content, headings } = await render(entry);
	const related = entry.data.relatedPlugins.map((pluginSlug) => getProduct(pluginSlug)).filter((product) => product !== void 0);
	const docs = (await getCollection("docs")).filter((doc) => entry.data.relatedPlugins.includes(doc.data.plugin));
	const path = `/guides/${entry.id}/`;
	const url = `${SITE.siteUrl}${path}`;
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "Article",
			"@id": `${url}#article`,
			headline: entry.data.title,
			description: entry.data.description,
			url,
			mainEntityOfPage: url,
			dateModified: entry.data.updated.toISOString(),
			inLanguage: "en-US",
			author: {
				"@type": "Person",
				name: entry.data.author
			},
			publisher: { "@id": `${SITE.siteUrl}/#organization` },
			isPartOf: { "@id": `${SITE.siteUrl}/#website` }
		}, {
			"@type": "BreadcrumbList",
			"@id": `${url}#breadcrumb`,
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: `${SITE.siteUrl}/`
				},
				{
					"@type": "ListItem",
					position: 2,
					name: "Guides",
					item: `${SITE.siteUrl}/guides/`
				},
				{
					"@type": "ListItem",
					position: 3,
					name: entry.data.title,
					item: url
				}
			]
		}]
	};
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": `${entry.data.title} | ArkFlame Guides`,
		"description": entry.data.description,
		"canonicalPath": path,
		"ogType": "article",
		"jsonLd": jsonLd,
		"data-astro-cid-xmaeph5b": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "ArticleLayout", $$ArticleLayout, {
		"eyebrow": "Technical guide",
		"title": entry.data.title,
		"description": entry.data.description,
		"updated": entry.data.updated,
		"author": entry.data.author,
		"headings": headings,
		"backHref": "/guides/",
		"backLabel": "Guides",
		"sectionLabel": entry.data.topics[0] ?? "Guide",
		"drawerLabel": "Products and contents",
		"data-astro-cid-xmaeph5b": true
	}, {
		"default": ($$result) => renderTemplate`${renderComponent($$result, "Content", Content, { "data-astro-cid-xmaeph5b": true })}`,
		"sidebar": ($$result) => renderTemplate`${maybeRenderHead($$result)}<nav class="guide-nav" aria-label="Related products and docs" data-astro-cid-xmaeph5b>${related.length > 0 && renderTemplate`<div class="guide-nav__group" data-astro-cid-xmaeph5b><p class="guide-nav__label" data-astro-cid-xmaeph5b>Products in this guide</p><ul data-astro-cid-xmaeph5b>${related.map((product) => renderTemplate`<li data-astro-cid-xmaeph5b><a${addAttribute(`/plugins/${product.slug}/`, "href")} data-astro-cid-xmaeph5b>${product.name}</a></li>`)}</ul></div>`}${docs.length > 0 && renderTemplate`<div class="guide-nav__group" data-astro-cid-xmaeph5b><p class="guide-nav__label" data-astro-cid-xmaeph5b>Documentation</p><ul data-astro-cid-xmaeph5b>${docs.map((doc) => renderTemplate`<li data-astro-cid-xmaeph5b><a${addAttribute(`/docs/${doc.id}/`, "href")} data-astro-cid-xmaeph5b>${doc.data.title}</a></li>`)}</ul></div>`}</nav>`,
		"footer": ($$result) => renderTemplate`<div class="guide-footer" data-astro-cid-xmaeph5b>${related.length > 0 && renderTemplate`<div data-astro-cid-xmaeph5b><h2 data-astro-cid-xmaeph5b>Product pages</h2><ul data-astro-cid-xmaeph5b>${related.map((product) => renderTemplate`<li data-astro-cid-xmaeph5b><a${addAttribute(`/plugins/${product.slug}/`, "href")} data-astro-cid-xmaeph5b>${product.name} <span aria-hidden="true" data-astro-cid-xmaeph5b>→</span></a><p data-astro-cid-xmaeph5b>${product.summary}</p></li>`)}</ul></div>`}<p class="guide-footer__note" data-astro-cid-xmaeph5b>ArkFlame Studios · 30 October 2026</p></div>`
	})}` })}`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/guides/[slug].astro", void 0);
var $$file = "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/guides/[slug].astro";
var $$url = "/guides/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/guides/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
