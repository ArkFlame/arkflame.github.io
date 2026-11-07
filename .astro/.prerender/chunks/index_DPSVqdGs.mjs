import { c as SITE, d as __exportAll, t as $$BaseLayout, u as createComponent } from "./BaseLayout_BbbSybKV.mjs";
import { c as renderComponent, g as maybeRenderHead, h as renderTemplate, v as addAttribute } from "./server_C1-8vluA.mjs";
import { t as getCollection } from "./_astro_content_BhMQd4m0.mjs";
//#region src/pages/guides/index.astro
var guides_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const guides = (await getCollection("guides")).sort((a, b) => b.data.updated.getTime() - a.data.updated.getTime());
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "CollectionPage",
				"@id": `${SITE.siteUrl}/guides/#collection`,
				name: "ArkFlame technical guides",
				url: `${SITE.siteUrl}/guides/`,
				description: "Task-led guides for Minecraft server security, proxies, Folia and performance work.",
				isPartOf: { "@id": `${SITE.siteUrl}/#website` }
			},
			{
				"@type": "BreadcrumbList",
				"@id": `${SITE.siteUrl}/guides/#breadcrumb`,
				itemListElement: [{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: `${SITE.siteUrl}/`
				}, {
					"@type": "ListItem",
					position: 2,
					name: "Guides",
					item: `${SITE.siteUrl}/guides/`
				}]
			},
			{
				"@type": "ItemList",
				itemListElement: guides.map((guide, index) => ({
					"@type": "ListItem",
					position: index + 1,
					name: guide.data.title,
					url: `${SITE.siteUrl}/guides/${guide.id}/`
				}))
			}
		]
	};
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Technical Guides | ArkFlame Studios",
		"description": "Task-led Minecraft server guides: packet-abuse triage, proxy architecture, AuthMe topologies, FairPlay diagnostics, Folia verification and lag measurement.",
		"canonicalPath": "/guides/",
		"jsonLd": jsonLd,
		"data-astro-cid-62d46irs": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="af-container af-section" data-astro-cid-62d46irs> <header class="guides-head" data-astro-cid-62d46irs> <p class="af-eyebrow" data-astro-cid-62d46irs>Guides</p> <h1 data-astro-cid-62d46irs>Work through the problem.</h1> <p class="guides-head__intro" data-astro-cid-62d46irs>
Each article answers one operational question with concrete commands, configuration and deployment steps.
</p> </header> <ul class="guides-grid" data-astro-cid-62d46irs> ${guides.map((guide) => renderTemplate`<li data-astro-cid-62d46irs> <a class="guide-card"${addAttribute(`/guides/${guide.id}/`, "href")} data-astro-cid-62d46irs> <span class="guide-card__meta" data-astro-cid-62d46irs> ${guide.data.topics[0] ?? "Guide"} <span aria-hidden="true" data-astro-cid-62d46irs>·</span> ${guide.data.updated.toISOString().slice(0, 10)} </span> <h2 class="guide-card__title" data-astro-cid-62d46irs>${guide.data.title}</h2> <span class="guide-card__desc" data-astro-cid-62d46irs>${guide.data.description}</span> <span class="guide-card__link" data-astro-cid-62d46irs>Read guide →</span> </a> </li>`)} </ul> <aside class="guides-cta" data-astro-cid-62d46irs> <div data-astro-cid-62d46irs> <h2 data-astro-cid-62d46irs>Need the plugin-level detail?</h2> <p data-astro-cid-62d46irs>Quick starts cover requirements, commands, permissions and the exact defaults that ship in each jar.</p> </div> <a class="btn btn-primary" href="/docs/" data-astro-cid-62d46irs>Browse documentation</a> </aside> </div> ` })}`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/guides/index.astro", void 0);
var $$file = "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/guides/index.astro";
var $$url = "/guides";
//#endregion
//#region \0virtual:astro:page:src/pages/guides/index@_@astro
var page = () => guides_exports;
//#endregion
export { page };
