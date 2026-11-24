import type { ImageMetadata } from 'astro';

/*
 * Pages CMS stores images in src/assets/images/ and writes paths like "/images/file.jpg"
 * in the content. They are resolved here to real imports, so Astro can optimise them.
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

export function resolveImage(path?: string | null): ImageMetadata | undefined {
  if (!path) return undefined;
  const clean = decodeURIComponent(path.trim())
    .replace(/^https?:\/\/[^/]+/, '')
    .replace(/^\/?(src\/assets\/)?images\//, '')
    .replace(/^\//, '');
  const found = files[`/src/assets/images/${clean}`];
  if (!found) {
    console.warn(`[images] File not found: "${path}" (looked for src/assets/images/${clean})`);
    return undefined;
  }
  return found.default;
}
