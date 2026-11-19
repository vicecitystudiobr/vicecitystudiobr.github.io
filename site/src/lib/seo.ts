import config from "../../seo-pages.json" with { type: "json" };

type Page = { title: string; description: string; english?: string };

export function pageSeo(pathname: string) {
  const path = pathname.replace(/\/+$/, "") + "/";
  const page: Page | undefined = (config.pages as Record<string, Page>)[path];
  if (!page) return undefined;

  const url = config.origin + path;
  const image = config.origin + config.image;
  return {
    title: page.title,
    links: [
      { rel: "canonical", href: url },
      ...(page.english
        ? [
            { rel: "alternate", hreflang: "pt-BR", href: url },
            { rel: "alternate", hreflang: "en", href: config.origin + page.english },
            { rel: "alternate", hreflang: "x-default", href: url },
          ]
        : []),
    ],
    meta: [
      { name: "description", content: page.description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Vice City Studio" },
      { property: "og:locale", content: "pt_BR" },
      ...(page.english ? [{ property: "og:locale:alternate", content: "en_US" }] : []),
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: image },
    ],
  };
}
