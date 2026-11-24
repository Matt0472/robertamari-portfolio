# Standard del progetto

Questa cartella è **l'unica autorità** su come si costruisce il sito di Roberta Mari. È scritta per le
persone prima che per gli assistenti AI: entrambi la leggono, entrambi ne sono vincolati.

Se qualcosa qui contraddice un commento, un agente, il `CLAUDE.md`, l'handoff
(`docs/in-development/HANDOFF.md`) o un'abitudine, **vince questo file.** Se una regola sembra
sbagliata per il caso che hai davanti, dillo e fermati: non improvvisare una variante (vedi
[Cambiare una regola](#cambiare-una-regola)).

Ogni regola ha un **ID** (`CMS-01`, `DES-04`, `A11Y-03`). Quando segnali qualcosa, cita l'ID.

## Dove sta scritto cosa

| Posto | Contiene | Test |
|---|---|---|
| `docs/standards/` (qui) | Le **regole**: come deve essere il sito e il codice | "Violarla è un difetto" |
| `src/styles/global.css` (`:root`) | I **valori** dei token di design (colori, font, raggi, ombre, durate) | "È un numero o un colore" |
| `src/content.config.ts` | Lo **schema** dei contenuti | "Che forma ha un dato" |
| `docs/in-development/HANDOFF.md` | Lo **stato** del lavoro: fatto, mancante, dati attesi da Roberta, trappole | "Scade quando il lavoro finisce" |
| `docs/audits/` | Cosa ha trovato un audit **il giorno in cui è stato fatto** | "È un verbale" |

L'handoff e gli audit non sono documentazione: non si mantengono a lavoro chiuso e **nessun commento
nel codice li cita**. Quando una lezione dell'handoff diventa una regola stabile, si sposta qui.

## I file

| File | Copre |
|---|---|
| [`contenuti-cms.md`](contenuti-cms.md) | Contenuto vs struttura, Pages CMS, `src/content`, `.pages.yml`, manuale di Roberta — `CMS-` |
| [`codice.md`](codice.md) | Lingua, stack, struttura, token, JS client, worker, dipendenze, commenti — `CODE-` |
| [`design.md`](design.md) | Identità Radici e Orizzonti e **decisioni da non riproporre** — `DES-` |
| [`media.md`](media.md) | Foto reali, bambini, copertina, logo, favicon, formati — `MEDIA-` |
| [`accessibilita.md`](accessibilita.md) | WCAG 2.2 AA, **bloccante** — `A11Y-` |
| [`performance.md`](performance.md) | Lighthouse, Core Web Vitals, peso — `PERF-` |
| [`responsive.md`](responsive.md) | Mobile-first, breakpoint, overflow, tap target — `RESP-` |
| [`seo.md`](seo.md) | SEO, JSON-LD, GEO, **gate di indicizzazione** — `SEO-` |
| [`git.md`](git.md) | Commit, push, produzione, segreti, modifiche delicate — `GIT-` |

## Non negoziabili

- **Ogni contenuto è modificabile da Roberta via Pages CMS**, mai scritto nel componente (`CMS-01`).
- **Mai commit o push senza un ok esplicito** dopo aver mostrato le modifiche (`GIT-01`).
- **Solo la produzione sul dominio definitivo è indicizzabile** (`SEO-10`).
- **WCAG 2.2 AA è bloccante** per il lancio (`A11Y-01`).
- **Niente volti di bambini senza consenso scritto, niente immagini AI di Roberta, dei bambini o del
  libro** (`MEDIA-02`, `MEDIA-03`).
- **Il sito non copia stile e forme di lanternata.it e campodizucchemilano.it** (`DES-02`).
- **Le decisioni già prese non si ripropongono** (`DES-10`).

## Cambiare una regola

Le regole si cambiano, non si aggirano. Una regola sbagliata si corregge qui, con l'ok dell'utente,
**prima** di scrivere codice che la viola; poi il codice si allinea. Una regola nuova nasce da una
decisione che vale oltre il caso singolo: si aggiunge al file giusto con il prossimo ID libero e una
riga sul perché.

## Debito noto

Violazioni accettate per ora, con il motivo. Un audit le riporta come **debito noto**, non come
regressioni. Si sistemano quando si tocca quel codice (`GIT-06`).

| Dove | Regola | Perché è ancora lì |
|---|---|---|
| Commenti in italiano in `wrangler.jsonc` e `.gitignore` | `CODE-01` | Fuori dal rifacimento di `src/`; si convertono alla prossima modifica di quei file |
| Immagine social verticale (la copertina) invece di 1200×630 | `SEO-04` | Manca l'immagine orizzontale dedicata |
| Dettagli del laboratorio e frasi della biografia ipotizzati | `CMS-10` | Bozze in attesa di Roberta; l'elenco è nell'handoff |
| Foto prese dai post Instagram di Roberta (risoluzione dei video: 720 px) | `MEDIA-01` | In attesa degli originali da Roberta |
