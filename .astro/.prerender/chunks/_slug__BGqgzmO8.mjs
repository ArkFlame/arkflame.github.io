import { a as getCategorySlugs, c as SITE, d as __exportAll, i as getCategory, n as $$Icon, t as $$BaseLayout, u as createComponent } from "./BaseLayout_BbbSybKV.mjs";
import { E as unescapeHTML, O as createAstro, c as renderComponent, g as maybeRenderHead, h as renderTemplate, v as addAttribute } from "./server_C1-8vluA.mjs";
import { t as getCollection } from "./_astro_content_BhMQd4m0.mjs";
import { r as getProductsByCategory, t as PRODUCTS } from "./products_DHgwqqLo.mjs";
import { a as getArtworkSize, i as formatPrice, n as STATS_AS_OF, o as getResponsiveSrcSet, r as STORE_STATS, s as getProductDetail, t as $$ProductCard } from "./ProductCard_DpDHeIV9.mjs";
//#region src/components/CategoryPage.astro
createAstro("https://arkflame.com");
var $$CategoryPage = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CategoryPage;
	const { category } = Astro.props;
	const products = getProductsByCategory(category.slug);
	const related = category.related.map((slug) => getCategory(slug)).filter((info) => info !== void 0).slice(0, 2);
	return renderTemplate`${maybeRenderHead($$result)}<article class="af-container af-section af-category-page" data-astro-cid-frijjfxp> <nav class="af-breadcrumb" aria-label="Breadcrumb" data-astro-cid-frijjfxp> <ol data-astro-cid-frijjfxp> <li data-astro-cid-frijjfxp><a href="/" data-astro-cid-frijjfxp>Home</a></li> <li data-astro-cid-frijjfxp><a href="/plugins/" data-astro-cid-frijjfxp>Plugins</a></li> <li aria-current="page" data-astro-cid-frijjfxp>${category.name}</li> </ol> </nav> <h1 data-astro-cid-frijjfxp>${category.h1}</h1> <p class="af-category-page__intro" data-astro-cid-frijjfxp>${category.intro}</p> <section class="af-category-page__products" aria-labelledby="category-products-heading" data-astro-cid-frijjfxp> <h2 class="af-category-page__heading" id="category-products-heading" data-astro-cid-frijjfxp> ${renderComponent($$result, "Icon", $$Icon, {
		"name": category.icon,
		"size": 20,
		"data-astro-cid-frijjfxp": true
	})} ${category.name} plugins
</h2> ${products.length === 0 ? renderTemplate`<p class="af-category-page__note" data-astro-cid-frijjfxp>No plugins are listed in this category yet.</p>` : renderTemplate`<ul class="af-category-page__list" data-astro-cid-frijjfxp> ${products.map((product) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, {
		"product": product,
		"headingLevel": "h3",
		"data-astro-cid-frijjfxp": true
	})}`)} </ul>`} </section> <p class="af-category-page__closing" data-astro-cid-frijjfxp>${category.closing}</p> <nav class="af-category-page__nav" aria-label="Plugin categories" data-astro-cid-frijjfxp> <a class="btn" href="/plugins/" data-astro-cid-frijjfxp>All plugins</a> ${related.map((info) => renderTemplate`<a class="btn"${addAttribute(`/plugins/${info.slug}/`, "href")} data-astro-cid-frijjfxp>${info.name}</a>`)} </nav> </article>`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/components/CategoryPage.astro", void 0);
//#endregion
//#region src/components/ProductPage.astro
createAstro("https://arkflame.com");
var $$ProductPage = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductPage;
	const { product } = Astro.props;
	const category = getCategory(product.category);
	const categoryName = category?.name ?? product.category;
	const detail = getProductDetail(product);
	const size = getArtworkSize(product.slug);
	const isSquare = size !== void 0 && size.width === size.height;
	const docsEntry = (await getCollection("docs")).sort((a, b) => b.data.updated.getTime() - a.data.updated.getTime()).find((entry) => entry.data.plugin === product.slug);
	const guides = (await getCollection("guides")).filter((entry) => entry.data.relatedPlugins.includes(product.slug)).sort((a, b) => b.data.updated.getTime() - a.data.updated.getTime()).slice(0, 3);
	const related = getProductsByCategory(product.category).filter((candidate) => candidate.slug !== product.slug).slice(0, 3);
	const compatibility = detail.compatibility;
	function cleanVersion(value, prefixes) {
		if (value === void 0) return void 0;
		let text = value.split(";")[0].trim();
		for (const prefix of prefixes) if (text.toLowerCase().startsWith(prefix.toLowerCase())) {
			text = text.slice(prefix.length).trim();
			break;
		}
		if (/^(no|not)\b/i.test(text)) return void 0;
		return text.length > 0 ? text : void 0;
	}
	const minecraft = cleanVersion(compatibility?.minecraft, [
		"README states ",
		"Protocol table covers ",
		"Protocol constants cover "
	]);
	const javaClean = cleanVersion(compatibility?.java, [
		"Compile target ",
		"Build toolchain ",
		"README requires ",
		"Backend runtime "
	])?.replace(/ per repository.*$/i, "").replace(/ per README.*$/i, "");
	const stat = STORE_STATS[product.slug];
	const priceLabel = stat?.price !== void 0 ? formatPrice(stat.price) : stat?.free === true ? "Free" : void 0;
	const ratingLabel = stat?.rating !== void 0 && stat.ratings !== void 0 && stat.ratings >= 1 ? `★ ${stat.rating} (${stat.ratings} ${stat.ratings === 1 ? "rating" : "ratings"})` : void 0;
	const countLabel = stat?.purchases !== void 0 ? `${stat.purchases.toLocaleString("en-US")} purchases` : stat?.downloads !== void 0 ? `${stat.downloads.toLocaleString("en-US")} downloads` : void 0;
	const docUrl = docsEntry !== void 0 ? `${SITE.siteUrl}/docs/${docsEntry.id}/` : void 0;
	const faq = [{
		q: `Where can I buy ${product.name}?`,
		a: `${product.name} is sold on BuiltByBit: ${product.storeUrl}`
	}];
	if (compatibility?.platforms !== void 0) faq.push({
		q: `Which platforms does ${product.name} support?`,
		a: `${compatibility.platforms.join(", ")}.`
	});
	if (compatibility !== void 0) faq.push({
		q: `Does ${product.name} support Folia?`,
		a: compatibility.folia === "declared" ? "Yes. The repository declares Folia support." : "Folia support is not declared in the repository."
	});
	if (docUrl !== void 0) faq.push({
		q: `Where is the ${product.name} documentation?`,
		a: `${docsEntry?.data.title}: ${docUrl}`
	});
	faq.push({
		q: "Where can I get support?",
		a: `Join the ArkFlame Discord: ${SITE.discordUrl}`
	});
	const faqLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": faq.map(({ q, a }) => ({
			"@type": "Question",
			"name": q,
			"acceptedAnswer": {
				"@type": "Answer",
				"text": a
			}
		}))
	};
	const faqLdPayload = JSON.stringify(faqLd).replace(/</g, "\\u003c");
	return renderTemplate`${maybeRenderHead($$result)}<article class="af-product af-container" data-astro-cid-eph2s77r> <nav class="af-breadcrumb" aria-label="Breadcrumb" data-astro-cid-eph2s77r> <ol data-astro-cid-eph2s77r> <li data-astro-cid-eph2s77r><a href="/" data-astro-cid-eph2s77r>Home</a></li> <li data-astro-cid-eph2s77r><a href="/plugins/" data-astro-cid-eph2s77r>Plugins</a></li> <li data-astro-cid-eph2s77r><a${addAttribute(`/plugins/${product.category}/`, "href")} data-astro-cid-eph2s77r>${categoryName}</a></li> <li aria-current="page" data-astro-cid-eph2s77r>${product.name}</li> </ol> </nav> <header class="af-product__hero" data-astro-cid-eph2s77r> <div${addAttribute(["af-product__media", { "af-product__media--square": isSquare }], "class:list")} data-astro-cid-eph2s77r> ${product.image !== void 0 ? renderTemplate`<img${addAttribute(product.image, "src")}${addAttribute(getResponsiveSrcSet(product.image, size), "srcset")} sizes="(max-width: 900px) 100vw, 560px" alt="" loading="eager" decoding="async" fetchpriority="high"${addAttribute(size?.width, "width")}${addAttribute(size?.height, "height")} data-astro-cid-eph2s77r>` : renderTemplate`<div class="af-product__placeholder" data-astro-cid-eph2s77r> ${category !== void 0 && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": category.icon,
		"size": 42,
		"data-astro-cid-eph2s77r": true
	})}`} <span data-astro-cid-eph2s77r>${product.name}</span> <small data-astro-cid-eph2s77r>${categoryName}</small> </div>`} </div> <div class="af-product__copy" data-astro-cid-eph2s77r> <p class="af-product__kicker" data-astro-cid-eph2s77r> <a${addAttribute(`/plugins/${product.category}/`, "href")} data-astro-cid-eph2s77r>${categoryName}</a> </p> <h1 data-astro-cid-eph2s77r>${product.name}</h1> <p class="af-product__summary" data-astro-cid-eph2s77r>${product.summary}</p> ${product.tags.length > 0 && renderTemplate`<ul class="af-product__tags" aria-label="Tags" data-astro-cid-eph2s77r> ${product.tags.map((tag) => renderTemplate`<li class="af-chip" data-astro-cid-eph2s77r>${tag}</li>`)} </ul>`} ${(priceLabel !== void 0 || ratingLabel !== void 0 || countLabel !== void 0) && renderTemplate`<ul class="af-product__stats" aria-label="Store stats" data-astro-cid-eph2s77r> ${priceLabel !== void 0 && renderTemplate`<li class="af-product__price" data-astro-cid-eph2s77r>${priceLabel}</li>`} ${ratingLabel !== void 0 && renderTemplate`<li data-astro-cid-eph2s77r>${ratingLabel}</li>`} ${countLabel !== void 0 && renderTemplate`<li data-astro-cid-eph2s77r>${countLabel}</li>`} </ul>`} <p class="af-product__asof" data-astro-cid-eph2s77r>
Stats as of <time${addAttribute(STATS_AS_OF, "datetime")} data-astro-cid-eph2s77r>${STATS_AS_OF}</time> on BuiltByBit
</p> <div class="af-product__cta" data-astro-cid-eph2s77r> <a class="btn btn-primary"${addAttribute(product.storeUrl, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-eph2s77r>
Get on BuiltByBit
</a> ${docsEntry !== void 0 ? renderTemplate`<a class="af-product__text-link"${addAttribute(`/docs/${docsEntry.id}/`, "href")} data-astro-cid-eph2s77r>Read documentation →</a>` : renderTemplate`<a class="af-product__text-link" href="#compatibility" data-astro-cid-eph2s77r>Check compatibility →</a>`} </div> ${product.officialUrl !== void 0 && renderTemplate`<p class="af-product__official" data-astro-cid-eph2s77r> <a${addAttribute(product.officialUrl, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-eph2s77r>
Official website <span aria-hidden="true" data-astro-cid-eph2s77r>↗</span> </a> </p>`} </div> </header> <div class="af-buybar" aria-hidden="true" data-astro-cid-eph2s77r> <p class="af-buybar__name" data-astro-cid-eph2s77r>${product.name}</p> ${priceLabel !== void 0 && renderTemplate`<p class="af-buybar__price" data-astro-cid-eph2s77r>${priceLabel}</p>`} <a class="btn btn-primary btn-sm"${addAttribute(product.storeUrl, "href")} target="_blank" rel="noopener noreferrer" tabindex="-1" data-astro-cid-eph2s77r>
Get on BuiltByBit
</a> </div> <div class="af-product__layout" data-astro-cid-eph2s77r> <nav class="af-product__anchors" aria-label="On this page" data-astro-cid-eph2s77r> <a href="#overview" data-astro-cid-eph2s77r>Overview</a> <a href="#features" data-astro-cid-eph2s77r>Features</a> <a href="#compatibility" data-astro-cid-eph2s77r>Compatibility</a> <a href="#documentation" data-astro-cid-eph2s77r>Documentation</a> <a href="#faq" data-astro-cid-eph2s77r>FAQ</a> </nav> <div class="af-product__sections" data-astro-cid-eph2s77r> <section id="overview" class="af-product__section" data-astro-cid-eph2s77r> <h2 data-astro-cid-eph2s77r>Overview</h2> <p data-astro-cid-eph2s77r>${detail.description}</p> </section> <section id="features" class="af-product__section" data-astro-cid-eph2s77r> <h2 data-astro-cid-eph2s77r>What it covers</h2> <ul class="af-product__features" data-astro-cid-eph2s77r> ${detail.highlights.map((highlight) => renderTemplate`<li data-astro-cid-eph2s77r> <span class="af-product__tick" aria-hidden="true" data-astro-cid-eph2s77r>✓</span> ${highlight} </li>`)} </ul> </section> <section id="compatibility" class="af-product__section" data-astro-cid-eph2s77r> <h2 data-astro-cid-eph2s77r>Compatibility</h2> ${compatibility !== void 0 ? renderTemplate`<dl class="af-product__facts" data-astro-cid-eph2s77r> ${compatibility.platforms !== void 0 && renderTemplate`<div data-astro-cid-eph2s77r> <dt data-astro-cid-eph2s77r>Platforms</dt> <dd data-astro-cid-eph2s77r>${compatibility.platforms.join(", ")}</dd> </div>`} ${minecraft !== void 0 && renderTemplate`<div data-astro-cid-eph2s77r> <dt data-astro-cid-eph2s77r>Minecraft</dt> <dd data-astro-cid-eph2s77r>${minecraft}</dd> </div>`} ${javaClean !== void 0 && renderTemplate`<div data-astro-cid-eph2s77r> <dt data-astro-cid-eph2s77r>Java</dt> <dd data-astro-cid-eph2s77r>${javaClean}</dd> </div>`} ${compatibility.folia === "declared" && renderTemplate`<div data-astro-cid-eph2s77r> <dt data-astro-cid-eph2s77r>Folia</dt> <dd data-astro-cid-eph2s77r>Supported</dd> </div>`} </dl>` : renderTemplate`<p class="af-product__compat-line" data-astro-cid-eph2s77r>Built for standard Minecraft server platforms.</p>`} </section> <section id="documentation" class="af-product__section" data-astro-cid-eph2s77r> <h2 data-astro-cid-eph2s77r>Documentation and install</h2> ${docsEntry !== void 0 ? renderTemplate`<a class="af-product__docs-card"${addAttribute(`/docs/${docsEntry.id}/`, "href")} data-astro-cid-eph2s77r> <span class="af-product__docs-kicker" data-astro-cid-eph2s77r>Quick start</span> <span class="af-product__docs-title" data-astro-cid-eph2s77r>${docsEntry.data.title}</span> <span class="af-product__docs-desc" data-astro-cid-eph2s77r>${docsEntry.data.description}</span> <span class="af-product__docs-meta" data-astro-cid-eph2s77r>
Updated ${docsEntry.data.updated.toISOString().slice(0, 10)} </span> </a>` : renderTemplate`<p data-astro-cid-eph2s77r>
Install from the current BuiltByBit release. The listing carries the artifact and its requirements.
</p>`} </section> ${guides.length > 0 && renderTemplate`<section class="af-product__section" aria-labelledby="related-guides" data-astro-cid-eph2s77r> <h2 id="related-guides" data-astro-cid-eph2s77r>Guides</h2> <ul class="af-product__guide-list" data-astro-cid-eph2s77r> ${guides.map((guide) => renderTemplate`<li data-astro-cid-eph2s77r> <a${addAttribute(`/guides/${guide.id}/`, "href")} data-astro-cid-eph2s77r>${guide.data.title}</a> <p data-astro-cid-eph2s77r>${guide.data.description}</p> </li>`)} </ul> </section>`} <section id="faq" class="af-product__section" aria-labelledby="faq-title" data-astro-cid-eph2s77r> <h2 id="faq-title" data-astro-cid-eph2s77r>FAQ</h2> <dl class="af-product__faq" data-astro-cid-eph2s77r> ${faq.map(({ q, a }) => renderTemplate`<div data-astro-cid-eph2s77r> <dt data-astro-cid-eph2s77r>${q}</dt> <dd data-astro-cid-eph2s77r>${a}</dd> </div>`)} </dl> </section> <script type="application/ld+json">${unescapeHTML(faqLdPayload)}<\/script>${related.length > 0 && renderTemplate`<section class="af-product__section" aria-labelledby="related-products" data-astro-cid-eph2s77r> <h2 id="related-products" data-astro-cid-eph2s77r>Related products</h2> <ul class="af-product__related" data-astro-cid-eph2s77r> ${related.map((item) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, {
		"product": item,
		"headingLevel": "h3",
		"data-astro-cid-eph2s77r": true
	})}`)} </ul> </section>`} </div> </div> </article>`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/components/ProductPage.astro", void 0);
//#endregion
//#region src/pages/plugins/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://arkflame.com");
async function getStaticPaths() {
	const paths = [...getCategorySlugs().map((slug) => ({
		params: { slug },
		props: {
			pageType: "category",
			category: getCategory(slug)
		}
	})), ...PRODUCTS.map((product) => ({
		params: { slug: product.slug },
		props: {
			pageType: "product",
			product
		}
	}))];
	const seen = /* @__PURE__ */ new Set();
	for (const entry of paths) {
		const key = String(entry.params.slug);
		if (seen.has(key)) throw new Error(`Duplicate /plugins/ route: ${key}`);
		seen.add(key);
	}
	return paths;
}
var $$Slug = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { pageType, ...rest } = Astro.props;
	const CATEGORY_TITLE_PHRASE = {
		security: "Minecraft security plugin",
		performance: "Minecraft performance plugin",
		network: "Minecraft proxy software",
		gameplay: "Minecraft gameplay plugin",
		smp: "Minecraft SMP plugin"
	};
	const abs = (path) => new URL(path, SITE.siteUrl).href;
	function metaTitle(name, phrase) {
		const full = `${name} — ${phrase} | ArkFlame`;
		if (full.length <= 60) return full;
		const short = `${name} — ${phrase}`;
		return short.length <= 60 ? short : `${short.slice(0, 59).trimEnd()}…`;
	}
	function metaDescription(name, phrase, summary) {
		const suffix = " Get it on BuiltByBit.";
		const head = `${name}: ${phrase}. ${summary}`.replace(/\s+/g, " ").trim();
		return `${head.length <= 133 ? head : `${head.slice(0, 132).replace(/\s+\S*$/, "")}…`}${suffix}`;
	}
	const homeUrl = `${SITE.siteUrl}/`;
	const websiteId = `${SITE.siteUrl}/#website`;
	const pluginsUrl = abs("/plugins/");
	const breadcrumbs = (trail) => [{
		"@type": "ListItem",
		"position": 1,
		"name": "Home",
		"item": homeUrl
	}, ...trail.map((entry, index) => ({
		"@type": "ListItem",
		"position": index + 2,
		"name": entry.name,
		"item": entry.url
	}))];
	let jsonLd;
	if ("category" in rest) {
		const category = rest.category;
		const categoryUrl = abs(`/plugins/${category.slug}/`);
		jsonLd = {
			"@context": "https://schema.org",
			"@graph": [{
				"@type": "CollectionPage",
				"@id": `${categoryUrl}#collection`,
				"name": category.h1,
				"url": categoryUrl,
				"description": category.intro,
				"isPartOf": { "@id": websiteId },
				"breadcrumb": { "@id": `${categoryUrl}#breadcrumb` }
			}, {
				"@type": "BreadcrumbList",
				"@id": `${categoryUrl}#breadcrumb`,
				"itemListElement": breadcrumbs([{
					name: "Minecraft Plugins",
					url: pluginsUrl
				}, {
					name: category.name,
					url: categoryUrl
				}])
			}]
		};
	} else if ("product" in rest) {
		const product = rest.product;
		const category = getCategory(product.category);
		if (category === void 0) throw new Error(`plugins/[slug]: unknown category "${product.category}" for product "${product.slug}"`);
		const productUrl = abs(`/plugins/${product.slug}/`);
		const categoryUrl = abs(`/plugins/${category.slug}/`);
		const imagePath = product.image ?? SITE.ogImage;
		jsonLd = {
			"@context": "https://schema.org",
			"@graph": [{
				"@type": "SoftwareApplication",
				"@id": `${productUrl}#software`,
				"name": product.name,
				"url": productUrl,
				"description": product.summary,
				"image": `${SITE.siteUrl}${imagePath}`,
				"keywords": product.tags.join(", "),
				"applicationCategory": "GameApplication",
				"operatingSystem": "Java",
				"isPartOf": { "@id": websiteId },
				"publisher": {
					"@type": "Organization",
					"name": SITE.name,
					"url": `${SITE.siteUrl}/`
				}
			}, {
				"@type": "BreadcrumbList",
				"@id": `${productUrl}#breadcrumb`,
				"itemListElement": breadcrumbs([
					{
						name: "Minecraft Plugins",
						url: pluginsUrl
					},
					{
						name: category.name,
						url: categoryUrl
					},
					{
						name: product.name,
						url: productUrl
					}
				])
			}]
		};
	}
	return renderTemplate`${"category" in rest ? renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": rest.category.title,
		"description": rest.category.intro,
		"canonicalPath": `/plugins/${rest.category.slug}/`,
		"jsonLd": jsonLd
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "CategoryPage", $$CategoryPage, { "category": rest.category })} ` })}` : renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": metaTitle(rest.product.name, CATEGORY_TITLE_PHRASE[rest.product.category]),
		"description": metaDescription(rest.product.name, CATEGORY_TITLE_PHRASE[rest.product.category], rest.product.summary),
		"canonicalPath": `/plugins/${rest.product.slug}/`,
		"image": rest.product.image ?? SITE.ogImage,
		"jsonLd": jsonLd
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "ProductPage", $$ProductPage, { "product": rest.product })} ` })}`}`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/plugins/[slug].astro", void 0);
var $$file = "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/pages/plugins/[slug].astro";
var $$url = "/plugins/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/plugins/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
