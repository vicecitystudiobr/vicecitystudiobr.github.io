import { cp, mkdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const result = spawnSync("npm", ["run", "build"], { stdio: "inherit" });
if (result.status !== 0) process.exit(result.status ?? 1);

for (const route of ["videos", "novidades", "sobre"]) {
  const directory = new URL(`./dist/${route}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await cp(new URL("./dist/index.html", import.meta.url), new URL("index.html", directory));
}
