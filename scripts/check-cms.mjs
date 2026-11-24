// Checks that every key in the content files has a field in .pages.yml and vice versa (CMS-04),
// that every image field has its description beside it, named <image>_alt (CMS-08), that image
// fields upload to src/assets/images (CMS-06), and that every file a file field points to exists.
// A key missing from .pages.yml is invisible to Roberta; with `merge: false` Pages CMS would also drop it.
// Usage: npm run check:cms
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';

const config = parse(readFileSync('.pages.yml', 'utf8'));
const components = config.components ?? {};

// Pages CMS accepts one source (a string or an object) or a list; a field without options.media uses the first.
const media = [config.media ?? []].flat().map((source) => (typeof source === 'string' ? { input: source } : source));
const mediaOf = (def) =>
  typeof def.options?.media === 'string' ? media.find((source) => source.name === def.options.media) : media[0];

const definitionOf = (field) => (field.component ? { ...components[field.component], ...field } : field);

// A file field maps to its media source, so its values can be looked up on disk.
const FILE = Symbol('file');

const schemaOf = (fields) =>
  Object.fromEntries(
    fields.map((field) => {
      const def = definitionOf(field);
      if (def.type === 'object') return [field.name, schemaOf(def.fields)];
      return [field.name, def.type === 'file' ? { [FILE]: mediaOf(def) } : null];
    }),
  );

const issues = [];

const checkFields = (fields, path) => {
  const names = new Set(fields.map((field) => field.name));
  for (const field of fields) {
    const def = definitionOf(field);
    if (def.type === 'image' && !names.has(`${field.name}_alt`)) {
      issues.push(`${path}.${field.name}: image without a ${field.name}_alt field in .pages.yml`);
    }
    if (def.type === 'image' && mediaOf(def)?.input !== 'src/assets/images') {
      issues.push(`${path}.${field.name}: image not uploaded to src/assets/images (keep the images media first)`);
    }
    if (def.type === 'file' && !(def.options?.media && mediaOf(def))) {
      issues.push(`${path}.${field.name}: file field without an existing options.media in .pages.yml`);
    }
    if (def.type === 'object') checkFields(def.fields, `${path}.${field.name}`);
  }
};

const checkFile = (value, source, path) => {
  if (!value || !source) return;
  const prefix = `${source.output}/`;
  const file = value.startsWith(prefix) ? `${source.input}/${decodeURIComponent(value.slice(prefix.length))}` : '';
  if (!file || !existsSync(file)) issues.push(`${path}: "${value}" not found in ${source.input}/`);
};

const compare = (data, schema, path) => {
  if (data === null || typeof data !== 'object') return;
  for (const item of Array.isArray(data) ? data : [data]) {
    if (item === null || typeof item !== 'object') continue;
    for (const key of Object.keys(item)) {
      if (!(key in schema)) issues.push(`${path}.${key}: in the file but not in .pages.yml`);
      else if (schema[key]?.[FILE]) checkFile(item[key], schema[key][FILE], `${path}.${key}`);
      else if (schema[key]) compare(item[key], schema[key], `${path}.${key}`);
    }
    for (const key of Object.keys(schema)) {
      if (!(key in item) && key !== 'body') issues.push(`${path}.${key}: in .pages.yml but not in the file`);
    }
  }
};

const entries = config.content.flatMap((entry) => (entry.type === 'group' ? entry.items : [entry]));
for (const entry of entries) {
  checkFields(entry.fields ?? [], entry.path);
  const schema = schemaOf(entry.fields ?? []);
  const files =
    entry.type === 'collection'
      ? readdirSync(entry.path)
          .filter((name) => name.endsWith('.md'))
          .map((name) => `${entry.path}/${name}`)
      : [entry.path];
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    const data = file.endsWith('.md') ? parse(text.split(/^---$/m)[1]) : parse(text);
    compare(data, schema, file);
  }
}

if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}
console.log('OK: content files and .pages.yml match, images have their description and folder, files exist');
