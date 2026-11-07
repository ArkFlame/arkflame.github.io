import { c as SITE, d as __exportAll, l as renderScript, o as HERO, s as PLATFORM_STRIP, t as $$BaseLayout, u as createComponent } from "./BaseLayout_5XlJqx1o.mjs";
import { O as createAstro, c as renderComponent, g as maybeRenderHead, h as renderTemplate, v as addAttribute } from "./server_C1-8vluA.mjs";
import { t as getCollection } from "./_astro_content_Bdqfz2bL.mjs";
import { n as getProduct } from "./products_DHgwqqLo.mjs";
import { t as $$ProductCard } from "./ProductCard_GcjzL-F1.mjs";
//#region src/components/HeroProductStack.astro
createAstro("https://arkflame.com");
var $$HeroProductStack = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HeroProductStack;
	const { primary, foreground } = Astro.props;
	const tiles = foreground.slice(0, 2);
	const primaryBase = primary.image?.replace(/\.webp$/, "");
	return renderTemplate`${maybeRenderHead($$result)}<div class="hps"${addAttribute(`${primary.name} and featured products`, "aria-label")} data-astro-cid-gmfnl5l6><div class="hps__frame" data-astro-cid-gmfnl5l6>${primary.image ? renderTemplate`<img class="hps__primary"${addAttribute(primary.image, "src")}${addAttribute(primaryBase === void 0 ? void 0 : `${primaryBase}-480.webp 480w, ${primaryBase}-720.webp 720w, ${primary.image} 1672w`, "srcset")} sizes="(max-width: 760px) 326px, 470px"${addAttribute(`${primary.name} product preview`, "alt")} width="1672" height="941" loading="eager" decoding="async" fetchpriority="high" data-astro-cid-gmfnl5l6>` : renderTemplate`<div class="hps__fallback" role="img"${addAttribute(`${primary.name} preview unavailable`, "aria-label")} data-astro-cid-gmfnl5l6>${primary.name}</div>`}${tiles.map((product, index) => renderTemplate`<div${addAttribute(["hps__tile", `hps__tile--${index + 1}`], "class:list")} data-astro-cid-gmfnl5l6>${product.icon ?? product.image ? renderTemplate`<img${addAttribute(product.icon ?? product.image, "src")}${addAttribute(`${product.name} product preview`, "alt")} width="512" height="512" loading="lazy" decoding="async" data-astro-cid-gmfnl5l6>` : renderTemplate`<div class="hps__fallback" role="img"${addAttribute(`${product.name} preview unavailable`, "aria-label")} data-astro-cid-gmfnl5l6>${product.name}</div>`}</div>`)}</div></div>`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/components/HeroProductStack.astro", void 0);
