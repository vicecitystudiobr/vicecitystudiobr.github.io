import { mkdir, readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import config from "./seo-pages.json" with { type: "json" };
import { pageSeo } from "./src/lib/seo.ts";

const result = spawnSync("npm", ["run", "build"], { stdio: "inherit" });
if (result.status !== 0) process.exit(result.status ?? 1);

const template = await readFile(new URL("./dist/index.html", import.meta.url), "utf8");

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function renderTag(tag, attrs) {
  const attributes = Object.entries(attrs)
    .map(([name, value]) => `${name}="${escapeHtml(value)}"`)
    .join(" ");
  return `<${tag} data-site-seo ${attributes}>`;
}

for (const route of Object.keys(config.pages)) {
  const { title, links, meta } = pageSeo(route);
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    ...links.map((attrs) => renderTag("link", attrs)),
    ...meta.map((attrs) => renderTag("meta", attrs)),
  ];
  const directory = new URL(`./dist${route}`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), template.replace(/<title>[^<]*<\/title>/, tags.join("\n    ")));
}
