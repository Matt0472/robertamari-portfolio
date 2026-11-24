import { statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { publicDir } from 'astro:config/server';
import { getCollection, type CollectionEntry } from 'astro:content';
import { isoDate } from './dates';
import { withBase } from './paths';

type Section =
  | 'settings'
  | 'hero'
  | 'about'
  | 'book'
  | 'resources'
  | 'award'
  | 'workshop'
  | 'eventsSection'
  | 'instagram'
  | 'contact';

/** Reads a home section (one YAML file per section in src/content/home). */
export async function getSection<S extends Section>(name: S): Promise<CollectionEntry<S>['data']> {
  const entries = (await getCollection(name)) as CollectionEntry<S>[];
  const [entry] = entries;
  if (!entry) throw new Error(`Missing content: src/content/home has no file for the "${name}" section`);
  return entry.data;
}

/** Splits a text into paragraphs on blank lines. */
export function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);
}

/** Instagram handle from a profile URL. */
export function instagramHandle(url: string): string {
  const match = url.match(/instagram\.com\/([^/?#]+)/i);
  return match ? `@${match[1]}` : url;
}

/**
 * The resources section with only the items that can be downloaded: a title and a PDF that exists
 * in public/ (Pages CMS writes "/risorse/file.pdf", which is also the link). `bytes` is the file size.
 */
export async function getResources() {
  const resources = await getSection('resources');
  const items = resources.items.flatMap((item) => {
    if (!item.title.trim() || !item.file) return [];
    const path = join(fileURLToPath(publicDir), decodeURIComponent(item.file));
    // A folder exists too: only a real file can be downloaded
    const stats = statSync(path, { throwIfNoEntry: false });
    if (!stats?.isFile()) {
      console.warn(`[content] "${item.file}" not found in public/: "${item.title}" is hidden until it exists`);
      return [];
    }
    return [{ ...item, bytes: stats.size }];
  });
  return { ...resources, items };
}

type Event = CollectionEntry<'events'>;

/**
 * Published events split around today (Rome): upcoming soonest first, past most recent first.
 * The split happens at build time; the events section moves stale ones in the browser.
 */
export async function getEvents(): Promise<{ upcoming: Event[]; past: Event[] }> {
  const all = (await getCollection('events'))
    .filter((event) => !event.data.draft)
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
  const today = isoDate(new Date());
  return {
    upcoming: all.filter((event) => isoDate(event.data.date) >= today),
    past: all.filter((event) => isoDate(event.data.date) < today).reverse(),
  };
}

/** The home anchors shared by the header and the footer; a section without a label or content is left out. */
export async function getNavigation(): Promise<{ label: string; href: string }[]> {
  const [about, book, workshop, eventsSection, events] = await Promise.all([
    getSection('about'),
    getSection('book'),
    getSection('workshop'),
    getSection('eventsSection'),
    getEvents(),
  ]);
  const hasEvents = events.upcoming.length + events.past.length > 0;
  return [
    { label: about.label, href: withBase('/#chi-sono') },
    { label: book.label, href: withBase('/#libro') },
    { label: workshop.label, href: withBase('/#laboratorio') },
    { label: hasEvents ? eventsSection.label : '', href: withBase('/#eventi') },
  ].filter((item) => item.label);
}
