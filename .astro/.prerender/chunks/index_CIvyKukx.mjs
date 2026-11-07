import { c as SITE, d as __exportAll, l as renderScript, n as $$Icon, o as HERO, r as CATEGORIES, s as PLATFORM_STRIP, t as $$BaseLayout, u as createComponent } from "./BaseLayout_BbbSybKV.mjs";
import { O as createAstro, c as renderComponent, g as maybeRenderHead, h as renderTemplate, v as addAttribute } from "./server_C1-8vluA.mjs";
import { t as getCollection } from "./_astro_content_BhMQd4m0.mjs";
import { n as getProduct, r as getProductsByCategory, t as PRODUCTS } from "./products_DHgwqqLo.mjs";
import { n as STATS_AS_OF, r as STORE_STATS, t as $$ProductCard } from "./ProductCard_DpDHeIV9.mjs";
//#region src/components/HeroProductStack.astro
createAstro("https://arkflame.com");
var $$HeroProductStack = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HeroProductStack;
	const { primary, foreground } = Astro.props;
	const tiles = foreground.slice(0, 2);
	const primaryBase = primary.image?.replace(/\.webp$/, "");
	return renderTemplate`${maybeRenderHead($$result)}<div class="hps"${addAttribute(`${primary.name} and featured products`, "aria-label")} data-astro-cid-gmfnl5l6> <div class="hps__frame" data-astro-cid-gmfnl5l6> ${primary.image ? renderTemplate`<img class="hps__primary"${addAttribute(primary.image, "src")}${addAttribute(primaryBase === void 0 ? void 0 : `${primaryBase}-480.webp 480w, ${primaryBase}-720.webp 720w, ${primary.image} 1672w`, "srcset")} sizes="(max-width: 760px) 326px, 470px"${addAttribute(`${primary.name} product preview`, "alt")} width="1672" height="941" loading="eager" decoding="async" fetchpriority="high" data-astro-cid-gmfnl5l6>` : renderTemplate`<div class="hps__fallback" role="img"${addAttribute(`${primary.name} preview unavailable`, "aria-label")} data-astro-cid-gmfnl5l6> ${primary.name} </div>`} ${tiles.map((product, index) => renderTemplate`<div${addAttribute(["hps__tile", `hps__tile--${index + 1}`], "class:list")} data-astro-cid-gmfnl5l6> ${product.icon ?? product.image ? renderTemplate`<img${addAttribute(product.icon ?? product.image, "src")}${addAttribute(`${product.name} product preview`, "alt")} width="512" height="512" loading="lazy" decoding="async" data-astro-cid-gmfnl5l6>` : renderTemplate`<div class="hps__fallback" role="img"${addAttribute(`${product.name} preview unavailable`, "aria-label")} data-astro-cid-gmfnl5l6> ${product.name} </div>`} </div>`)} </div> </div>`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/components/HeroProductStack.astro", void 0);
