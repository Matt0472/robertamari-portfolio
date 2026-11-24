---
name: audit
description: "Use whenever someone asks for Roberta Mari's site or part of it to be reviewed, checked or assessed — \"fai l'audit della home\", \"controlla questa sezione\", \"è pronto per il lancio?\", \"va bene così?\", \"check this page\". Also the quality gate at the end of every finished page. Audits a page, component, the pending changes or the whole site against docs/standards/ with the specialist agents, writes a report with rule IDs to docs/audits/ and never fixes anything. Usage: /audit [target]"
user-invocable: true
---

# Audit

Review the site against `docs/standards/` and report what diverges.

**This skill never fixes anything.** An audit that silently rewrites twenty files is unreviewable; the
point is to give the person a decision, not a diff.

## 1. Resolve the target

`$ARGUMENTS` may be a page, a component, a path, a description, or empty.

| Target | Resolve to |
|---|---|
| *(empty)* | the uncommitted changes (`git status`), or the last commit if the tree is clean |
| A page (`home`, `/privacy`) | its route in `src/pages/`, the layout, every component it renders, its files in `src/content/` |
| A section (`laboratorio`, `chi sono`) | its component, its content file, the home page |
| A component or path | those files, plus the pages that render them |
| `all` / `sito` / `lancio` | every page — one report section per page |
| Free text | **state your interpretation, the routes and the file count, and confirm** before starting |

The temporary prototypes in `src/pages/prove/` are out of scope unless named.

## 2. Ask the machine first

Collect what is mechanically knowable **once**, before launching anyone:

```bash
npm run build && npm run check && npm run check:cms   # must pass: if not, that is the report
npm run preview                                       # http://localhost:4331, the ONLY server of the audit
npx lighthouse http://localhost:4331/<route> --form-factor=mobile --output=json \
  --output-path=<scratchpad>/audit/lh-<route>.json --chrome-flags="--headless=new" --quiet
```

- **Lighthouse**: three runs per route, keep the median scores and the failing audits.
- **Built HTML** (`dist/<route>/index.html`): number of `<h1>`, `<title>`, meta description, canonical,
  OG image type and size, `robots` meta, whether each JSON-LD block parses; plus `dist/robots.txt` and
  `dist/sitemap-index.xml`. The indexing gate (`SEO-10`) is always checked.
- **Browser pass** (you drive it: the app's built-in browser or Playwright MCP): for each route at 320,
  375, 390×844, 375×667, 768, 1024, 1440 and 1920 — a screenshot and the measurement script from
  `responsive-specialist`; one more set at 375 with reduced motion. Elements reveal on scroll: add
  `is-visible` to every `[data-reveal]` (or wait) before each screenshot.
- **Form**: when the target includes the contact section, `npm run preview:worker` and one valid and
  one invalid submission against `http://localhost:8787/api/contatto`.

**Known debt is not a finding.** Read the "Debito noto" table in `docs/standards/README.md` and the
"Da chiudere prima del go-live" section of `docs/in-development/HANDOFF.md`.

Carry into the next step: machine findings, evidence (screenshot and Lighthouse paths, preview URL),
known debt.

## 3. Fan out

Launch in parallel, in one message, each in **review-only** mode:

| Specialist | Covers | When |
|---|---|---|
| `accessibility-specialist` | WCAG 2.2 AA — **blocking** | always |
| `responsive-specialist` | layout across widths | pages and layout |
| `performance-specialist` | Lighthouse, weight, CWV | pages; components when images, fonts or JS changed |
| `seo-specialist` | metadata, JSON-LD, indexing gate | pages, layouts, metadata |
| `design-specialist` | composition, hierarchy, states, motion, identity, `DES-` rules | whenever UI is in the target |
| `cms-specialist` | hardcoded content, the four-way match, the manual | always |
| `code-standards-specialist` | code form against `CODE-` rules, the worker | always |

Tell each one explicitly:

- **REVIEW-ONLY — do not modify any file, do not run `git add`, `commit`, `push` or `stash`.**
- the resolved **file list and routes** — do not sweep the codebase;
- the **preview URL**, the **Lighthouse JSON** and the **screenshot paths** — **do not start a server
  and do not run Lighthouse**;
- **the browser is single**: only `accessibility-specialist` drives it (keyboard and focus need it);
  everyone else works from the screenshots and measurements;
- the **machine findings and known debt**: confirm and explain, but do not spend the budget
  rediscovering them.

For `all`, work page by page.

## 4. Report

Write the report in Italian to `docs/audits/<YYYY-MM-DD>-<target>.md` and give a short summary in the
conversation. Group findings **by rule**, not by file.

```markdown
# Audit: <target>
<data> · <n> file · <route> · canone al commit <short hash, o "non committato">

## Sintesi
| Gravità | Numero |
|---|---|
| Bloccante — AA fallito, build rotto, sito indicizzabile, contenuto perso | n |
| Maggiore — regola violata con effetto visibile a Roberta o ai visitatori | n |
| Minore — convenzione | n |
| Debito noto — già registrato | n |

Lighthouse mobile (mediana di 3): Performance n · Accessibility n · Best Practices n · SEO n · LCP n s · CLS n · TBT n ms

## A11Y-02 — Contrasto misurato
**Bloccante** · 2 occorrenze

- `src/components/sections/X.astro:12` — testo tenue su sabbia, 3.9:1
- ...

**Perché conta:** <una o due righe, con le conseguenze concrete>
**Perimetro (GIT-06):** fix sul posto / passo successivo — <quale, e perché>
```

Order by severity. For every finding: rule ID and one-line statement; every file and line (or width,
or route); why it matters; fix in place or next step (`GIT-06`). Close with new findings separated from
known debt, what was checked and found **correct**, what was judged borderline and left alone, and what
could **not** be checked.

Stop the preview server; the evidence stays in the scratchpad (never committed, `GIT-05`).

## 5. Offer, don't act

End by offering the obvious next steps — fix the blocking findings, fix a specific one, or add next
steps to the handoff — and wait.
