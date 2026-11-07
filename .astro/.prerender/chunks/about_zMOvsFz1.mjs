import { c as SITE, d as __exportAll, t as $$BaseLayout, u as createComponent } from "./BaseLayout_BbbSybKV.mjs";
import { c as renderComponent, g as maybeRenderHead, h as renderTemplate, v as addAttribute } from "./server_C1-8vluA.mjs";
//#region src/pages/about.astro
var about_exports = /* @__PURE__ */ __exportAll({
	default: () => $$About,
	file: () => $$file,
	url: () => $$url
});
var $$About = createComponent(($$result, $$props, $$slots) => {
	const description = "ArkFlame Studios builds Minecraft server, security, performance and gameplay software. It is built by LinsaFTW, an Argentine software developer.";
	const buildAreas = [
		{
			label: "Security",
			href: "/plugins/security/",
			body: "Exploit protection, anticheat, authentication and abuse prevention for servers and networks."
		},
		{
			label: "Performance",
			href: "/plugins/performance/",
			body: "Optimization tools for entity load, redstone abuse, runtime stability and high-load servers."
		},
		{
			label: "Network",
			href: "/plugins/network/",
			body: "Proxy infrastructure for networks running Velocity or Bungee-compatible proxies."
		},
		{
			label: "Gameplay",
			href: "/plugins/gameplay/",
			body: "PvP, practice, minigame and player-facing systems for multiplayer servers."
		}
	];
	const milestones = [
		"FlameCord — verified public BuiltByBit launch: 2020-02-01",
		"VeloFlame — verified public BuiltByBit launch: 2025-10-27",
		"Public article consolidating “ArkFlame Studios as the main hub” — 2026-05-28",
		"FairPlay — verified public BuiltByBit launch: 2026-06-12"
	];
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "About ArkFlame Studios | Minecraft Infrastructure Software",
		"description": description,
		"canonicalPath": "/about/",
		"jsonLd": {
			"@context": "https://schema.org",
			"@graph": [{
				"@type": "AboutPage",
				"@id": "https://arkflame.com/about/#aboutpage",
				name: "About ArkFlame Studios | Minecraft Infrastructure Software",
				url: "https://arkflame.com/about/",
				isPartOf: { "@id": "https://arkflame.com/#website" },
				mainEntity: { "@id": "https://arkflame.com/#organization" }
			}, {
				"@type": "BreadcrumbList",
				"@id": "https://arkflame.com/about/#breadcrumb",
				itemListElement: [{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: "https://arkflame.com/"
				}, {
					"@type": "ListItem",
					position: 2,
					name: "About",
					item: "https://arkflame.com/about/"
				}]
			}]
		},
		"data-astro-cid-ta2fbyqs": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="af-container" data-astro-cid-ta2fbyqs> <nav class="ab-crumb" aria-label="Breadcrumb" data-astro-cid-ta2fbyqs> <ol data-astro-cid-ta2fbyqs> <li data-astro-cid-ta2fbyqs><a href="/" data-astro-cid-ta2fbyqs>Home</a></li> <li data-astro-cid-ta2fbyqs><span aria-current="page" data-astro-cid-ta2fbyqs>About</span></li> </ol> </nav> </div> <section class="af-section ab-lead" aria-labelledby="ab-about-heading" data-astro-cid-ta2fbyqs> <div class="af-container" data-astro-cid-ta2fbyqs> <p class="af-eyebrow" data-astro-cid-ta2fbyqs>ABOUT</p> <h1 data-astro-cid-ta2fbyqs>About ArkFlame Studios</h1> <h2 id="ab-about-heading" data-astro-cid-ta2fbyqs>ArkFlame Studios</h2> <p class="ab-lede" data-astro-cid-ta2fbyqs>
ArkFlame Studios builds Minecraft infrastructure, security, performance,
        authentication, anticheat and gameplay software.
</p> <p class="ab-copy" data-astro-cid-ta2fbyqs>
We build infrastructure software, not resource packs, shaders or client
        mods. Our products run on the server or proxy, where abuse filtering,
        load control and network entry protection have to happen.
</p> <p class="ab-copy" data-astro-cid-ta2fbyqs>
Each product page lists its own supported platforms and versions. Check
        that page before you deploy. Nothing here is a guarantee for an
        environment you haven't tested. Minecraft is a trademark of Mojang
        Studios. ArkFlame Studios is not affiliated with Mojang or Microsoft.
</p> </div> </section> <section class="af-section" aria-labelledby="ab-build-heading" data-astro-cid-ta2fbyqs> <div class="af-container" data-astro-cid-ta2fbyqs> <h2 id="ab-build-heading" data-astro-cid-ta2fbyqs>What we build</h2> <p class="ab-copy" data-astro-cid-ta2fbyqs>
Our catalogue has four areas. Authentication and anticheat sit under
        security. Proxy and ingress control sit under network. Security
        products cover crash and dupe exploit protection, packet abuse
        filtering, combat anticheat and premium authentication bridges. Network
        software guards the entry point of a network, not a single server.
</p> <ul class="ab-areas" data-astro-cid-ta2fbyqs> ${buildAreas.map((area) => renderTemplate`<li class="af-card ab-area" data-astro-cid-ta2fbyqs> <a class="af-chip"${addAttribute(area.href, "href")} data-astro-cid-ta2fbyqs>${area.label}</a> <p data-astro-cid-ta2fbyqs>${area.body}</p> </li>`)} </ul> <p class="ab-copy" data-astro-cid-ta2fbyqs>
Products cover legacy and modern Minecraft, including Paper, Folia,
        Velocity and BungeeCord. Our work focuses on packet handling,
        concurrency, cross-version compatibility, runtime cost and security
        boundaries.
</p> </div> </section> <section class="af-section" aria-labelledby="ab-roots-heading" data-astro-cid-ta2fbyqs> <div class="af-container" data-astro-cid-ta2fbyqs> <h2 id="ab-roots-heading" data-astro-cid-ta2fbyqs>Public roots</h2> <p class="ab-copy" data-astro-cid-ta2fbyqs>
ArkFlame Network independently documents ArkFlame-branded Minecraft
        activity from 2013-11-29. That shows the brand's public roots. It does
        not say when the current company started.
</p> <p class="ab-copy" data-astro-cid-ta2fbyqs>Public product and hub milestones:</p> <ol class="ab-milestones" data-astro-cid-ta2fbyqs> ${milestones.map((milestone) => renderTemplate`<li data-astro-cid-ta2fbyqs>${milestone}</li>`)} </ol> <p class="ab-copy" data-astro-cid-ta2fbyqs>
Each BuiltByBit entry is the first public release date listed on that
        product's marketplace page. The 2026-05-28 entry is the public article
        that made ArkFlame Studios the main hub for the surrounding work. These
        are release and publication dates, not corporate milestones.
</p> </div> </section> <section class="af-section" aria-labelledby="ab-founder-heading" data-astro-cid-ta2fbyqs> <div class="af-container" data-astro-cid-ta2fbyqs> <div class="ab-founder af-card" data-astro-cid-ta2fbyqs> <img${addAttribute(SITE.founderImage, "src")} alt="Juan Cruz Linsalata (LinsaFTW)" width="512" height="512" loading="eager" decoding="async" data-astro-cid-ta2fbyqs> <div class="ab-founder-copy" data-astro-cid-ta2fbyqs> <h2 id="ab-founder-heading" data-astro-cid-ta2fbyqs>Founder</h2> <p class="ab-founder-role" data-astro-cid-ta2fbyqs>Founder &amp; Developer</p> <p class="ab-copy" data-astro-cid-ta2fbyqs>
Juan Cruz Linsalata, known online as LinsaFTW, is an Argentine
            software developer and the builder behind ArkFlame Studios.
</p> <p class="ab-copy" data-astro-cid-ta2fbyqs>
LinsaFTW says he has been coding since 2010. That's his personal
            history, not a start date for this company. He designs, builds and
            releases the products listed here. Support questions go through the
            public channels linked on each product page.
</p> <a class="btn btn-primary"${addAttribute(SITE.founderUrl, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-ta2fbyqs>
Meet LinsaFTW
</a> </div> </div> </div> </section> <div class="af-container ab-cta" data-astro-cid-ta2fbyqs> <a class="btn btn-primary" href="/plugins/" data-astro-cid-ta2fbyqs>Browse plugins</a> </div> ` })}`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/about.astro", void 0);
var $$file = "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/about.astro";
var $$url = "/about";
//#endregion
//#region \0virtual:astro:page:src/pages/about@_@astro
var page = () => about_exports;
//#endregion
export { page };
