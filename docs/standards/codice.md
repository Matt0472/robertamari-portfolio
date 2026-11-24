# Codice — `CODE-`

## Lingua

- **CODE-01** — **Il codice è interamente in inglese**: variabili, funzioni, componenti, file,
  cartelle, classi CSS e **tutti i commenti**. In italiano c'è solo ciò che vede l'utente, e quello sta
  nei contenuti (`CMS-01`). Oggi gran parte del codice è in italiano: è debito noto
  (`docs/standards/README.md`).

## Stack e struttura

- **CODE-02** — **Astro statico**: `astro build` produce HTML statico, nessun adapter. **CSS con custom
  properties**, nessun Tailwind; stili scoped nei componenti con `scopedStyleStrategy: 'class'`, così
  una classe passata a un componente figlio riceve gli stili del genitore. L'unico codice server è
  `worker/index.ts` (Cloudflare Worker): serve `dist/` e gestisce `POST /api/contatto`.
- **CODE-03** — Struttura:

  ```
  src/components/          componenti condivisi
  src/components/sections/ una sezione della home per file (una sezione = un file in src/content/home)
  src/layouts/             layout delle pagine (meta, testata, piede)
  src/pages/               rotte
  src/content/             contenuti (Pages CMS) + schema in src/content.config.ts
  src/lib/                 helper di build in TypeScript puro (niente DOM, niente contenuti)
  src/styles/              stili globali e token
  src/assets/images/       immagini dei contenuti
  worker/                  Cloudflare Worker (modulo di contatto)
  scripts/                 script di servizio
  docs/                    regole, handoff, audit, sorgente del manuale
  public/                  favicon e file statici
  ```

- **CODE-04** — **Componenti pragmatici**: un elemento diventa componente condiviso **quando si riusa**,
  non prima. Niente astrazioni per un uso solo.
- **CODE-05** — **Imita il codice che c'è.** Prima di scrivere, trova il componente più simile e
  replicane struttura, nomi e stile.

## Stile

- **CODE-06** — **Solo token.** Colori, font, raggi, ombre e durate vengono da `:root` in
  `src/styles/global.css`; i componenti usano i token, **mai un hex o un valore magico**. Fanno
  eccezione gli asset SVG (favicon, logo). Un valore fisso voluto si commenta con il perché.
- **CODE-07** — Animazioni solo su **`transform` e `opacity`** (più `stroke-dashoffset` per le linee
  SVG che si disegnano). Non combinare la proprietà `rotate` con un `transform: translate` sullo stesso
  elemento. Ogni animazione non essenziale si spegne con `prefers-reduced-motion` (`A11Y-07`).
- **CODE-17** — I **filtri SVG** (turbolenza, displacement) e gli effetti costosi si usano solo su
  elementi statici e piccoli, mai animati né a tutto schermo (`PERF-09`).

## JavaScript client

- **CODE-08** — JS minimo e **vanilla**: uno `<script>` nel componente che ne ha bisogno, nessun
  runtime di framework UI. Nessuno script da CDN, salvo **Cloudflare Turnstile**, che il servizio
  richiede così.
- **CODE-09** — **Terze parti**: solo Turnstile, solo dove c'è il modulo. Nessun tracciamento e nessun
  cookie non tecnico; se servono statistiche, Cloudflare Web Analytics (senza cookie), solo su
  richiesta.
- **CODE-10** — Niente lavoro a ogni frame sullo scroll: `IntersectionObserver` o CSS (anche le
  animazioni legate allo scroll, `animation-timeline`). Un listener `passive` che cambia solo una
  classe è ammesso. **Unica eccezione: Lenis**, lo scorrimento morbido voluto dall'utente
  (`DES-07`), che non parte con `prefers-reduced-motion`; nessun altro codice si aggancia al suo
  ciclo per frame.

## Worker e modulo

- **CODE-18** — Il worker **valida tutto lato server** (campi obbligatori, email, consenso privacy,
  Turnstile se configurato, campo trappola) e risponde sia in JSON (`Accept: application/json`) sia con
  redirect a `/grazie/` o `/invio-non-riuscito/` senza JavaScript. Le intestazioni email si codificano
  (`=?UTF-8?B?…?=`) e niente di ciò che scrive l'utente finisce in un'intestazione senza controllo.

## Dipendenze

- **CODE-11** — Una dipendenza entra solo se serve davvero; prima di importare, controlla
  `package.json`. Ammesse oggi: `astro`, `@astrojs/sitemap`, `@fontsource*`, `lucide-static`,
  `simple-icons`, `lenis`; in sviluppo `wrangler`, `@cloudflare/workers-types`, `typescript`, `@astrojs/check`,
  `yaml`. Qualunque altra si propone prima di aggiungerla.
- **CODE-12** — Node **≥ 22**. Un lavoro non è finito finché `npm run build`, `npm run check` e
  `npm run check:cms` non passano.

## Configurazione in un punto solo

- **CODE-13** — **Dominio**: costante `SITE_URL` in `astro.config.mjs` (override con env `SITE_URL`);
  la riga `Sitemap` di `robots.txt` si ricava da lì (`src/pages/robots.txt.ts`). **Sottocartella**:
  env `BASE_PATH` (radice per default, `/robertamari-portfolio` nell'anteprima GitHub Pages); ogni
  percorso interno assoluto passa da `withBase()` in `src/lib/paths.ts`, mai scritto a mano come `"/…"`.
- **CODE-14** — **Indicizzabilità**: un solo flag di build, `PUBLIC_SITE_INDEXABLE` (`SEO-10`).
- **CODE-15** — **Segreti** (`TURNSTILE_SECRET`) solo con `wrangler secret put` in produzione e in
  `.dev.vars` in locale (gitignored); le variabili non segrete del worker stanno in `wrangler.jsonc`
  (`GIT-04`).

## Commenti e pulizia

- **CODE-19** — Commenti con la **densità del codice intorno**, che dicono il **perché**, non il cosa.
  Mai date, riferimenti alla conversazione o a Roberta ("come chiesto il 23 nov"): quelli vanno
  nell'handoff o nel canone.
- **CODE-16** — Niente codice commentato, `console.log` di debug, file di prova o import inutilizzati.
