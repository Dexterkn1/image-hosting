import build from "@hono/vite-cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";
import { copyFileSync, existsSync } from "fs";
import { join } from "path";

export default defineConfig({
  plugins: [
    build(),
    devServer({
      adapter,
      entry: "src/index.tsx",
    }),
    {
      name: "copy-routes",
      apply: "build",
      writeBundle() {
        const routesFile = join(__dirname, "public", "_routes.json");
        const distDir = join(__dirname, "dist");
        if (existsSync(routesFile)) {
          copyFileSync(routesFile, join(distDir, "_routes.json"));
          console.log("✓ Copied _routes.json to dist");
        }
      },
    },
  ],
});

