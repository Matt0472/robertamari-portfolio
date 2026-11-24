# robertamari — sito portfolio

Guida per Claude Code in questo repository.

Questo file è un **indice**, non un regolamento. Le regole stanno in `docs/standards/`, che leggono
persone e assistenti: una copia sola, un solo posto dove cambiarle.

## Il progetto

Sito-portfolio di **Roberta Mari**, autrice de «Il richiamo delle lanterne» (Gruppo Albatros, 2026),
**Premio speciale Favole** al Premio Letterario Milano International 2026. Contenuti in **italiano**.
Il sito è una sorta di curriculum: racconta Roberta (laurea in Scienze Politiche, master in
Mindfulness, pensiero positivo ed educazione emozionale, scuola statale, centro diurno, un anno in
Australia), il libro e il premio.

**È prima di tutto un portfolio, su una pagina unica** (`DES-05`): prima Roberta, poi il libro, le
risorse gratuite e il premio, poi il laboratorio che propone (lettura animata + costruzione della lanterna) a scuole
dell'infanzia e primarie, biblioteche, librerie ed eventi, poi gli eventi fatti. Si chiude con il
**modulo di contatto**: solo modulo ed email, niente telefono né WhatsApp.
Roberta aggiorna il sito **in autonomia** da Pages CMS.

**Identità visiva: «Radici e Orizzonti»**, il marchio che Roberta usa già su Instagram
(`@piccolicuoriconsapevoli`): un sole che sorge sull'orizzonte con radici sottili sotto. Il sito non
deve copiare stile e forme di lanternata.it e campodizucchemilano.it; i colori si possono condividere
(`DES-02`). Direzione: **«la giornata della luce»**, morbida e con personalità (`DES-09`).

**Standard di qualità (non negoziabile): si lavora sempre al massimo.** Solo cose curate nei
dettagli, mai riempitivi o soluzioni "abbastanza buone".

**Principio fondante: se è contenuto sta nel CMS, se è struttura sta nel codice**
(`docs/standards/contenuti-cms.md`).

## Leggi prima di lavorare

| Stai per | Leggi |
|---|---|
| Fare qualunque cosa | [`docs/standards/README.md`](docs/standards/README.md): indice, non negoziabili, debito noto |
| Scrivere un testo, aggiungere un'immagine, toccare `src/content` o `.pages.yml` | [`contenuti-cms.md`](docs/standards/contenuti-cms.md) |
| Scrivere componenti, layout, CSS, script, il worker | [`codice.md`](docs/standards/codice.md) |
| Progettare o ritoccare l'aspetto di qualcosa | [`design.md`](docs/standards/design.md), con le **decisioni da non riproporre** |
| Foto, copertina, logo, favicon | [`media.md`](docs/standards/media.md) |
| Elementi interattivi, contrasti, motion, il modulo | [`accessibilita.md`](docs/standards/accessibilita.md) |
| Immagini, font, JS, apertura | [`performance.md`](docs/standards/performance.md) |
| Un layout | [`responsive.md`](docs/standards/responsive.md) |
| Pagine, meta, JSON-LD, robots | [`seo.md`](docs/standards/seo.md) |
| Committare, pubblicare, andare online | [`git.md`](docs/standards/git.md) |

Il canone è l'autorità. Dove il tuo giudizio diverge, **vince il file**. Se una regola sembra sbagliata
per il caso, dillo e fermati: non improvvisare varianti.

Lo **stato del lavoro** (cosa è fatto, cosa manca, cosa manca da Roberta) è in
`docs/in-development/HANDOFF.md`.

## Stack

- **Astro** `^7`, sito **statico**; CSS con custom properties (nessun Tailwind), stili scoped con
  `scopedStyleStrategy: 'class'`.
- **@astrojs/sitemap**, **@fontsource** (font self-hosted), **lucide-static** (icone),
  **simple-icons** (icone social).
- **Pages CMS** (pagescms.org), config in `.pages.yml`; contenuti in `src/content/` (YAML e Markdown)
  validati dallo schema in `src/content.config.ts`; immagini in `src/assets/images/`.
- **Cloudflare Workers** con static assets: `wrangler.jsonc` + `worker/index.ts`, che serve `dist/` e
  gestisce `POST /api/contatto` (Email Routing + Turnstile). Nessun adapter Astro.
