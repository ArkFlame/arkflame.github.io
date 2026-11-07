import { c as SITE, d as __exportAll, r as CATEGORIES, t as $$BaseLayout, u as createComponent } from "./BaseLayout_hYm0FrBI.mjs";
import { O as createAstro, c as renderComponent, g as maybeRenderHead, h as renderTemplate, v as addAttribute } from "./server_C1-8vluA.mjs";
import { n as getEntry, r as render, t as getCollection } from "./_astro_content_VjghMrD2.mjs";
import { t as $$ArticleLayout } from "./ArticleLayout_QvxNksCC.mjs";
import { n as getProduct } from "./products_DHgwqqLo.mjs";
//#region src/pages/docs/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://arkflame.com");
async function getStaticPaths() {
	return (await getCollection("docs")).map((entry) => ({
		params: { slug: entry.id },
		props: { slug: entry.id }
	}));
}
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.props;
	const entry = await getEntry("docs", slug);
	if (entry === void 0) throw new Error(`docs/[slug]: no entry for "${slug}"`);
	const { Content, headings } = await render(entry);
	const product = getProduct(entry.data.plugin);
	if (product === void 0) throw new Error(`docs/[slug]: plugin "${entry.data.plugin}" is not in the product catalogue`);
	const docs = (await getCollection("docs")).sort((a, b) => a.data.title.localeCompare(b.data.title));
	const grouped = CATEGORIES.map((category) => ({
		category,
		items: docs.filter((doc) => doc.data.category === category.slug)
	})).filter((group) => group.items.length > 0);
	const guides = (await getCollection("guides")).filter((guide) => guide.data.relatedPlugins.includes(product.slug)).sort((a, b) => b.data.updated.getTime() - a.data.updated.getTime()).slice(0, 3);
	const path = `/docs/${entry.id}/`;
	const url = `${SITE.siteUrl}${path}`;
	const productUrl = `${SITE.siteUrl}/plugins/${product.slug}/`;
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "TechArticle",
			"@id": `${url}#article`,
			headline: entry.data.title,
			description: entry.data.description,
			url,
			mainEntityOfPage: url,
			dateModified: entry.data.updated.toISOString(),
			inLanguage: "en-US",
			author: {
				"@type": "Organization",
				name: SITE.name,
				url: `${SITE.siteUrl}/`
			},
			publisher: { "@id": `${SITE.siteUrl}/#organization` },
			about: {
				"@type": "SoftwareApplication",
				name: product.name,
				url: productUrl
			},
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
					name: "Documentation",
					item: `${SITE.siteUrl}/docs/`
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
		"title": `${entry.data.title} | ArkFlame Documentation`,
		"description": entry.data.description,
		"canonicalPath": path,
		"ogType": "article",
		"jsonLd": jsonLd,
		"data-astro-cid-wyaoh547": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "ArticleLayout", $$ArticleLayout, {
		"eyebrow": "Plugin documentation",
		"title": entry.data.title,
		"description": entry.data.description,
		"updated": entry.data.updated,
		"headings": headings,
		"backHref": "/docs/",
		"backLabel": "Documentation",
		"sectionLabel": entry.data.category,
		"data-astro-cid-wyaoh547": true
	}, {
		"default": ($$result) => renderTemplate`${renderComponent($$result, "Content", Content, { "data-astro-cid-wyaoh547": true })}`,
		"sidebar": ($$result) => renderTemplate`${maybeRenderHead($$result)}<nav class="doc-nav" aria-label="All plugin documentation" data-astro-cid-wyaoh547>${grouped.map(({ category, items }) => renderTemplate`<div class="doc-nav__group" data-astro-cid-wyaoh547><p class="doc-nav__label" data-astro-cid-wyaoh547>${category.name}</p><ul data-astro-cid-wyaoh547>${items.map((doc) => renderTemplate`<li data-astro-cid-wyaoh547><a${addAttribute(`/docs/${doc.id}/`, "href")}${addAttribute(doc.id === entry.id ? "page" : void 0, "aria-current")} data-astro-cid-wyaoh547>${getProduct(doc.data.plugin)?.name ?? doc.data.plugin}</a></li>`)}</ul></div>`)}</nav>`,
		"footer": ($$result) => renderTemplate`<div class="doc-footer" data-astro-cid-wyaoh547><a class="doc-footer__product"${addAttribute(`/plugins/${product.slug}/`, "href")} data-astro-cid-wyaoh547><span class="doc-footer__kicker" data-astro-cid-wyaoh547>Product page</span><span class="doc-footer__title" data-astro-cid-wyaoh547>${product.name}</span><span class="doc-footer__desc" data-astro-cid-wyaoh547>${product.summary}</span><span class="doc-footer__link" data-astro-cid-wyaoh547>Open product page →</span></a>${guides.length > 0 && renderTemplate`<div class="doc-footer__guides" data-astro-cid-wyaoh547><h2 data-astro-cid-wyaoh547>Related guides</h2><ul data-astro-cid-wyaoh547>${guides.map((guide) => renderTemplate`<li data-astro-cid-wyaoh547><a${addAttribute(`/guides/${guide.id}/`, "href")} data-astro-cid-wyaoh547>${guide.data.title}</a></li>`)}</ul></div>`}<p class="doc-footer__note" data-astro-cid-wyaoh547>Documentation is maintained alongside each ArkFlame release.</p></div>`
	})}` })}`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/docs/[slug].astro", void 0);
var $$file = "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/docs/[slug].astro";
var $$url = "/docs/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/docs/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
