/*
 * Dates in Rome's time zone. Free of DOM and content, so the build and the browser
 * (the events section, which re-sorts events after the build) share them.
 */
const timeZone = 'Europe/Rome';

const longFormat = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone });
const dayFormat = new Intl.DateTimeFormat('it-IT', { day: 'numeric', timeZone });
const monthFormat = new Intl.DateTimeFormat('it-IT', { month: 'short', timeZone });
const isoFormat = new Intl.DateTimeFormat('sv-SE', { timeZone });

/** "21 novembre 2026" */
export function longDate(date: Date): string {
  return longFormat.format(date);
}

/** "21" and "nov", for a calendar leaf. */
export function dateLeaf(date: Date): { day: string; month: string } {
  return { day: dayFormat.format(date), month: monthFormat.format(date).replace('.', '') };
}

/** YYYY-MM-DD: comparable as a string, and valid in <time datetime>. */
export function isoDate(date: Date): string {
  return isoFormat.format(date);
}
