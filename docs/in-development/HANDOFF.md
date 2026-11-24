# Handoff — sito di Roberta Mari

Aggiornato: 24 nov 2026.

## Obiettivo

Sito-portfolio a **pagina unica** di Roberta Mari (`DES-05`): prima Roberta, poi il libro, le
risorse gratuite e il premio, poi il laboratorio, poi gli eventi, poi Instagram, e in chiusura il
modulo di contatto (solo
modulo ed email, niente telefono né WhatsApp). LUCE è il concetto e lo slogan centrale (`DES-08`).
Direzione grafica: **«la giornata della luce»** (`DES-09`), palette dal riferimento Canopy
(`DES-03`).

## Stato attuale

- **Restyling completo fatto**, in attesa del giudizio dell'utente sulla pagina vera
  (`http://localhost:4334` con `npm run dev -- --port 4334`, o la configurazione `astro-dev-alt`
  in `.claude/launch.json`).
- **Codice e chiavi CMS in inglese** (`CODE-01`, `CMS-05`). Restano in italiano solo i commenti di
  `wrangler.jsonc` e `.gitignore`.
- **Caratteri**: Newsreader per i titoli, DM Sans per il testo. Da far approvare, poi vanno in
  `DES-03`.
- **Animazioni**:
  - comparse `data-reveal` → `.is-visible`;
  - titoli che compaiono parola per parola (`src/components/Heading.astro`);
  - linee del marchio (`src/components/Mark.astro`);
  - Lenis (`window.lenis`), spento con «riduci movimento».
- **Corsivo nei titoli**: Roberta lo segna con `*parola*`; lo trasforma `src/lib/emphasis.ts`, solo
  sui 20 campi titolo elencati nelle descrizioni di `.pages.yml`.
- **Foto vere** prese dai post Instagram di Roberta, senza bambini, ritagliate e ripulite dai
  metadati, in `src/assets/images/`. Originali scaricati in `materiali/instagram/` (gitignored).
  - In «Chi sono» c'è `roberta-sorriso.jpg`, una copertina di video da 720 px con un alone bianco:
    è la foto più debole. Ritagliata per togliere un numero civico.
  - `cornaredo-locandina.jpg` è ritagliata per togliere la metà con l'evento di Halloween, che
    non era di Roberta.
- **Immagine social** 1200×630: `src/assets/images/social.jpg`.
- **Libro**:
  - il blocco d'acquisto è una finestrella ad arco con Amazon e la nota sulla libreria;
  - la scheda (editore, collana, età, formati) è tolta dalla pagina.
- **Risorse gratuite** (`src/components/sections/Resources.astro`, tra libro e premio):
  - download libero, nessun dato raccolto;
  - PDF in `public/risorse/` tramite il media `downloads` di Pages CMS;
  - primo materiale: «La mindfulness della lanterna». Il sorgente HTML e le anteprime sono in
    `materiali/risorse/`, rigenerabili con Chrome headless;
  - i metadati del PDF sono corretti con PDFKit (autrice Roberta Mari).
