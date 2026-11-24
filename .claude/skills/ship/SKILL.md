---
name: ship
description: "Use whenever someone starts a piece of work on Roberta Mari's site — \"facciamo la sezione del laboratorio\", \"rifai l'apertura\", \"aggiungi gli appuntamenti\", \"sistema il modulo su mobile\", \"let's build X\". Takes it from intake to release: checks what is already decided, asks what is ambiguous before planning, plans it, builds it to the project standards with the right specialists, verifies it in a real browser, shows it and waits for the ok, then commits and publishes — and walks a delicate change (repository, Cloudflare, domain, email, indexing, CMS field changes) through a runbook. Usage: /ship <description of the work>"
user-invocable: true
---

# Ship

Five stages with real gates between them. Do not skip ahead: each gate exists because the failure it
prevents is expensive and invisible at the time it happens.

The gates are what matter. The specialists in `.claude/agents/` are how each part gets done well; if
one is unavailable, do its part yourself against the same file in `docs/standards/`.

---

## Stage 1 — Intake

**Get the work.** `$ARGUMENTS` is a description: a section, a page, a fix. Restate it in one line as
the job it does for Roberta — get schools and libraries to request the workshop, present her and her
path, sell the book, show the events — because that decides what the section must push.

**Find out what is already decided.** Before asking anything, read:

- `docs/in-development/HANDOFF.md` — current state, what is in progress, what is missing from Roberta;
- `docs/standards/design.md` → `DES-02` and `DES-10` — the identity, the sites we must not resemble and
  everything already **rejected**. Never re-propose it.

**Check it is actually ready.** Say precisely what is missing, and ask — do not fill the gap with a
plausible assumption:

- **content**: does the copy exist (Roberta, the publisher's page, the book, to be drafted)? Dates of
  her path, contacts, workshop details and prices are Roberta's to give, never invented (`CMS-10`);
- **assets**: real photos available? Children recognisable → consent (`MEDIA-03`). No AI images of
  people or the book (`MEDIA-02`);
- **dependencies**: does it need something not set up yet (domain, Email Routing for the form,
  Turnstile keys, the logo file)?

**Check the working tree.** `git status`, and `git pull` once a remote exists. If there are uncommitted
changes that are not this work, say so before touching anything.

---

## Stage 2 — Interrogate

Ask about every genuine ambiguity **before** planning. The test: *would different answers lead to
materially different output?* If yes, ask. If no, decide and say what you decided.

Questions worth asking look like:

- which is the one action this section pushes, and where does it lead?
- is the copy ours to draft (marked as a draft for Roberta) or does it come from her?
- which real photo goes here, and does it show children who need consent?
- what does the section show when a CMS field is empty?
- does this replace something the user has already seen and approved?

Ask them **one at a time**. Read the relevant `docs/standards/` files first — half the questions answer
themselves there.

**A visual direction is never asked with sketches.** When the question is "how should it look", show
real options in the browser (`DES-10`, `design-specialist` → *Proposing a style*).

---

## Stage 3 — Plan

Enter plan mode. The plan names, concretely:

- which **files** change (`CODE-03`) and which shared components get reused;
- the **content model**: new fields in `src/content.config.ts`, `src/content/` and `.pages.yml`, their
  Italian labels and descriptions, and the manual section that documents them (`CMS-03`, `CMS-04`,
  `CMS-14`, `CMS-15`);
- which **specialists** do which part (table in `CLAUDE.md`);
- which **canon rules** constrain the work, by ID;
- which **assets** are needed and where they come from;
- how it will be **verified**: widths, reduced motion, the flows to click through (the form!);
- whether the work **finishes a page** — then stage 4 ends with `/audit`;
- whether the change is **delicate** (`GIT-07`), decided now rather than discovered at release.

**Get approval before writing code.** A rejected plan is not approval, and it is not permission to
start a smaller version of it.

---

## Stage 4 — Build

- **Read the standards files that apply** before writing (`coding-standards` skill, or the paths
  directly). Do not infer the rules from nearby code — part of it is known debt (`CODE-01`).
- **Delegate to the specialist whose subject matches**: `design-specialist` for the composition,
  `asset-specialist` for photos, cover, logo, favicon, `cms-specialist` for the fields, `seo-specialist`
  for metadata and structured data, `accessibility-specialist` for any non-trivial widget (the form,
  the menu). Independent parts go in parallel.
- **Content goes in the CMS from the first line** (`CMS-01`), never "hardcoded for now".
- **Every new asset is shown before it is wired in** (`MEDIA-04`).
- **Boy Scout rule within its containment test** (`GIT-06`).
- **Checks**: `npm run build`, `npm run check` and `npm run check:cms` must pass (`CODE-12`). When the
  worker or the form changed, also `npm run preview:worker` and a real submission against
  `http://localhost:8787` (without Email Routing the expected answer is `not_configured`).
- **Verify in a real browser** (the app's built-in browser or Playwright MCP): desktop 1440 and a phone
  (375×812, plus 375×667 when the layout is tall), `prefers-reduced-motion`, and a click through every
  interactive element you touched. Sections fade in on scroll: wait for them before a screenshot.
- **Review by a different instance**: `code-standards-specialist` and `cms-specialist` on the changed
  files, in parallel. Skip only for a trivial, mechanical change.
- **When the work finishes a page**, run `/audit` on it. The accessibility verdict is blocking.

---

## Stage 5 — Show, then release

### Show and stop

Show the user what changed (`GIT-01`): the page open in the browser pane, screenshots desktop and
mobile, a short summary of the diff and of any open decision. Then **stop and wait**. An ok on a
previous change is not an ok on this one.

### On an explicit ok

1. Commit in Italian, `Area: cosa cambia`, with the attribution trailer (`GIT-03`), without working
   artifacts (`dist/`, `.wrangler/`, `materiali/`, screenshots — `GIT-05`).
2. If a remote exists and the user asked to publish: push to `main` — once Cloudflare is connected that
   is **production** — then check the deploy result and the page online (`GIT-02`). Work to preview
   first goes on a branch. Report what you checked, not "it's deployed".
3. Offer `/handoff` if the session is ending.

### Delicate changes

Engage this only when the change is delicate (`GIT-07`): creating the repository and its visibility,
connecting Cloudflare, the domain and DNS, Email Routing and the `send_email` binding, Turnstile keys,
the indexing flag, a CMS field renamed or removed. If none apply, say so and stop after the release.

Write a runbook and **label every step with who performs it — [TU] or [CLAUDE]**:

```markdown
### Preparazione
1. **[CLAUDE]** Build in locale e verifica di <il controllo specifico>
2. **[TU]** <l'azione nella dashboard Cloudflare / GitHub / registrar>

### Verifica
3. **[CLAUDE]** Controllo <esatto> e riporto cosa ho visto
```

The rules this part exists to enforce:

- **The user throws the production switches** (`GIT-08`): domain, DNS, Cloudflare settings, worker
  variables and secrets, `PUBLIC_SITE_INDEXABLE=true`. Hand over the exact values and commands.
- **`noindex` comes off only on the final domain** (`SEO-10`).
- **A renamed CMS field migrates Roberta's content in the same commit** (`CMS-09`).
- **Walk it interactively**, one step at a time. A missing error is not evidence of success — say what
  you actually checked.
