async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);

  // This is how the proxy works:
  // 1. A request comes in for a specific asset.
  // 2. We construct a URL to that asset.
  // 3. We fetch the asset and respond to the request.

  // Check if the request is for style.css.


  return new Response(
    fs.readFileSync('./index.html'),
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
