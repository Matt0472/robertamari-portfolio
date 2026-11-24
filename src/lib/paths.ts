// The site may be served from a sub-folder (the GitHub Pages preview lives under /<repository>/):
// every internal absolute path goes through withBase so it works there and at the domain root alike.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixes a root-relative path ("/privacy/", "/#contatti") with the configured base; other links pass through. */
export function withBase(path: string): string {
  return path.startsWith('/') && !path.startsWith('//') ? `${base}${path}` : path;
}
