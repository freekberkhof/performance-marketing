import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { readFile } from "node:fs/promises";
import { setTimeout as wait } from "node:timers/promises";

// Run after npm run build. Uses only a temporary local production server.
const listener = createServer();
await new Promise((resolve) => listener.listen(0, "127.0.0.1", resolve));
const port = listener.address().port;
await new Promise((resolve) => listener.close(resolve));
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port), "-H", "127.0.0.1"], { stdio: ["ignore", "pipe", "pipe"] });
let output = "";
server.stdout.on("data", (data) => { output += data; });
server.stderr.on("data", (data) => { output += data; });
const origin = "http://127.0.0.1:" + port;
let stopped = false;
server.on("exit", () => { stopped = true; });
try {
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt++) {
    if (stopped) throw new Error("Next exited before the checks: " + output);
    try { ready = (await fetch(origin, { signal: AbortSignal.timeout(1000) })).ok; } catch {}
    if (ready) break;
    await wait(250);
  }
  assert(ready, "Production server did not become ready");
  const routes = [
    ["/", "Van revalidatie", "index.html"],
    ["/privacy", "<h1>Privacy</h1>", "privacy.html"],
    ["/contact", "Waar kunnen we je mee helpen?", "contact.html"],
    ["/account-deletion", "Je account verwijderen", "account-deletion.html"],
  ];
  const assets = new Set();
  for (const [route, text, file] of routes) {
    const res = await fetch(origin + route);
    assert.equal(res.status, 200, route);
    const html = await res.text();
    assert(html.includes(text), route + " heading");
    assert.equal(html, await readFile("public/website/" + file, "utf8"), route + " must serve the approved complete HTML");
    assert(!html.includes("noindex"), route + " must be indexable");
    assert(html.includes('href="https://performanceplus.nl' + (route === "/" ? "" : route) + '"'), route + " canonical");
    for (const link of ["/privacy", "/contact", "/account-deletion", "https://www.passionforhealth.nl/"]) assert(html.includes('href="' + link + '"'), route + " footer link: " + link);
    for (const match of html.matchAll(/(?:src|href)="(\/website\/[^"]+)"/g)) assets.add(match[1]);
    console.log("PASS " + route + " (200, exact page, canonical, footer)");
  }
  const css = await readFile("public/website/dark.css", "utf8");
  for (const match of css.matchAll(/url\("([^"]+)"\)/g)) assets.add("/website/" + match[1]);
  for (const path of assets) {
    const res = await fetch(origin + path);
    assert.equal(res.status, 200, path);
    assert.equal(Buffer.compare(Buffer.from(await res.arrayBuffer()), await readFile("public" + path)), 0, path + " bytes");
  }
  console.log("PASS " + assets.size + " local resources (200, correct bytes)");
  const sitemapResponse = await fetch(origin + "/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  for (const [route] of routes) assert(sitemap.includes("https://performanceplus.nl" + (route === "/" ? "" : route) + "</loc>"), "sitemap " + route);
  assert.equal((await fetch(origin + "/robots.txt")).status, 200);
  assert.equal((await fetch(origin + "/missing-website-page-test")).status, 404);
  console.log("PASS sitemap, robots and missing-page status");
} finally {
  if (!stopped) server.kill();
}
