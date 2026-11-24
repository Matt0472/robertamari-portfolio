/*
 * Titles from the CMS mark their one italic word with asterisks: «Una *parola* in corsivo».
 * Only *…* is read; everything else stays literal text.
 */

interface EmphasisPart {
  text: string;
  emphasis: boolean;
}

/** The title cut at the asterisks: the parts between a pair are the emphasised ones. */
export function emphasisParts(text: string): EmphasisPart[] {
  return text
    .split(/\*([^*]+)\*/)
    .map((part, index) => ({ text: part, emphasis: index % 2 === 1 }))
    .filter((part) => part.text);
}

const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (char) => entities[char]);

/** Safe HTML for a title: escaped, with the *word* in <em>. */
export function emphasize(text: string): string {
  return emphasisParts(text)
    .map((part) => (part.emphasis ? `<em>${escapeHtml(part.text)}</em>` : escapeHtml(part.text)))
    .join('');
}

/** The title without its markers, where it is not visible markup (metadata, labels). */
export function plainText(text: string): string {
  return emphasisParts(text)
    .map((part) => part.text)
    .join('');
}
