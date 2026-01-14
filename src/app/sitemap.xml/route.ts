export async function GET() {
  const baseUrl = "https://slu9.vercel.app";

  const urls = [
    "/",
    "/auth",
    "/check",
    "/link-expired",
    "/password",
    "/privacy-policy",
    "/terms-of-service",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((path) => {
        return `  <url>\n    <loc>${baseUrl}${path}</loc>\n  </url>`;
      })
      .join("\n") +
    `\n</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

