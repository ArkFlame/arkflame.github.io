import { c as SITE, d as __exportAll, n as $$Icon, r as CATEGORIES, t as $$BaseLayout, u as createComponent } from "./BaseLayout_BfJGYEgU.mjs";
import { c as renderComponent, g as maybeRenderHead, h as renderTemplate, v as addAttribute } from "./server_C1-8vluA.mjs";
import { t as getCollection } from "./_astro_content_X8NO2I2o.mjs";
//#region src/pages/docs/index.astro
var docs_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const docs = (await getCollection("docs")).sort((a, b) => a.data.title.localeCompare(b.data.title));
	const guides = (await getCollection("guides")).sort((a, b) => a.data.title.localeCompare(b.data.title));
	const grouped = CATEGORIES.map((category) => ({
		category,
		items: docs.filter((entry) => entry.data.category === category.slug)
	})).filter((group) => group.items.length > 0);
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "CollectionPage",
			"@id": `${SITE.siteUrl}/docs/#collection`,
			name: "ArkFlame plugin documentation",
			url: `${SITE.siteUrl}/docs/`,
			description: "Quick starts, requirements, commands and configuration for ArkFlame Minecraft plugins.",
			isPartOf: { "@id": `${SITE.siteUrl}/#website` }
		}, {
			"@type": "BreadcrumbList",
			"@id": `${SITE.siteUrl}/docs/#breadcrumb`,
			itemListElement: [{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: `${SITE.siteUrl}/`
			}, {
				"@type": "ListItem",
				position: 2,
				name: "Documentation",
				item: `${SITE.siteUrl}/docs/`
			}]
		}]
	};
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Plugin Documentation | ArkFlame Studios",
		"description": "Quick starts for ArkFlame Minecraft plugins: requirements, installation, commands, permissions and configuration.",
		"canonicalPath": "/docs/",
		"jsonLd": jsonLd,
		"data-astro-cid-avn6we46": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="af-container af-section" data-astro-cid-avn6we46><header class="docs-head" data-astro-cid-avn6we46><p class="af-eyebrow" data-astro-cid-avn6we46>Documentation</p><h1 data-astro-cid-avn6we46>Plugin quick starts</h1><p class="docs-head__intro" data-astro-cid-avn6we46>Quick starts, installation, commands, permissions and configuration for the plugins in the ArkFlame catalogue.</p><p class="docs-head__note" data-astro-cid-avn6we46>${docs.length} plugin guides, with the details you need to get each one running.</p></header><div class="docs-layout" data-astro-cid-avn6we46><div class="docs-main" data-astro-cid-avn6we46>${grouped.map(({ category, items }) => renderTemplate`<section class="docs-group"${addAttribute(`docs-${category.slug}`, "aria-labelledby")} data-astro-cid-avn6we46><h2${addAttribute(`docs-${category.slug}`, "id")} data-astro-cid-avn6we46>${renderComponent($$result, "Icon", $$Icon, {
		"name": category.icon,
		"size": 20,
		"data-astro-cid-avn6we46": true
	})}${category.name}</h2><ul class="docs-list" data-astro-cid-avn6we46>${items.map((entry) => renderTemplate`<li data-astro-cid-avn6we46><a class="docs-card"${addAttribute(`/docs/${entry.id}/`, "href")} data-astro-cid-avn6we46><h3 class="docs-card__title" data-astro-cid-avn6we46>${entry.data.title}</h3><span class="docs-card__desc" data-astro-cid-avn6we46>${entry.data.description}</span><span class="docs-card__meta" data-astro-cid-avn6we46>Updated ${entry.data.updated.toISOString().slice(0, 10)}</span></a></li>`)}</ul></section>`)}</div><div class="docs-side" data-astro-cid-avn6we46><h2 id="docs-side-title" data-astro-cid-avn6we46>Start by task</h2><ul data-astro-cid-avn6we46><li data-astro-cid-avn6we46><a href="/guides/exploitfixer-packet-abuse/" data-astro-cid-avn6we46>Reading packet-abuse reports</a></li><li data-astro-cid-avn6we46><a href="/guides/diagnose-lag-before-limiters/" data-astro-cid-avn6we46>Diagnosing lag before limiters</a></li><li data-astro-cid-avn6we46><a href="/guides/flamecord-vs-veloflame/" data-astro-cid-avn6we46>Choosing a proxy architecture</a></li><li data-astro-cid-avn6we46><a href="/guides/secure-proxy-backend/" data-astro-cid-avn6we46>Securing proxy-to-backend trust</a></li></ul><h2 data-astro-cid-avn6we46>All guides</h2><p class="docs-side__text" data-astro-cid-avn6we46>${guides.length} task-led articles for security, proxies and performance work.</p><a class="btn" href="/guides/" data-astro-cid-avn6we46>Browse guides</a><h2 data-astro-cid-avn6we46>Browse products</h2><p class="docs-side__text" data-astro-cid-avn6we46>Every plugin links to its docs and its current BuiltByBit listing.</p><a class="btn" href="/plugins/" data-astro-cid-avn6we46>All plugins</a></div></div></div>` })}`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/docs/index.astro", void 0);
var $$file = "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/docs/index.astro";
var $$url = "/docs";
//#endregion
//#region \0virtual:astro:page:src/pages/docs/index@_@astro
var page = () => docs_exports;
//#endregion
export { page };