//#endregion
//#region src/components/ProductRail.astro
createAstro("https://arkflame.com");
var $$ProductRail = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductRail;
	const { id, eyebrow, title, description, products, allHref, allLabel } = Astro.props;
	const headingId = `${id}-title`;
	return renderTemplate`${maybeRenderHead($$result)}<section class="af-rail af-section"${addAttribute(headingId, "aria-labelledby")} data-astro-cid-3tasfd6b><div class="af-container" data-astro-cid-3tasfd6b><div class="af-rail__head" data-astro-cid-3tasfd6b><div class="af-rail__copy" data-astro-cid-3tasfd6b><p class="af-eyebrow" data-astro-cid-3tasfd6b>${eyebrow}</p><h2 class="af-rail__title"${addAttribute(headingId, "id")} data-astro-cid-3tasfd6b>${title}</h2><p class="af-rail__desc" data-astro-cid-3tasfd6b>${description}</p></div><div class="af-rail__controls" data-rail-controls hidden data-astro-cid-3tasfd6b><button type="button" class="af-rail__arrow" data-rail-prev${addAttribute(`Scroll ${title} left`, "aria-label")} data-astro-cid-3tasfd6b><span aria-hidden="true" data-astro-cid-3tasfd6b>←</span></button><button type="button" class="af-rail__arrow" data-rail-next${addAttribute(`Scroll ${title} right`, "aria-label")} data-astro-cid-3tasfd6b><span aria-hidden="true" data-astro-cid-3tasfd6b>→</span></button></div></div><div class="af-rail__viewport" data-rail tabindex="0" role="group"${addAttribute(`${title}: manually scrollable list`, "aria-label")} data-astro-cid-3tasfd6b><ul class="af-rail__track" data-astro-cid-3tasfd6b>${products.map((product) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, {
		"product": product,
		"variant": "rail",
		"headingLevel": "h3",
		"data-astro-cid-3tasfd6b": true
	})}`)}<li class="af-rail__all-item" data-astro-cid-3tasfd6b><a class="af-rail__all"${addAttribute(allHref, "href")} data-astro-cid-3tasfd6b><span class="af-rail__all-label" data-astro-cid-3tasfd6b>View all</span><span class="af-rail__all-title" data-astro-cid-3tasfd6b>${allLabel}</span><span class="af-rail__all-arrow" aria-hidden="true" data-astro-cid-3tasfd6b>→</span></a></li></ul></div></div></section>${renderScript($$result, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/components/ProductRail.astro?astro&type=script&index=0&lang.ts")}`;
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
	const selected = [
		"flamecord",
		"exploitfixer",
		"fairplay",
		"authme-premium",
		"redstonelimiter"
	].map((slug) => getProduct(slug)).filter((product) => product !== void 0);
	const security = [
		"exploitfixer",
		"fairplay",
		"authme-premium",
		"chatsentinel"
	].map((slug) => getProduct(slug)).filter((product) => product !== void 0);
	const performance = [
		"redstonelimiter",
		"entitylimiter",
		"flamepaper",
		"flamestack"
	].map((slug) => getProduct(slug)).filter((product) => product !== void 0);
	const network = [
		"flamecord",
		"veloflame",
		"discordflow"
	].map((slug) => getProduct(slug)).filter((product) => product !== void 0);
	const smp = [
		"smp-lifesteal",
		"smp-punishments",
		"smp-combat",
		"smp-menus",
		"smp-regions"
	].map((slug) => getProduct(slug)).filter((product) => product !== void 0);
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="hm" data-astro-cid-lcdefpme><div class="af-container hm__inner" data-astro-cid-lcdefpme><div class="hm__copy" data-astro-cid-lcdefpme><p class="af-eyebrow" data-astro-cid-lcdefpme>${HERO.eyebrow}</p><h1 class="hm__title" data-astro-cid-lcdefpme>We make <span class="hm__accent" data-astro-cid-lcdefpme>Minecraft</span> plugins.</h1><p class="hm__lead" data-astro-cid-lcdefpme>${HERO.body}</p><div class="hm__actions" data-astro-cid-lcdefpme><a class="btn btn-primary" href="/plugins/" data-astro-cid-lcdefpme>Browse plugins</a><a class="btn" href="/docs/" data-astro-cid-lcdefpme>Read the docs</a></div><p class="hm__meta" data-astro-cid-lcdefpme><span data-astro-cid-lcdefpme>${docsCount} plugin guides</span><span aria-hidden="true" data-astro-cid-lcdefpme>·</span><a href="/guides/" data-astro-cid-lcdefpme>${guideCount} technical articles</a></p></div><div class="hm__art" data-astro-cid-lcdefpme>${renderComponent($$result, "HeroProductStack", $$HeroProductStack, {
		"primary": getProduct("flamecord"),
		"foreground": [getProduct("exploitfixer"), getProduct("fairplay")],
		"data-astro-cid-lcdefpme": true
	})}</div></div></section><div class="ps" aria-label="Platforms across the catalogue" data-astro-cid-lcdefpme><div class="af-container ps__inner" data-astro-cid-lcdefpme><ul class="ps__list" data-astro-cid-lcdefpme>${PLATFORM_STRIP.map((platform) => renderTemplate`<li class="ps__item" data-astro-cid-lcdefpme><img${addAttribute(platform.logo, "src")}${addAttribute(platform.label, "alt")} loading="lazy" decoding="async" width="112" height="30" data-astro-cid-lcdefpme></li>`)}</ul><p class="ps__caption" data-astro-cid-lcdefpme>Supports all popular platforms.</p></div></div><div class="rail-stack" data-astro-cid-lcdefpme>${renderComponent($$result, "ProductRail", $$ProductRail, {
		"id": "selected",
		"eyebrow": "Selected",
		"title": "Start with these.",
		"description": "Our strongest plugins, across security, performance and network infrastructure.",
		"products": selected,
		"allHref": "/plugins/",
		"allLabel": "All 51 plugins",
		"data-astro-cid-lcdefpme": true
	})}${renderComponent($$result, "ProductRail", $$ProductRail, {
		"id": "security",
		"eyebrow": "Security",
		"title": "Stop abuse before it reaches gameplay.",
		"description": "Exploit filtering, combat anticheat, authentication bridges and chat moderation.",
		"products": security,
		"allHref": "/plugins/security/",
		"allLabel": "Security plugins",
		"data-astro-cid-lcdefpme": true
	})}${renderComponent($$result, "ProductRail", $$ProductRail, {
		"id": "performance",
		"eyebrow": "Performance",
		"title": "Cap the work that costs tick time.",
		"description": "Redstone, entity, block and item controls, plus a Paper 1.8.8 server fork.",
		"products": performance,
		"allHref": "/plugins/performance/",
		"allLabel": "Performance plugins",
		"data-astro-cid-lcdefpme": true
	})}${renderComponent($$result, "ProductRail", $$ProductRail, {
		"id": "network",
		"eyebrow": "Network",
		"title": "Harden the proxy layer.",
		"description": "Bungee-compatible and Velocity proxies with firewall, rate-limit and bridging tools.",
		"products": network,
		"allHref": "/plugins/network/",
		"allLabel": "Network software",
		"data-astro-cid-lcdefpme": true
	})}${renderComponent($$result, "ProductRail", $$ProductRail, {
		"id": "smp",
		"eyebrow": "SMP",
		"title": "Build the survival loop.",
		"description": "Claims, combat tags, lifesteal, spawners, menus, lobbies and rewards.",
		"products": smp,
		"allHref": "/plugins/smp/",
		"allLabel": "SMP plugins",
		"data-astro-cid-lcdefpme": true
	})}</div><section class="closing af-section" data-astro-cid-lcdefpme><div class="af-container closing__inner" data-astro-cid-lcdefpme><div data-astro-cid-lcdefpme><p class="af-eyebrow" data-astro-cid-lcdefpme>DOCUMENTATION</p><h2 class="closing__title" data-astro-cid-lcdefpme>Read the documentation.</h2><p class="closing__body" data-astro-cid-lcdefpme>Installation, commands, permissions and configuration for the plugins you run.</p></div><div class="closing__actions" data-astro-cid-lcdefpme><a class="btn btn-primary" href="/docs/" data-astro-cid-lcdefpme>Browse docs</a><a class="btn" href="/guides/" data-astro-cid-lcdefpme>Read guides</a></div></div></section>` })}`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/index.astro", void 0);
var $$file = "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
