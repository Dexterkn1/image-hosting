import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: { API_HOST: string } }>();

// Simple HTML response for debugging
app.get("/", (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Telegraph Image Hosting</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.5.3/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/static/style.css" />
  </head>
  <body>
    <div class="container mt-5">
      <h1 class="text-center">Telegraph Image Hosting</h1>
      <p class="text-center">Free & Unlimited Image Hosting</p>
      <div class="text-center">
        <button id="upload" class="btn btn-primary">Upload Files</button>
        <input id="fileInput" type="file" name="file" accept="image/*, video/*" style="display: none;" />
      </div>
      <div id="uploadStatus" class="mt-3"></div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/browser-image-compression/2.0.2/browser-image-compression.min.js"></script>
    <script src="/static/script.js"></script>
  </body>
</html>`);
});

app.post("/upload", cors(), async (c) => {
  const body = await c.req.parseBody();
  const file = body.file as File;
  const formData = new FormData();
  formData.append("file", file, file.name);
  const response = await fetch(`${c.env.API_HOST}/upload`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  const status = response.status as Parameters<typeof c.json>[1];
  return c.json(data, status);
});

app.get("/file/:name", async (c) => {
  const response = await fetch(`${c.env.API_HOST}/file/${c.req.param("name")}`);
  return c.newResponse(response.body as ReadableStream, {
    headers: response.headers,
  });
});

export default app;