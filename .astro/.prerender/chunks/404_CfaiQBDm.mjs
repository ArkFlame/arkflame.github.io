import { d as __exportAll, t as $$BaseLayout, u as createComponent } from "./BaseLayout_BfJGYEgU.mjs";
import { c as renderComponent, g as maybeRenderHead, h as renderTemplate } from "./server_C1-8vluA.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Page not found | ArkFlame Studios",
		"description": "The page you requested does not exist on arkflame.com.",
		"canonicalPath": "/404.html",
		"noindex": true,
		"data-astro-cid-ibpinaeu": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="nf af-section" data-astro-cid-ibpinaeu><div class="af-container" data-astro-cid-ibpinaeu><p class="af-eyebrow" data-astro-cid-ibpinaeu>404</p><h1 data-astro-cid-ibpinaeu>Page not found</h1><p class="nf__body" data-astro-cid-ibpinaeu>That address does not match a page on this site. Use the links below, or go back and check the URL.</p><div class="nf__actions" data-astro-cid-ibpinaeu><a class="btn btn-primary" href="/" data-astro-cid-ibpinaeu>Go home</a><a class="btn" href="/plugins/" data-astro-cid-ibpinaeu>Browse plugins</a></div></div></section>` })}`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/404.astro", void 0);
var $$file = "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/404.astro";
var $$url = "/404";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
