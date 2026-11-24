import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/*
 * Site content, editable from Pages CMS (see .pages.yml).
 * Each home section is one YAML file in src/content/home/.
 * Images are paths like "/images/photo.jpg" pointing to src/assets/images/photo.jpg,
 * resolved by the image helper in src/lib/.
 * Downloads are paths like "/risorse/file.pdf" pointing to public/risorse/file.pdf, served as is.
 *
 * Pages CMS may save an empty field as an empty string or as null:
 * the helpers below always turn them into "" or [].
 */
const text = z
  .string()
  .nullish()
  .transform((v) => v ?? '');

// For the few fields whose emptiness would break the page (a button with no label):
// Pages CMS marks them required, and the build fails if one is emptied by hand.
const required = z.string().trim().min(1);

const list = <T extends z.ZodType>(schema: T) =>
  z
    .array(schema)
    .nullish()
    .transform((v) => v ?? []);

// Mirrors a `select` in .pages.yml: a value outside the options fails the build.
const choice = <const T extends readonly [string, ...string[]]>(values: T) =>
  z
    .union([z.enum(values), z.literal('')])
    .nullish()
    .transform((v) => v ?? '');

/*
 * An image shown on the page always has its description (CMS-08, A11Y-03).
 * Pages CMS cannot require a field only when another one is filled, and failing the build would
 * also hold back every later save until someone fixes the file. So an image saved without its
 * description is dropped here, with a build warning: Roberta sees the photo missing, and the
 * field description in .pages.yml tells her why.
 */
const describedImage =
  <I extends string, A extends string>(image: I, alt: A) =>
  <T extends Record<I | A, string>>(data: T): T => {
    if (!data[image] || data[alt].trim()) return data;
    console.warn(`[content] "${data[image]}" has no ${alt}: the image is hidden until it has one (CMS-08)`);
    return { ...data, [image]: '' };
  };

const link = z.object({ label: text, url: text });
const entry = z.object({ label: text, value: text });
const titledText = z.object({ title: text, text });

const section = (file: string) => glob({ pattern: file, base: './src/content/home' });

const settings = defineCollection({
  loader: section('settings.yml'),
  schema: z.object({
    name: required,
    role: text,
    contact_button: required,
    email: text,
    instagram: text,
    area: text,
    vat_number: text,
    seo_description: text,
    // Only in the page metadata, never on the page itself.
    social_image: text,
    social_image_alt: text,
  }),
});

const hero = defineCollection({
  loader: section('hero.yml'),
  schema: z
    .object({
      eyebrow: text,
      slogan: text,
      statement: text,
      photo: text,
      photo_alt: text,
      // The small card laid on the photo, e.g. the award.
      highlight_title: text,
      highlight_text: text,
    })
    .transform(describedImage('photo', 'photo_alt')),
});

const about = defineCollection({
  loader: section('about.yml'),
  schema: z
    .object({
      label: text,
      title: text,
      photo: text,
      photo_alt: text,
      bio: text,
      path_title: text,
      path: list(
        z.object({
          year: text,
          title: text,
          text,
          kind: choice(['education', 'work', 'travel', 'project', 'writing', 'award']),
        }),
      ),
      education_title: text,
      education: list(z.object({ title: text, institution: text, year: text })),
    })
    .transform(describedImage('photo', 'photo_alt')),
});

const book = defineCollection({
  loader: section('book.yml'),
  schema: z
    .object({
      label: text,
      title: text,
      subtitle: text,
      photo: text,
      photo_alt: text,
      plot: text,
      characters_title: text,
      characters: list(z.object({ name: text, description: text })),
      quote: text,
      values_title: text,
      values: list(titledText),
      origin_title: text,
      origin_text: text,
      // Not shown on the page: structured data only.
      publisher: text,
      isbn: text,
      purchase_title: text,
      purchase_links: list(link),
      purchase_note: text,
      // Not shown on the page: structured data, and the social preview when settings has none.
      cover: text,
      cover_alt: text,
    })
    .transform(describedImage('photo', 'photo_alt')),
});

const award = defineCollection({
  loader: section('award.yml'),
  schema: z
    .object({
      label: text,
      title: text,
      competition: text,
      detail: text,
      text,
      image: text,
      image_alt: text,
    })
    .transform(describedImage('image', 'image_alt')),
});

// Free downloads; src/lib/content.ts keeps only the items with a title and a file that exists.
const resources = defineCollection({
  loader: section('resources.yml'),
  schema: z.object({
    label: text,
    title: text,
    text,
    // One label for every download button (DES-05); without it nothing could be downloaded.
    button_label: required,
    items: list(
      z
        .object({ title: text, text, file: text, preview: text, preview_alt: text })
        .transform(describedImage('preview', 'preview_alt')),
    ),
  }),
});

const workshop = defineCollection({
  loader: section('workshop.yml'),
  schema: z.object({
    label: text,
    title: text,
    intro: text,
    audience_title: text,
    audience: list(z.object({ title: text, ages: text })),
    places_title: text,
    places: list(text),
    steps_title: text,
    steps: list(titledText),
    goals_title: text,
    goals: list(titledText),
    details_title: text,
    details: list(entry),
    note: text,
    gallery: list(z.object({ image: text, image_alt: text }).transform(describedImage('image', 'image_alt'))),
  }),
});

// Headings of the events section; the events themselves are the `events` collection.
const eventsSection = defineCollection({
  loader: section('events.yml'),
  schema: z.object({
    label: text,
    title: text,
    intro: text,
    upcoming_title: text,
    past_title: text,
    link_label: text,
  }),
});

// The profile link and the handle come from settings.instagram.
const instagram = defineCollection({
  loader: section('instagram.yml'),
  schema: z.object({
    label: text,
    title: text,
    text,
    button_label: text,
    posts: list(
      z.object({ image: text, image_alt: text, link: text }).transform(describedImage('image', 'image_alt')),
    ),
  }),
});

const contact = defineCollection({
  loader: section('contact.yml'),
  schema: z.object({
    label: text,
    title: text,
    text,
    email_button: text,
    form_title: text,
    interests: list(text),
    submit_label: required,
    privacy_note: text,
    success_message: text,
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z
    .object({
      title: required,
      // Sorts the events and splits upcoming from past; for a multi-day event, its first day.
      date: z.coerce.date(),
      date_label: text,
      time: text,
      venue: text,
      city: text,
      kind: choice(['Lettura animata', 'Laboratorio', 'Presentazione', 'Premio', 'Altro']),
      link: text,
      image: text,
      image_alt: text,
      draft: z
        .boolean()
        .nullish()
        .transform((v) => v ?? false),
    })
    .transform(describedImage('image', 'image_alt')),
});

// Secondary pages (privacy, 404): each file uses only the fields its .pages.yml entry lists.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: required,
    label: text,
    description: text,
    // An emptied date field arrives as "", which would otherwise coerce to an invalid date.
    updated: z.preprocess((v) => v || undefined, z.coerce.date().optional()),
    button_label: text,
  }),
});

export const collections = {
  settings,
  hero,
  about,
  book,
  resources,
  award,
  workshop,
  eventsSection,
  instagram,
  contact,
  events,
  pages,
};