//#endregion
//#region src/components/ProductRail.astro
createAstro("https://arkflame.com");
var $$ProductRail = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductRail;
	const { id, eyebrow, title, description, products, allHref, allLabel } = Astro.props;
	const headingId = `${id}-title`;
	return renderTemplate`${maybeRenderHead($$result)}<section class="af-rail af-section"${addAttribute(headingId, "aria-labelledby")} data-astro-cid-3tasfd6b> <div class="af-container" data-astro-cid-3tasfd6b> <div class="af-rail__head" data-astro-cid-3tasfd6b> <div class="af-rail__copy" data-astro-cid-3tasfd6b> <p class="af-eyebrow" data-astro-cid-3tasfd6b>${eyebrow}</p> <h2 class="af-rail__title"${addAttribute(headingId, "id")} data-astro-cid-3tasfd6b>${title}</h2> <p class="af-rail__desc" data-astro-cid-3tasfd6b>${description}</p> </div> <div class="af-rail__controls" data-rail-controls hidden data-astro-cid-3tasfd6b> <button type="button" class="af-rail__arrow" data-rail-prev${addAttribute(`Scroll ${title} left`, "aria-label")} data-astro-cid-3tasfd6b> <span aria-hidden="true" data-astro-cid-3tasfd6b>←</span> </button> <button type="button" class="af-rail__arrow" data-rail-next${addAttribute(`Scroll ${title} right`, "aria-label")} data-astro-cid-3tasfd6b> <span aria-hidden="true" data-astro-cid-3tasfd6b>→</span> </button> </div> </div> <div class="af-rail__viewport" data-rail tabindex="0" role="group"${addAttribute(`${title}: manually scrollable list`, "aria-label")} data-astro-cid-3tasfd6b> <ul class="af-rail__track" data-astro-cid-3tasfd6b> ${products.map((product) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, {
		"product": product,
		"variant": "rail",
		"headingLevel": "h3",
		"data-astro-cid-3tasfd6b": true
	})}`)} <li class="af-rail__all-item" data-astro-cid-3tasfd6b> <a class="af-rail__all"${addAttribute(allHref, "href")} data-astro-cid-3tasfd6b> <span class="af-rail__all-label" data-astro-cid-3tasfd6b>View all</span> <span class="af-rail__all-title" data-astro-cid-3tasfd6b>${allLabel}</span> <span class="af-rail__all-arrow" aria-hidden="true" data-astro-cid-3tasfd6b>→</span> </a> </li> </ul> </div> </div> </section>${renderScript($$result, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/components/ProductRail.astro?astro&type=script&index=0&lang.ts")}`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/components/ProductRail.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const docsCount = (await getCollection("docs")).length;
	const guideCount = (await getCollection("guides")).length;
	const purchasesOf = (slug) => STORE_STATS[slug]?.purchases ?? 0;
	const totalSold = PRODUCTS.reduce((sum, product) => sum + purchasesOf(product.slug), 0);
	const ratings = PRODUCTS.flatMap((product) => {
		const rating = STORE_STATS[product.slug]?.rating;
		return rating === void 0 ? [] : [rating];
	});
	const averageRating = ratings.length === 0 ? 0 : ratings.reduce((a, b) => a + b, 0) / ratings.length;
	const asOf = (/* @__PURE__ */ new Date(`${STATS_AS_OF}T00:00:00Z`)).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
	const popular = [...PRODUCTS].sort((a, b) => purchasesOf(b.slug) - purchasesOf(a.slug)).slice(0, 8);
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "Organization",
			"@id": `${SITE.siteUrl}/#organization`,
			name: SITE.name,
			url: `${SITE.siteUrl}/`,
			logo: `${SITE.siteUrl}${SITE.logo}`,
			image: `${SITE.siteUrl}${SITE.ogImage}`,
			description: "ArkFlame Studios builds Minecraft server software for security, performance, proxies, anticheat and SMP gameplay.",
			sameAs: [
				SITE.githubUrl,
				SITE.builtByBitUrl,
				SITE.discordUrl,
				getProduct("flamecord")?.officialUrl,
				getProduct("exploitfixer")?.officialUrl,
				getProduct("veloflame")?.officialUrl,
				getProduct("fairplay")?.officialUrl,
				SITE.founderUrl
			].filter((url) => url !== void 0)
		}, {
			"@type": "WebSite",
			"@id": `${SITE.siteUrl}/#website`,
			name: SITE.name,
			url: `${SITE.siteUrl}/`,
			publisher: { "@id": `${SITE.siteUrl}/#organization` },
			inLanguage: "en-US"
		}]
	};
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Minecraft Plugins & Server Software | ArkFlame Studios",
		"description": "Minecraft plugins, anticheat, authentication and proxy software for security, performance and SMP servers. Built by ArkFlame Studios.",
		"canonicalPath": "/",
		"jsonLd": jsonLd,
		"data-astro-cid-lcdefpme": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<section class="hm" data-astro-cid-lcdefpme> <div class="af-container hm__inner" data-astro-cid-lcdefpme> <div class="hm__copy" data-astro-cid-lcdefpme> <p class="af-eyebrow" data-astro-cid-lcdefpme>${HERO.eyebrow}</p> <h1 class="hm__title" data-astro-cid-lcdefpme>${HERO.h1}</h1> <p class="hm__lead" data-astro-cid-lcdefpme>${HERO.body}</p> <div class="hm__actions" data-astro-cid-lcdefpme> <a class="btn btn-primary" href="/plugins/" data-astro-cid-lcdefpme>${HERO.primaryCta}</a> <a class="btn" href="/docs/" data-astro-cid-lcdefpme>${HERO.secondaryCta}</a> </div> </div> <div class="hm__art" data-astro-cid-lcdefpme> ${renderComponent($$result, "HeroProductStack", $$HeroProductStack, {
		"primary": getProduct("flamecord"),
		"foreground": [getProduct("exploitfixer"), getProduct("fairplay")],
		"data-astro-cid-lcdefpme": true
	})} </div> </div> </section> <section class="nums af-container" aria-label="Catalogue numbers" data-astro-cid-lcdefpme> <dl class="nums__list" data-astro-cid-lcdefpme> <div data-astro-cid-lcdefpme> <dt data-astro-cid-lcdefpme>Plugins</dt> <dd data-astro-cid-lcdefpme>${PRODUCTS.length}</dd> </div> <div data-astro-cid-lcdefpme> <dt data-astro-cid-lcdefpme>Sales on BuiltByBit</dt> <dd data-astro-cid-lcdefpme>${totalSold.toLocaleString("en-US")}</dd> </div> <div data-astro-cid-lcdefpme> <dt data-astro-cid-lcdefpme>Average rating</dt> <dd data-astro-cid-lcdefpme>★ ${averageRating.toFixed(1)}</dd> </div> <div data-astro-cid-lcdefpme> <dt data-astro-cid-lcdefpme>Snapshot as of</dt> <dd data-astro-cid-lcdefpme><time${addAttribute(STATS_AS_OF, "datetime")} data-astro-cid-lcdefpme>${asOf}</time></dd> </div> </dl> </section> <div class="ps" aria-label="Platforms" data-astro-cid-lcdefpme> <div class="af-container ps__inner" data-astro-cid-lcdefpme> <ul class="ps__list" data-astro-cid-lcdefpme> ${PLATFORM_STRIP.map((platform) => renderTemplate`<li class="ps__item" data-astro-cid-lcdefpme>${platform.label}</li>`)} </ul> <p class="ps__caption" data-astro-cid-lcdefpme>Supports all popular platforms.</p> </div> </div> ${renderComponent($$result, "ProductRail", $$ProductRail, {
		"id": "popular",
		"eyebrow": "Sold on BuiltByBit",
		"title": "Most popular.",
		"description": `Top eight by purchases on BuiltByBit, snapshot as of ${asOf}.`,
		"products": popular,
		"allHref": "/plugins/?sort=purchases",
		"allLabel": `All ${PRODUCTS.length} plugins`,
		"data-astro-cid-lcdefpme": true
	})} <section class="cats af-container af-section" aria-labelledby="cats-title" data-astro-cid-lcdefpme> <h2 class="cats__title" id="cats-title" data-astro-cid-lcdefpme>Browse by category.</h2> <ul class="cats__list" data-astro-cid-lcdefpme> ${CATEGORIES.map((category) => renderTemplate`<li data-astro-cid-lcdefpme> <a class="cats__card"${addAttribute(`/plugins/${category.slug}/`, "href")} data-astro-cid-lcdefpme> <span class="cats__head" data-astro-cid-lcdefpme> ${renderComponent($$result, "Icon", $$Icon, {
		"name": category.icon,
		"size": 20,
		"data-astro-cid-lcdefpme": true
	})} <span class="cats__name" data-astro-cid-lcdefpme>${category.name}</span> <span class="cats__count" data-astro-cid-lcdefpme>${getProductsByCategory(category.slug).length}</span> </span> <span class="cats__desc" data-astro-cid-lcdefpme>${category.intro}</span> </a> </li>`)} </ul> </section> <section class="docs af-container af-section" aria-labelledby="docs-title" data-astro-cid-lcdefpme> <div class="docs__inner" data-astro-cid-lcdefpme> <div data-astro-cid-lcdefpme> <h2 class="docs__title" id="docs-title" data-astro-cid-lcdefpme>Read the documentation.</h2> <p class="docs__body" data-astro-cid-lcdefpme>Installation, commands, permissions and configuration.</p> </div> <ul class="docs__links" data-astro-cid-lcdefpme> <li data-astro-cid-lcdefpme><a class="btn btn-primary" href="/docs/" data-astro-cid-lcdefpme>Docs (${docsCount})</a></li> <li data-astro-cid-lcdefpme><a class="btn" href="/guides/" data-astro-cid-lcdefpme>Guides (${guideCount})</a></li> </ul> </div> </section> <nav class="elsewhere af-container" aria-label="Elsewhere" data-astro-cid-lcdefpme> <ul data-astro-cid-lcdefpme> <li data-astro-cid-lcdefpme><a${addAttribute(SITE.builtByBitUrl, "href")} rel="noopener" data-astro-cid-lcdefpme>BuiltByBit</a></li> <li data-astro-cid-lcdefpme><a${addAttribute(SITE.discordUrl, "href")} rel="noopener" data-astro-cid-lcdefpme>Discord</a></li> <li data-astro-cid-lcdefpme><a${addAttribute(SITE.githubUrl, "href")} rel="noopener" data-astro-cid-lcdefpme>GitHub</a></li> </ul> </nav> ` })}`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/index.astro", void 0);
var $$file = "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