- **Scheda da colorare di Belgiorno e Stellafiore: in pausa** per scelta dell'utente.
  - Il PDF del libro in `materiali/libro/` è una **versione errata** (parole dell'utente), e le sue
    immagini sono solo 448×640 px.
  - I contorni di prova sono in `materiali/risorse/colorare/` (Belgiorno quasi usabile, Stellafiore
    debole).
  - Si riprende con la versione giusta del libro o, meglio, con i file originali dei disegni, al
    tratto se esistono (`MEDIA-10`).
- **Verifiche passate**: `npm run build`, `npm run check` (0 errori) e `npm run check:cms`; il
  worker è provato con `npm run preview:worker`, con tutti gli esiti.
- **Revisioni** di accessibilità, codice e CMS fatte sul restyling; tutte le correzioni applicate.
  Il bloccante (un pulsante con il focus che restava invisibile) è risolto.
- **Repository pubblico** `Matt0472/robertamari-portfolio` (branch `main`).
- **Anteprima su GitHub Pages**: `https://matt0472.github.io/robertamari-portfolio/`, con il
  workflow `.github/workflows/pages.yml` a ogni push su `main`.
  - È statica e senza worker: il modulo dice che l'invio non è ancora attivo e propone l'email.
  - Resta sempre `noindex`.
  - Il sito vive nella sottocartella grazie a `BASE_PATH` e `withBase()` (`CODE-13`).
  - Cloudflare, con il worker, il dominio ed Email Routing, arriva dopo, per scelta dell'utente.

## In attesa dell'utente

- Giudizio sul restyling, e approvazione dei caratteri (`DES-03`).
- Riquadri Instagram: quadrati (oggi, testa tagliata nella foto al mare) o 3:4.
- Il titolo e il pulsante della sezione Instagram dicono entrambi «Seguimi su Instagram».
- Nome e visibilità del repository GitHub; dominio (ipotesi `robertamari.it`).

## Dati da Roberta

- **Foto originali** in alta risoluzione: soprattutto un ritratto per «Chi sono», poi la
  premiazione sul palco. Quelle di Instagram dei video sono a 720 px.
- **File originale del logo** «Radici e Orizzonti».
- **Date e ordine delle tappe** del percorso; università della laurea; ente del master.
- **Dettagli del laboratorio**, oggi ipotizzati (durata, gruppo, materiali, costo).
- **Bozze nostre da confermare**:
  - i titoletti;
  - il testo dei contatti e di Instagram;
  - la scheda nell'apertura;
  - i testi dei quattro valori;
  - la frase sul centro diurno;
  - i testi di «Risorse gratuite» (titolo, testo, descrizione del PDF, testo del pulsante) e il PDF
    «La mindfulness della lanterna», approvato dall'utente per ora;
  - la nota sotto i pulsanti d'acquisto del libro (`book.purchase_note`): «Oppure chiedilo nella
    tua libreria di fiducia.».
- **Eventi** (confermati dall'utente):
  - Bologna, 13 e 15 ottobre;
  - Cornaredo, 31 ottobre, con Roberta;
  - Chieri, 7 novembre, e BREMA, 14 novembre: organizzati da altri, senza Roberta;
  - Lanternata: 7-8, 14-15 e 21 novembre;
  - premiazione, 21 novembre.

  Mancano eventuali altre scuole.
- **Una citazione dal libro** (`book.quote` è vuoto).

## Dati del libro

- **Editore e ISBN** stanno in `book.publisher` e `book.isbn`: non compaiono sulla pagina, li
  leggono solo i dati strutturati in `Base.astro`.
- **Tolti dalla pagina su richiesta esplicita dell'utente (24 nov 2026)**, non persi per errore
  (prima erano righe di `book.details`, campo eliminato). Se si vogliono rimettere, i valori erano:
  - Collana: «Nuove Voci – Fabulae»;
  - Età di lettura: «Dai 3 anni»;
  - Formati: «Libro cartaceo ed eBook».

## Cosa ha funzionato

- **Mostrare solo pagine finite e con personalità**: lo scaffold neutro è stato bocciato
  («imbarazzante») ed è finito in `DES-10`.
- **Riferimento dato dall'utente** (Canopy): leggerne i colori esatti dal sito ha chiuso subito la
  scelta della palette.
- **Instagram con il login dell'utente**: post via `og:description`, storie in evidenza viste nel
  browser, foto originali dagli `<img>` della griglia (fino a 3024 px).
- **Squadra di specialisti**: cms → design → revisioni in parallelo (accessibilità, codice, CMS),
  con nomi di file e contratti dei campi decisi in anticipo.

## Trappole

- **Pannello del browser nascosto o scheda in secondo piano**: le animazioni restano in pausa e la
  pagina sembra vuota. Portare la scheda in primo piano (`tabs_select`) prima di giudicare.
- **Lenis blocca lo scorrimento interno** (menu aperto, textarea) se manca `data-lenis-prevent`.
- **Lenis non vede gli scorrimenti nativi** (focus nella testata): risincronizzarlo prima di
  `scrollTo`.
- **Gli elementi `data-reveal`** devono diventare visibili anche quando ricevono il focus.
- **Server di sviluppo di un'altra sessione sulla 4330**: usare la configurazione `astro-dev-alt`
  sulla 4334.
- **Primo caricamento in sviluppo**: l'ottimizzazione delle immagini è lenta, aspettare prima dello
  screenshot.
- **Togliere un campo dal CMS prima del codice che lo legge** rompe la pagina in sviluppo: cambiare
  schema e componenti nello stesso passaggio.
- **Niente poppler sul Mac**: le pagine dei PDF si trasformano in immagini con un piccolo
  programma Swift che usa PDFKit (ricompilarlo, perché la scratchpad non dura).

## File chiave

| File | Cosa contiene |
|---|---|
| `src/styles/global.css` | Token: palette, caratteri, durate, raggi, bagliori |
| `src/layouts/Base.astro` | Meta, JSON-LD, Lenis, comparse, focus sulle ancore |
| `src/components/sections/*` | Una sezione per file, compresa `Instagram.astro` |
| `src/components/{Heading,Mark,FloatingContact,NewTabHint}.astro` | Titoli a parole, linee del marchio, pulsante a galla, avviso «nuova scheda» |
| `src/lib/{content,dates,emphasis,email,images,indexing}.ts` | Helper |
| `src/content.config.ts`, `.pages.yml` | Schema e campi del CMS. Una foto senza descrizione non va online (`describedImage`) |
| `worker/index.ts` | Modulo di contatto |

## Prossimi passi

1. Raccogliere il giudizio dell'utente sul restyling e rifinire.
2. Approvati i caratteri, scriverli in `DES-03`.
3. Seguiti separati (`GIT-06`):
   - JSON-LD con valori fissi in `Base.astro` (`jobTitle`, `genre`, `typicalAgeRange`; `CMS-01`,
     con il `seo-specialist`);
   - ~~editore letto dall'etichetta «Editore»~~: risolto, ora è il campo `book.publisher`;
   - `.header__contact` in `Header.astro` può usare la nuova classe `.button--large`;
   - con 3 risorse a 1024 px la terza resta sola su una nuova riga;
   - la regola `CMS-17` sui file scaricabili in `public/risorse/` va proposta all'utente.
4. `/audit` completo come quality gate, compreso il `performance-specialist`: Newsreader pesa circa
   280 KB tra regular e italic, e `backdrop-filter` va valutato.
5. Cloudflare (worker, dominio, Email Routing, Turnstile) con runbook (`GIT-07`), al posto dell'anteprima GitHub Pages.
6. Manuale per Roberta (`CMS-12`). Sezioni da scrivere:
   - Instagram;
   - foto, copertina, ISBN ed editore del libro, e la finestrella d'acquisto (pulsanti e nota);
   - «La tua parola» (LUCE);
   - gli asterischi nei titoli;
   - una foto senza descrizione non compare;
   - 404, privacy e scheda dell'apertura;
   - «Risorse gratuite»: caricare un PDF, sostituirlo con una versione nuova, togliere un
     materiale, ricavare l'anteprima dalla prima pagina del PDF.

## Da chiudere prima del go-live

- Foto originali al posto di quelle da 720 px; dati ipotizzati sostituiti (`CMS-10`).
- Dominio, Email Routing e binding `send_email`, chiavi Turnstile. `TURNSTILE_SECRET` e
  `PUBLIC_TURNSTILE_SITE_KEY` vanno impostate insieme: se c'è solo il segreto, ogni invio fallisce.
- `PUBLIC_SITE_INDEXABLE=true` solo sul dominio definitivo (`SEO-10`, `GIT-08`).
- `/audit` senza bloccanti di accessibilità (`A11Y-01`).
