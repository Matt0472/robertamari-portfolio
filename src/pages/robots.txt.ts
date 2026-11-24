import type { APIRoute } from 'astro';
import { isIndexable } from '../lib/indexing';

// Blocks every crawler unless the build is the indexable production one (SEO-10).
export const GET: APIRoute = ({ site }) => {
  const body = isIndexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
