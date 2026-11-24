/**
 * Indexing switch (SEO-10): the site is noindex with a blocking robots.txt everywhere
 * except the production build on the final domain, where PUBLIC_SITE_INDEXABLE=true.
 */
export const isIndexable = process.env.PUBLIC_SITE_INDEXABLE === 'true';

/** Pages that never go to search engines or the sitemap. */
export const excludedPages = ['/privacy', '/grazie', '/invio-non-riuscito', '/404'];
