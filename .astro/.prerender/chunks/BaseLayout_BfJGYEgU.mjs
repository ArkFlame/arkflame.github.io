import { E as unescapeHTML, O as createAstro, _ as renderHead, c as renderComponent, f as renderSlot, g as maybeRenderHead, h as renderTemplate, v as addAttribute, y as createRenderInstruction } from "./server_C1-8vluA.mjs";
import { X as AstroError, _ as InvalidComponentArgs } from "./errors-data_BcIR_rvJ.mjs";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/astro/dist/runtime/server/astro-component.js
function validateArgs(args) {
	if (args.length !== 3) return false;
	if (!args[0] || typeof args[0] !== "object") return false;
	return true;
}
function baseCreateComponent(cb, moduleId, propagation) {
	const name = moduleId?.split("/").pop()?.replace(".astro", "") ?? "";
	const fn = (...args) => {
		if (!validateArgs(args)) throw new AstroError({
			...InvalidComponentArgs,
			message: InvalidComponentArgs.message(name)
		});
		return cb(...args);
	};
	Object.defineProperty(fn, "name", {
		value: name,
		writable: false
	});
	fn.isAstroComponentFactory = true;
	fn.moduleId = moduleId;
	fn.propagation = propagation;
	return fn;
}
function createComponentWithOptions(opts) {
	return baseCreateComponent(opts.factory, opts.moduleId, opts.propagation);
}
function createComponent(arg1, moduleId, propagation) {
	if (typeof arg1 === "function") return baseCreateComponent(arg1, moduleId, propagation);
	else return createComponentWithOptions(arg1);
}
//#endregion
//#region node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region src/data/site.ts
var SITE = {
	name: "ArkFlame Studios",
	shortName: "ArkFlame",
	siteUrl: "https://arkflame.com",
	ogImage: "/assets/img/og-image.webp",
	logo: "/assets/img/arkflame-logo.webp",
	founderImage: "/assets/img/linsaftw-profile.webp",
	founderName: "Juan Cruz Linsalata",
	founderHandle: "LinsaFTW",
	founderUrl: "https://linsaftw.arkflame.com/",
	githubUrl: "https://github.com/ArkFlame",
	builtByBitUrl: "https://builtbybit.com/creators/linsaftw.152552/",
	discordUrl: "https://discord.com/invite/gF36AT3",
	nonAffiliation: "Minecraft is a trademark of Mojang Studios. ArkFlame Studios is not affiliated with Mojang or Microsoft.",
	brandLine: "ArkFlame Studios builds Minecraft plugins."
};
var HERO = {
	eyebrow: "MINECRAFT SERVER SOFTWARE",
	h1: "Anticheat and lag control for Minecraft owners.",
	body: "Anticheat, lag limiters and proxies for Bukkit, Paper, Folia and Velocity networks. Each page states what the repository proves and what it does not.",
	primaryCta: "Browse plugins",
	secondaryCta: "Read the docs"
};
/**
* Platform names, not a blanket compatibility promise. The homepage caption and
* every product page make the product-specific scope explicit.
*/
var PLATFORM_STRIP = [
	{
		key: "bukkit",
		label: "Bukkit",
		logo: "/assets/img/vendor/bukkit.webp"
	},
	{
		key: "spigot",
		label: "Spigot",
		logo: "/assets/img/vendor/spigot.webp"
	},
	{
		key: "paper",
		label: "Paper",
		logo: "/assets/img/vendor/papermc.webp"
	},
	{
		key: "folia",
		label: "Folia",
		logo: "/assets/img/vendor/folia.webp"
	},
	{
		key: "bungeecord",
		label: "BungeeCord",
		logo: "/assets/img/vendor/bungeecord.webp"
	},
	{
		key: "velocity",
		label: "Velocity",
		logo: "/assets/img/vendor/velocity.webp"
	}
];
//#endregion
//#region src/data/categories.ts
/** Frozen category copy, in site taxonomy order. */
var CATEGORIES = [
	{
		slug: "security",
		name: "Security",
		title: "Minecraft Security Plugins | ArkFlame Studios",
		h1: "Minecraft Security Plugins",
		intro: "Exploit protection, anticheat, authentication and abuse prevention for Minecraft servers and networks.",
		closing: "Security products stop bad traffic before it becomes downtime. The set covers crash and dupe exploit protection, packet abuse filtering, combat anticheat with Grim integration, premium authentication bridges for proxy and Geyser networks, regex and smart chat filtering, and balanced anticheat configurations tuned for fewer false positives.",
		icon: "shield-lock",
		keywords: [
			"Anti-exploit",
			"Anticheat",
			"Authentication"
		],
		related: ["performance", "network"]
	},
	{
		slug: "performance",
		name: "Performance",
		title: "Minecraft Performance Plugins | ArkFlame Studios",
		h1: "Minecraft Performance Plugins",
		intro: "Server optimization tools for entity pressure, redstone abuse, runtime stability and high-load environments.",
		closing: "Performance products target the work that costs a server the most. Redstone and block limits cap expensive contraptions and dense structures, item and mob stacking reduce entity pressure, dedicated entity limits bound load directly, and a Paper 1.8.8 fork focuses on the tick loop, redstone behavior, knockback and long-running stability.",
		icon: "gauge",
		keywords: [
			"Entity pressure",
			"Redstone limits",
			"Runtime optimization"
		],
		related: ["security", "network"]
	},
	{
		slug: "network",
		name: "Network",
		title: "Minecraft Proxy & Network Software | ArkFlame Studios",
		h1: "Minecraft Proxy & Network Software",
		intro: "Proxy infrastructure for secure Minecraft networks built around Velocity and Bungee-compatible environments.",
		closing: "Network software guards the entry point of a Minecraft network. FlameCord is a BungeeCord/Waterfall-compatible proxy with anti-bot and anti-crash modules, not a Bukkit plugin. VeloFlame is the Velocity path with the same protection goal, and DiscordFlow syncs roles, chat, proximity voice and console access between Minecraft and Discord.",
		icon: "network",
		keywords: [
			"Velocity",
			"Bungee-compatible proxy software",
			"Anti-bot"
		],
		related: ["security", "performance"]
	},
	{
		slug: "gameplay",
		name: "Gameplay",
		title: "Minecraft Gameplay Plugins | ArkFlame Studios",
		h1: "Minecraft Gameplay Plugins",
		intro: "PvP, practice, minigame and player-facing systems built for multiplayer Minecraft.",
		closing: "Gameplay products cover the systems players actually touch: duel, ranked and FFA practice servers, faction clans with land claiming and alliances, armor-based classes, custom weapons with upgrades and reforging, lobby PvP, staff-mode tooling, level progression, pets with abilities, and event and minigame systems for large gatherings.",
		icon: "gamepad",
		keywords: [
			"PvP practice",
			"Clans and progression",
			"Minigames and events"
		],
		related: ["smp", "performance"]
	},
	{
		slug: "smp",
		name: "SMP",
		title: "Minecraft SMP Plugins | ArkFlame Studios",
		h1: "Minecraft SMP Plugins",
		intro: "Survival systems for combat, regions, farming, lifesteal, moderation, menus and progression.",
		closing: "SMP products cover the full survival loop: region and claim protection with flag management, combat tags and lifesteal progression, configurable spawners and harvest farming with earnable currency, synchronized orders and deliveries, crates, shards, daily rewards and playtime streaks, plus menu, lobby, punishment and weapon systems that finish the server.",
		icon: "tree",
		keywords: [
			"Land protection",
			"Survival progression",
			"Crates and currency"
		],
		related: ["gameplay", "security"]
	}
];
var CATEGORY_BY_SLUG = new Map(CATEGORIES.map((category) => [category.slug, category]));
function getCategory(slug) {
	return CATEGORY_BY_SLUG.get(slug);
}
function getCategorySlugs() {
	return CATEGORIES.map((category) => category.slug);
}
//#endregion
//#region src/components/Icon.astro
createAstro("https://arkflame.com");
var $$Icon = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Icon;
	const { name, size = 18, class: className } = Astro.props;
	const PATH = {
		search: "<circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/>",
		"shield-lock": "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10\"/><rect x=\"9\" y=\"10\" width=\"6\" height=\"5\" rx=\"1\"/><path d=\"M10 10V8a2 2 0 1 1 4 0v2\"/>",
		gauge: "<path d=\"m12 14 4-4\"/><path d=\"M3.34 19a10 10 0 1 1 17.32 0\"/>",
		network: "<rect x=\"16\" y=\"16\" width=\"6\" height=\"6\" rx=\"1\"/><rect x=\"2\" y=\"16\" width=\"6\" height=\"6\" rx=\"1\"/><rect x=\"9\" y=\"2\" width=\"6\" height=\"6\" rx=\"1\"/><path d=\"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3\"/><path d=\"M12 12V8\"/>",
		gamepad: "<line x1=\"6\" x2=\"10\" y1=\"11\" y2=\"11\"/><line x1=\"8\" x2=\"8\" y1=\"9\" y2=\"13\"/><line x1=\"15\" x2=\"15.01\" y1=\"12\" y2=\"12\"/><line x1=\"18\" x2=\"18.01\" y1=\"10\" y2=\"10\"/><path d=\"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z\"/>",
		tree: "<path d=\"M12 22v-7\"/><path d=\"M9 9h6l-3-5z\"/><path d=\"M7 14h10l-5-6z\"/><path d=\"M5 19h14l-7-8z\"/>",
		boxes: "<path d=\"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z\"/><path d=\"m7 16.5-4.74-2.85\"/><path d=\"m7 16.5 5-3\"/><path d=\"M7 16.5v5.17\"/><path d=\"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z\"/><path d=\"m17 16.5-5-3\"/><path d=\"m17 16.5 4.74-2.85\"/><path d=\"M17 16.5v5.17\"/>",
		basket: "<path d=\"m15 11-1 9\"/><path d=\"m19 11-4-7\"/><path d=\"M2 11h20\"/><path d=\"m3 11 1.5 7a2 2 0 0 0 2 1.8h11a2 2 0 0 0 2-1.8L21 11\"/><path d=\"m5 11 4-7\"/><path d=\"M9 11v9\"/>",
		github: "<path d=\"M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3\"/>",
		discord: "<path d=\"M20.3 4.4A19.8 19.8 0 0 0 15.4 2.9l-.6 1.2a18.3 18.3 0 0 0-5.5 0l-.6-1.2A19.8 19.8 0 0 0 3.7 4.4C.5 9 0 13.5.4 18a19.9 19.9 0 0 0 6 3c.5-.7.9-1.4 1.2-2.1-.7-.3-1.3-.6-1.9-.9.2-.1.3-.2.5-.3 3.9 1.8 8.1 1.8 12 0 .2.1.3.2.5.3-.6.3-1.2.6-1.9.9.4.7.7 1.4 1.2 2.1a19.9 19.9 0 0 0 6-3c.5-5.2-.8-9.7-3.7-13.6zM8 15.3c-1.2 0-2.2-1.1-2.2-2.4S6.8 10.5 8 10.5s2.2 1.1 2.2 2.4-1 2.4-2.2 2.4zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4z\"/>"
	};
	const isBrand = name === "github" || name === "discord";
	const markup = PATH[name];
	if (markup === void 0) throw new Error(`Icon: unknown icon "${name}"`);
	return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(["af-icon", className], "class:list")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24"${addAttribute(isBrand ? "currentColor" : "none", "fill")}${addAttribute(isBrand ? "none" : "currentColor", "stroke")}${addAttribute(isBrand ? void 0 : 1.8, "stroke-width")}${addAttribute(isBrand ? void 0 : "round", "stroke-linecap")}${addAttribute(isBrand ? void 0 : "round", "stroke-linejoin")} aria-hidden="true" focusable="false">${unescapeHTML(markup)}</svg>`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/components/Icon.astro", void 0);
