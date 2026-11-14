/**
 * EXEMPLO de proxy de caminho para Cloudflare Workers.
 * NÃO está implantado: configure INGEGNO_ORIGIN com a URL HTTPS do serviço Render.
 * Rota Cloudflare sugerida: jrpasolini.tech/ingegno*
 * Essa rota é mais específica que um catch-all no domínio.
 */
export default {
  async fetch(request, env) {
    const incoming = new URL(request.url);
    if (incoming.pathname === "/ingegno") {
      return Response.redirect(incoming.origin + "/ingegno/" + incoming.search, 308);
    }
    if (!incoming.pathname.startsWith("/ingegno/")) {
      return new Response("Not found", {status: 404});
    }
    let origin;
    try {
      origin = new URL(env.INGEGNO_ORIGIN);
      if (origin.protocol !== "https:" || origin.hostname === incoming.hostname) throw Error("Invalid origin");
    } catch {
      return new Response("Origin não configurada", {status: 503});
    }
    const destination = new URL(incoming.pathname + incoming.search, origin.origin);
    const upstream = await fetch(new Request(destination.toString(), request), {redirect: "manual"});
    const headers = new Headers(upstream.headers);
    // Nunca vaze cabeçalhos de cookies/domínios cruzados desnecessários.
    headers.delete("set-cookie");
    headers.delete("x-powered-by");
    return new Response(upstream.body, {status: upstream.status, headers});
  }
};
