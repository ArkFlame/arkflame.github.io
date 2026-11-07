import { c as SITE, d as __exportAll, l as renderScript, n as $$Icon, r as CATEGORIES, t as $$BaseLayout, u as createComponent } from "./BaseLayout_BfJGYEgU.mjs";
import { O as createAstro, c as renderComponent, g as maybeRenderHead, h as renderTemplate, v as addAttribute } from "./server_C1-8vluA.mjs";
import { t as PRODUCTS } from "./products_DHgwqqLo.mjs";
import { t as $$ProductCard } from "./ProductCard_Bkz3qO5u.mjs";
//#region src/components/ProductCatalog.astro
createAstro("https://arkflame.com");
var $$ProductCatalog = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductCatalog;
	const { products } = Astro.props;
	const initial = [...products].sort((a, b) => {
		if (a.featured !== b.featured) return a.featured ? -1 : 1;
		return a.name.localeCompare(b.name);
	});
	return renderTemplate`${maybeRenderHead($$result)}<section class="af-container af-section af-catalog" data-catalog data-astro-cid-eijyee5r><header class="af-catalog__head" data-astro-cid-eijyee5r><p class="af-eyebrow" data-astro-cid-eijyee5r>Plugins</p><h1 data-astro-cid-eijyee5r>Minecraft plugins</h1><p class="af-catalog__intro" data-astro-cid-eijyee5r>${products.length} products across security, performance, proxies, gameplay and SMP. Search by name or tag, filter by category, and sort the catalogue.</p></header><div class="af-catalog__controls" data-astro-cid-eijyee5r><div class="af-catalog__search" data-astro-cid-eijyee5r><label class="af-sr-only" for="catalog-search" data-astro-cid-eijyee5r>Search plugins</label>${renderComponent($$result, "Icon", $$Icon, {
		"name": "search",
		"class": "af-catalog__search-icon",
		"data-astro-cid-eijyee5r": true
	})}<input class="input" type="search" name="q" id="catalog-search" placeholder="Search name, summary or tag" autocomplete="off" data-astro-cid-eijyee5r></div><div class="af-catalog__sort" data-astro-cid-eijyee5r><label for="catalog-sort" data-astro-cid-eijyee5r>Sort by</label><select id="catalog-sort" class="input" data-catalog-sort data-astro-cid-eijyee5r><option value="featured" data-astro-cid-eijyee5r>Featured first</option><option value="name" data-astro-cid-eijyee5r>Name A–Z</option><option value="category" data-astro-cid-eijyee5r>Category</option><option value="purchases" data-astro-cid-eijyee5r>Most purchased</option><option value="rating" data-astro-cid-eijyee5r>Top rated</option></select></div></div><div class="af-catalog__filters" role="group" aria-label="Filter plugins by category" data-catalog-filters data-astro-cid-eijyee5r><button type="button" class="af-catalog__filter" data-category="all" aria-pressed="true" data-astro-cid-eijyee5r>All</button>${CATEGORIES.map((category) => renderTemplate`<button type="button" class="af-catalog__filter"${addAttribute(category.slug, "data-category")} aria-pressed="false" data-astro-cid-eijyee5r>${category.name}<span class="af-catalog__filter-count" data-astro-cid-eijyee5r>${products.filter((product) => product.category === category.slug).length}</span></button>`)}</div><div class="af-catalog__status" data-astro-cid-eijyee5r><p class="af-catalog__count" data-catalog-count aria-live="polite" data-astro-cid-eijyee5r>${products.length} plugins</p><p class="af-catalog__empty" data-catalog-empty hidden data-astro-cid-eijyee5r>No plugins match those filters.<button type="button" class="af-catalog__clear" data-catalog-clear data-astro-cid-eijyee5r>Clear filters</button></p></div><ul class="af-catalog__list" data-catalog-list data-astro-cid-eijyee5r>${initial.map((product) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, {
		"product": product,
		"headingLevel": "h2",
		"data-astro-cid-eijyee5r": true
	})}`)}</ul></section>${renderScript($$result, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/components/ProductCatalog.astro?astro&type=script&index=0&lang.ts")}`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/components/ProductCatalog.astro", void 0);
//#endregion
//#region src/pages/plugins/index.astro
var plugins_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const TITLE = "Minecraft Plugins | ArkFlame Studios";
	const DESCRIPTION = "Browse ArkFlame Minecraft plugins for server security, performance, proxies, SMP gameplay, anticheat, authentication and optimization.";
	const abs = (path) => new URL(path, SITE.siteUrl).href;
	const pluginsUrl = abs("/plugins/");
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "CollectionPage",
			"@id": `${pluginsUrl}#collection`,
			"name": "Minecraft Plugins",
			"url": pluginsUrl,
			"description": DESCRIPTION,
			"isPartOf": { "@id": `${SITE.siteUrl}/#website` },
			"breadcrumb": { "@id": `${pluginsUrl}#breadcrumb` }
		}, {
			"@type": "BreadcrumbList",
			"@id": `${pluginsUrl}#breadcrumb`,
			"itemListElement": [{
				"@type": "ListItem",
				"position": 1,
				"name": "Home",
				"item": `${SITE.siteUrl}/`
			}, {
				"@type": "ListItem",
				"position": 2,
				"name": "Minecraft Plugins",
				"item": pluginsUrl
			}]
		}]
	};
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": TITLE,
		"description": DESCRIPTION,
		"canonicalPath": "/plugins/",
		"jsonLd": jsonLd
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "ProductCatalog", $$ProductCatalog, { "products": PRODUCTS })}` })}`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/plugins/index.astro", void 0);
var $$file = "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/plugins/index.astro";
var $$url = "/plugins";
//#endregion
//#region \0virtual:astro:page:src/pages/plugins/index@_@astro
var page = () => plugins_exports;
//#endregion
export { page };
