var fs = require('fs')
async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);
  console.log(pathname)
  // This is how the proxy works:
  // 1. A request comes in for a specific asset.
  // 2. We construct a URL to that asset.
  // 3. We fetch the asset and respond to the request.

  // Check if the request is for style.css.
  if (pathname.startsWith("/style.css")) {
    //  Construct a new URL to style.css by using the URL
    //  of the script (mod.ts) as base (import.meta.url).
    const style = new URL("style.css", import.meta.url);
    // Fetch the asset and return the fetched response
    // to the client.
    return fetch(style);
  }

  return new Response(
    fs.readFileSync('index.html'),
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    },
  );
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});