- **GitHub** (account `Matt0472`): repository ancora da creare. Dominio ancora da comprare.

## Comandi

Richiede **Node ≥ 22**.

```bash
npm run dev             # sviluppo su http://localhost:4330
npm run build           # build statica in dist/
npm run check           # astro check + tipi del worker
npm run check:cms       # contenuti ↔ .pages.yml
npm run preview         # anteprima della build su http://localhost:4331
npm run preview:worker  # build + worker vero (modulo compreso) su http://localhost:8787
```

Produzione indicizzabile: `PUBLIC_SITE_INDEXABLE=true`, impostata **solo** nel build di produzione
su Cloudflare con il dominio definitivo (`SEO-10`).

## Delega agli agenti

Gli agenti sono **specialisti di una materia** e servono qualunque fase: costruire, rivedere,
esplorare, correggere, rispondere. Si usa quello la cui materia corrisponde, **senza aspettare che
l'utente lo chieda**; i lavori che toccano più materie li delegano a più specialisti, in parallelo.

| Materia | Specialista |
|---|---|
| Aspetto: composizione, gerarchia, tipografia, motion, stati, navigazione, UX dei form | `design-specialist` |
| Contenuti: campi CMS, `src/content`, `.pages.yml`, schema, manuale di Roberta | `cms-specialist` |
| Asset: foto reali, copertina, logo, favicon, ottimizzazione | `asset-specialist` |
| Forma del codice: Astro, CSS, script, worker, dipendenze | `code-standards-specialist` |
| Accessibilità WCAG 2.2 AA (**bloccante**) | `accessibility-specialist` |
| Performance e Core Web Vitals | `performance-specialist` |
| Responsive e mobile | `responsive-specialist` |
| SEO, GEO, gate di indicizzazione | `seo-specialist` |

### Revisione

- **Chi ha costruito qualcosa non lo rivede.** Dopo ogni modifica non banale: `code-standards-specialist`
  e `cms-specialist` sui file toccati.
- **A pagina finita** si fa `/audit` come quality-gate. Non a ogni componente: in itinere bastano
  build, browser vero e la revisione qui sopra. L'esito dell'accessibilità è **bloccante**.
- Si salta la revisione solo per modifiche banali e meccaniche.

## Usa queste skill senza che te lo chiedano

| Dicono qualcosa come | Fai |
|---|---|
| "facciamo la sezione X" · "rifai Y" · "aggiungi Z" · "sistema W" | **`/ship`** |
| "controlla la home" · "è pronta?" · "va bene così?" · una pagina appena finita | **`/audit`** |
| "dove va questo?" · "posso usare questo colore?" · "come lo chiamo?" | **Rispondi da `docs/standards/`** citando l'ID, mai a memoria |
| "passiamo la mano" · "chiudiamo la sessione" · "salva i progressi" | **`/handoff`** |

- Usala direttamente quando la richiesta corrisponde chiaramente; **proponila** quando corrisponde
  solo in parte.
- Se una skill non è disponibile, fai il lavoro tu: contano i gate del canone.

## Regole operative

- **Mai commit né push senza un ok esplicito**: prima si mostrano le modifiche, poi si aspetta
  (`GIT-01`). Quando il repository sarà collegato a Cloudflare, **ogni push su `main` andrà in
  produzione**, come ogni salvataggio di Roberta dal CMS: prima di lavorare, `git pull`.
- **Solo la produzione sul dominio definitivo è indicizzabile** (`SEO-10`). Mai toccare flag di
  indicizzazione, DNS o Cloudflare di tua iniziativa (`GIT-08`).
- **Mai segreti nei file** (`GIT-04`).
- **Le prove di stile si mostrano vere**, nel browser, con contenuti e immagini reali: mai mockup
  schematici (`DES-10`).
- **Verifica nel browser vero**: il browser integrato dell'app o Playwright MCP se disponibile; prima
  di uno screenshot aspetta che le animazioni di comparsa siano finite (`data-reveal`).
- **Uso efficiente di token e risorse, puntando al miglior risultato**: pianifica prima di agire,
  riusa ciò che è già noto, output concisi.
- **Non creare documentazione non richiesta**, tranne il manuale di Roberta (`CMS-12`).
- I **materiali privati** (PDF del libro, foto originali) stanno in `materiali/`, esclusa da git.
