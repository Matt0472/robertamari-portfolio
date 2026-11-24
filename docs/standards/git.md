# Git, produzione e anteprime — `GIT-`

Il repository è **pubblico**: `Matt0472/robertamari-portfolio`. Per ora il sito si pubblica come
**anteprima su GitHub Pages** (`https://matt0472.github.io/robertamari-portfolio/`), con
`.github/workflows/pages.yml`: statica, senza worker, quindi il modulo propone l'email diretta, e
sempre `noindex` (decisione dell'utente, 24 nov 2026). Cloudflare, con il worker e il dominio,
arriverà dopo. Si lavora su **`main`**, e **ogni push su `main` va online**, come ogni salvataggio di
Roberta in Pages CMS.

## Commit e push

- **GIT-01** — **Mai commit né push senza un ok esplicito nella conversazione.** Finito un lavoro, si
  **mostra** cosa è cambiato (screenshot desktop e mobile, anteprima locale, riepilogo del diff) e ci si
  ferma. Un ok su una modifica non vale per la successiva.
- **GIT-02** — **Produzione**: Cloudflare (Workers Builds collegato al repository) costruisce e
  pubblica `main` da solo. Dopo il push si controlla l'esito del deploy e la pagina toccata online.
  Prima di lavorare in locale si fa `git pull`: Roberta salva su `main` dal CMS. Un lavoro da far vedere
  **prima** di pubblicarlo va su un branch, che Cloudflare pubblica come anteprima `noindex`.
- **GIT-03** — Messaggi di commit **in italiano**: `Area: cosa cambia` (es. "Laboratorio: aggiunte le
  fasi dell'incontro"), con il trailer di attribuzione in fondo.
- **GIT-04** — **Il repository si tratta come pubblico** anche se fosse privato: nessun segreto nei file
  tracciati (`CODE-15`), nessun dato personale oltre a quello pubblicato sul sito.
- **GIT-05** — Non si committano artefatti di lavoro: `dist/`, `.wrangler/`, `materiali/`, screenshot,
  script usa e getta.

## Perimetro

- **GIT-06** — **Regola del boy scout, con contenimento**: ciò che tocchi lo porti allo standard; se
  sistemarlo richiede di toccare file che la modifica non tocca già, non allargare il diff: annotalo
  come passo successivo nell'handoff.

## Modifiche delicate e go-live

- **GIT-07** — Sono **delicate**: creare il repository e decidere se è pubblico, collegare Cloudflare,
  comprare il dominio e configurare DNS, Email Routing e il binding `send_email`, le chiavi Turnstile,
  il flag di indicizzazione, un campo CMS rinominato o rimosso (`CMS-09`), qualunque cosa non si annulli
  con un revert. Si fanno con un **runbook** i cui passi dicono chi li esegue, **[TU]** o **[CLAUDE]**,
  e si percorrono insieme un passo alla volta.
- **GIT-08** — **Gli interruttori di produzione li aziona l'utente**: acquisto del dominio, DNS,
  dashboard Cloudflare, variabili e segreti del worker, `PUBLIC_SITE_INDEXABLE=true`. Claude prepara i
  comandi esatti e verifica dopo.
