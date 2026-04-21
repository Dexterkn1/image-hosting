declare module "@hono/vite-cloudflare-pages" {
  export default function build(): any;
}

declare module "@hono/vite-dev-server" {
  export default function devServer(options: any): any;
}

declare module "@hono/vite-dev-server/cloudflare" {
  export default any;
}

declare module "vite" {
  export function defineConfig(config: any): any;
}
