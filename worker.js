/* Future Perfect English on Cloudflare. Written by generator/moving.py.
   The site's files are served as they are, ".html" included (wrangler.jsonc: html_handling "none"). This script runs
   only for the folder addresses listed in wrangler.jsonc: /b2/ serves b2/index.html, and /b2 forwards to /b2/. */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.endsWith("/")) {
      url.pathname += "/";
      return Response.redirect(url.toString(), 301);
    }
    url.pathname += "index.html";
    return env.ASSETS.fetch(new Request(url.toString(), request));
  },
};