//#endregion
//#region src/components/SiteHeader.astro
createAstro("https://arkflame.com");
var $$SiteHeader = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SiteHeader;
	const { currentPath = "/" } = Astro.props;
	const isUnder = (prefix) => prefix === "/" ? currentPath === "/" : currentPath === prefix || currentPath.startsWith(prefix);
	const pluginsActive = isUnder("/plugins");
	const docsActive = isUnder("/docs");
	const guidesActive = isUnder("/guides");
	const aboutActive = isUnder("/about");
	const primaryNav = [
		{
			label: "Docs",
			href: "/docs/",
			active: docsActive
		},
		{
			label: "Guides",
			href: "/guides/",
			active: guidesActive
		},
		{
			label: "About",
			href: "/about/",
			active: aboutActive
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<header class="site-header" data-astro-cid-fzpbxy5g><div class="af-container header-inner" data-astro-cid-fzpbxy5g><a class="brand" href="/" data-astro-cid-fzpbxy5g><img src="/assets/img/arkflame-logo.webp" alt="" width="28" height="28" data-astro-cid-fzpbxy5g><span class="wordmark" data-astro-cid-fzpbxy5g>ArkFlame Studios</span></a><nav class="nav-desktop" aria-label="Main" data-astro-cid-fzpbxy5g><ul class="nav-list" data-astro-cid-fzpbxy5g><li data-astro-cid-fzpbxy5g><details class="nav-menu" data-nav-menu data-astro-cid-fzpbxy5g><summary${addAttribute(["nav-link", { "is-active": pluginsActive }], "class:list")}${addAttribute(pluginsActive ? "page" : void 0, "aria-current")} data-astro-cid-fzpbxy5g>Plugins<span class="nav-caret" aria-hidden="true" data-astro-cid-fzpbxy5g>▾</span></summary><div class="nav-panel" data-astro-cid-fzpbxy5g><p class="nav-panel__label" data-astro-cid-fzpbxy5g>Browse by category</p><ul class="nav-panel__list" data-astro-cid-fzpbxy5g><li data-astro-cid-fzpbxy5g><a href="/plugins/" class="nav-panel__all" data-astro-cid-fzpbxy5g><span data-astro-cid-fzpbxy5g>All plugins</span><span aria-hidden="true" data-astro-cid-fzpbxy5g>→</span></a></li>${CATEGORIES.map((category) => renderTemplate`<li data-astro-cid-fzpbxy5g><a${addAttribute(`/plugins/${category.slug}/`, "href")} data-astro-cid-fzpbxy5g>${renderComponent($$result, "Icon", $$Icon, {
		"name": category.icon,
		"size": 16,
		"data-astro-cid-fzpbxy5g": true
	})}${category.name}</a></li>`)}</ul><p class="nav-panel__note" data-astro-cid-fzpbxy5g>51 plugins for Minecraft servers.</p></div></details></li>${primaryNav.map((item) => renderTemplate`<li data-astro-cid-fzpbxy5g><a${addAttribute(["nav-link", { "is-active": item.active }], "class:list")}${addAttribute(item.href, "href")} data-astro-cid-fzpbxy5g>${item.label}</a></li>`)}</ul></nav><div class="header-actions" data-astro-cid-fzpbxy5g><a class="github-link"${addAttribute(SITE.githubUrl, "href")} target="_blank" rel="noopener noreferrer" aria-label="ArkFlame on GitHub" data-astro-cid-fzpbxy5g>${renderComponent($$result, "Icon", $$Icon, {
		"name": "github",
		"size": 16,
		"data-astro-cid-fzpbxy5g": true
	})}<span data-astro-cid-fzpbxy5g>GitHub</span></a><a class="btn btn-primary browse" href="/plugins/" data-astro-cid-fzpbxy5g>Browse plugins</a></div><details class="mobile-menu" data-mobile-menu data-astro-cid-fzpbxy5g><summary aria-label="Open menu" data-astro-cid-fzpbxy5g><span class="burger" aria-hidden="true" data-astro-cid-fzpbxy5g></span>Menu</summary><div class="mobile-panel" data-astro-cid-fzpbxy5g><p class="mobile-label" data-astro-cid-fzpbxy5g>Plugins</p><ul class="mobile-list" data-astro-cid-fzpbxy5g><li data-astro-cid-fzpbxy5g><a href="/plugins/" data-astro-cid-fzpbxy5g>All plugins</a></li>${CATEGORIES.map((category) => renderTemplate`<li data-astro-cid-fzpbxy5g><a${addAttribute(`/plugins/${category.slug}/`, "href")} data-astro-cid-fzpbxy5g>${renderComponent($$result, "Icon", $$Icon, {
		"name": category.icon,
		"size": 16,
		"data-astro-cid-fzpbxy5g": true
	})}${category.name}</a></li>`)}</ul><p class="mobile-label" data-astro-cid-fzpbxy5g>Learn</p><ul class="mobile-list" data-astro-cid-fzpbxy5g>${primaryNav.map((item) => renderTemplate`<li data-astro-cid-fzpbxy5g><a${addAttribute(item.href, "href")} data-astro-cid-fzpbxy5g>${item.label}</a></li>`)}<li data-astro-cid-fzpbxy5g><a${addAttribute(SITE.githubUrl, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-fzpbxy5g>${renderComponent($$result, "Icon", $$Icon, {
		"name": "github",
		"size": 16,
		"data-astro-cid-fzpbxy5g": true
	})}GitHub</a></li></ul><a class="btn btn-primary mobile-cta" href="/plugins/" data-astro-cid-fzpbxy5g>Browse plugins</a></div></details></div></header>${renderScript($$result, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/components/SiteHeader.astro?astro&type=script&index=0&lang.ts")}`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/components/SiteHeader.astro", void 0);
//#endregion
//#region src/components/SiteFooter.astro
var $$SiteFooter = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<footer class="site-footer" data-astro-cid-nns7i3if><div class="af-container" data-astro-cid-nns7i3if><div class="footer-top" data-astro-cid-nns7i3if><a class="brand" href="/" data-astro-cid-nns7i3if><img src="/assets/img/arkflame-logo.webp" alt="" width="24" height="24" data-astro-cid-nns7i3if><span class="brand-line" data-astro-cid-nns7i3if>${SITE.brandLine}</span></a><a class="footer-cta" href="/plugins/" data-astro-cid-nns7i3if>Browse all plugins <span aria-hidden="true" data-astro-cid-nns7i3if>→</span></a></div><div class="footer-grid" data-astro-cid-nns7i3if><section class="group" aria-labelledby="footer-plugins" data-astro-cid-nns7i3if><h2 id="footer-plugins" class="group-title" data-astro-cid-nns7i3if>Plugins</h2><ul class="group-list" data-astro-cid-nns7i3if><li data-astro-cid-nns7i3if><a href="/plugins/" data-astro-cid-nns7i3if>All plugins</a></li>${CATEGORIES.map((category) => renderTemplate`<li data-astro-cid-nns7i3if><a${addAttribute(`/plugins/${category.slug}/`, "href")} data-astro-cid-nns7i3if>${category.name}</a></li>`)}</ul></section><section class="group" aria-labelledby="footer-learn" data-astro-cid-nns7i3if><h2 id="footer-learn" class="group-title" data-astro-cid-nns7i3if>Learn</h2><ul class="group-list" data-astro-cid-nns7i3if><li data-astro-cid-nns7i3if><a href="/docs/" data-astro-cid-nns7i3if>Documentation</a></li><li data-astro-cid-nns7i3if><a href="/guides/" data-astro-cid-nns7i3if>Guides</a></li><li data-astro-cid-nns7i3if><a href="/plugins/" data-astro-cid-nns7i3if>Plugin catalogue</a></li><li data-astro-cid-nns7i3if><a href="/about/" data-astro-cid-nns7i3if>About ArkFlame</a></li></ul></section><section class="group" aria-labelledby="footer-browser-tools" data-astro-cid-nns7i3if><h2 id="footer-browser-tools" class="group-title" data-astro-cid-nns7i3if>Browser tools</h2><ul class="group-list" data-astro-cid-nns7i3if><li data-astro-cid-nns7i3if><a href="/global-dom-optimizer/" data-astro-cid-nns7i3if>Global DOM Optimizer</a></li><li data-astro-cid-nns7i3if><a href="/global-dom-optimizer/privacy/" data-astro-cid-nns7i3if>Extension privacy policy</a></li></ul></section><section class="group" aria-labelledby="footer-elsewhere" data-astro-cid-nns7i3if><h2 id="footer-elsewhere" class="group-title" data-astro-cid-nns7i3if>Elsewhere</h2><ul class="group-list" data-astro-cid-nns7i3if><li data-astro-cid-nns7i3if><a${addAttribute(SITE.githubUrl, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-nns7i3if>${renderComponent($$result, "Icon", $$Icon, {
		"name": "github",
		"size": 15,
		"data-astro-cid-nns7i3if": true
	})}GitHub</a></li><li data-astro-cid-nns7i3if><a${addAttribute(SITE.discordUrl, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-nns7i3if>${renderComponent($$result, "Icon", $$Icon, {
		"name": "discord",
		"size": 15,
		"data-astro-cid-nns7i3if": true
	})}Discord</a></li><li data-astro-cid-nns7i3if><a${addAttribute(SITE.builtByBitUrl, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-nns7i3if>${renderComponent($$result, "Icon", $$Icon, {
		"name": "basket",
		"size": 15,
		"data-astro-cid-nns7i3if": true
	})}BuiltByBit resources</a></li><li data-astro-cid-nns7i3if><a${addAttribute(SITE.founderUrl, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-nns7i3if>Founder site</a></li></ul></section></div><p class="disclaimer" data-astro-cid-nns7i3if>${SITE.nonAffiliation}</p></div></footer>`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/components/SiteFooter.astro", void 0);
//#endregion
//#region src/layouts/BaseLayout.astro
createAstro("https://arkflame.com");
var $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const { title, description, canonicalPath, image = SITE.ogImage, noindex = false, jsonLd, ogType = "website" } = Astro.props;
	const canonicalHref = new URL(canonicalPath, SITE.siteUrl).href;
	const ogImageHref = new URL(image, SITE.siteUrl).href;
	const isDefaultOgImage = ogImageHref === new URL(SITE.ogImage, SITE.siteUrl).href;
	const robots = noindex === true ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
	const jsonLdPayload = jsonLd === void 0 ? void 0 : JSON.stringify(jsonLd).replace(/</g, "\\u003c");
	return renderTemplate`<html lang="en" data-astro-cid-z4jru4n3><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="robots"${addAttribute(robots, "content")}><meta name="author"${addAttribute(SITE.name, "content")}><meta name="theme-color" content="#050810"><link rel="canonical"${addAttribute(canonicalHref, "href")}><meta property="og:type"${addAttribute(ogType, "content")}><meta property="og:site_name"${addAttribute(SITE.name, "content")}><meta property="og:locale" content="en_US"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonicalHref, "content")}><meta property="og:image"${addAttribute(ogImageHref, "content")}><meta property="og:image:type" content="image/webp">${isDefaultOgImage && renderTemplate`<meta property="og:image:width" content="1200">`}${isDefaultOgImage && renderTemplate`<meta property="og:image:height" content="630">`}<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImageHref, "content")}><link rel="icon" href="/favicon.webp" type="image/webp" sizes="any"><link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="32x32"><link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.webp"><link rel="manifest" href="/site.webmanifest"><link rel="sitemap" href="/sitemap-index.xml"><link rel="preload" href="/fonts/outfit-400.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/fonts/rajdhani-700.woff2" as="font" type="font/woff2" crossorigin>${jsonLdPayload && renderTemplate`<script type="application/ld+json">${unescapeHTML(jsonLdPayload)}<\/script>`}${renderHead($$result)}</head><body data-astro-cid-z4jru4n3><a href="#main" class="af-sr-only af-skip" data-astro-cid-z4jru4n3>Skip to content</a>${renderComponent($$result, "SiteHeader", $$SiteHeader, {
		"currentPath": Astro.url.pathname,
		"data-astro-cid-z4jru4n3": true
	})}<main id="main" tabindex="-1" data-astro-cid-z4jru4n3>${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "SiteFooter", $$SiteFooter, { "data-astro-cid-z4jru4n3": true })}</body></html>`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/layouts/BaseLayout.astro", void 0);
//#endregion
export { getCategorySlugs as a, SITE as c, __exportAll as d, getCategory as i, renderScript as l, $$Icon as n, HERO as o, CATEGORIES as r, PLATFORM_STRIP as s, $$BaseLayout as t, createComponent as u };
