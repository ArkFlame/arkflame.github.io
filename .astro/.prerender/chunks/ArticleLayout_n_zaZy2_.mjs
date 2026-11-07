import { l as renderScript, u as createComponent } from "./BaseLayout_BfJGYEgU.mjs";
import { O as createAstro, c as renderComponent, f as renderSlot, g as maybeRenderHead, h as renderTemplate, l as Fragment, v as addAttribute } from "./server_C1-8vluA.mjs";
//#region src/components/ArticleLayout.astro
createAstro("https://arkflame.com");
var $$ArticleLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ArticleLayout;
	const { eyebrow, title, description, updated, author, headings, backHref, backLabel, sectionLabel, drawerLabel = "Documentation and contents" } = Astro.props;
	const toc = headings.filter((heading) => heading.depth === 2 || heading.depth === 3);
	const updatedLabel = updated.toISOString().slice(0, 10);
	const published = updated.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC"
	});
	return renderTemplate`${maybeRenderHead($$result)}<article class="af-article af-container" data-astro-cid-57dfxhfu><nav class="af-breadcrumb" aria-label="Breadcrumb" data-astro-cid-57dfxhfu><ol data-astro-cid-57dfxhfu><li data-astro-cid-57dfxhfu><a href="/" data-astro-cid-57dfxhfu>Home</a></li><li data-astro-cid-57dfxhfu><a${addAttribute(backHref, "href")} data-astro-cid-57dfxhfu>${backLabel}</a></li><li aria-current="page" data-astro-cid-57dfxhfu>${title}</li></ol></nav><header class="af-article__head" data-astro-cid-57dfxhfu><p class="af-eyebrow" data-astro-cid-57dfxhfu>${eyebrow}</p><h1 data-astro-cid-57dfxhfu>${title}</h1><p class="af-article__desc" data-astro-cid-57dfxhfu>${description}</p><p class="af-article__meta" data-astro-cid-57dfxhfu><span data-astro-cid-57dfxhfu>${sectionLabel}</span><span aria-hidden="true" data-astro-cid-57dfxhfu>·</span><time${addAttribute(updatedLabel, "datetime")} data-astro-cid-57dfxhfu>Updated ${published}</time>${author !== void 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<span aria-hidden="true" data-astro-cid-57dfxhfu>·</span><span data-astro-cid-57dfxhfu>${author}</span>` })}`}</p></header><div class="af-article__layout" data-astro-cid-57dfxhfu><details class="af-article__drawer" open data-astro-cid-57dfxhfu><summary data-astro-cid-57dfxhfu>${drawerLabel}</summary><div class="af-article__aside" data-astro-cid-57dfxhfu>${renderSlot($$result, $$slots["sidebar"])}${toc.length > 0 && renderTemplate`<nav class="af-toc" aria-label="On this page" data-astro-cid-57dfxhfu><p class="af-toc__label" data-astro-cid-57dfxhfu>On this page</p><ol data-astro-cid-57dfxhfu>${toc.map((heading) => renderTemplate`<li${addAttribute([{ "af-toc__sub": heading.depth === 3 }], "class:list")} data-astro-cid-57dfxhfu><a${addAttribute(`#${heading.slug}`, "href")} data-astro-cid-57dfxhfu>${heading.text}</a></li>`)}</ol></nav>`}</div></details><div class="af-article__main" data-astro-cid-57dfxhfu><div class="af-prose" data-prose data-astro-cid-57dfxhfu>${renderSlot($$result, $$slots["default"])}</div>${renderSlot($$result, $$slots["footer"])}</div></div></article>${renderScript($$result, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/components/ArticleLayout.astro?astro&type=script&index=0&lang.ts")}`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/components/ArticleLayout.astro", void 0);
//#endregion
export { $$ArticleLayout as t };
