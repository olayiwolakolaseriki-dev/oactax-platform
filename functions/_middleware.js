// Cloudflare Pages Edge Middleware
// Enforces canonical apex domain by redirecting all www traffic with 301 Moved Permanently
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname.startsWith('www.')) {
    url.hostname = url.hostname.replace(/^www\./, '');
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
