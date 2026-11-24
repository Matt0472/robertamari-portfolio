# Contenuti e Pages CMS — `CMS-`

Principio fondante: **se è contenuto sta nel CMS, se è struttura sta nel codice.** Roberta aggiorna il
sito in autonomia da Pages CMS; la struttura (layout, componenti, logica, stile, configurazione) la
tocca solo un tecnico.

## Contenuto vs struttura

- **CMS-01** — Ogni **contenuto** è modificabile da Roberta via Pages CMS, **mai scritto nel
  componente**: testi, titoli, immagini, testi alternativi, etichette dei pulsanti, link, contatti,
  meta/SEO, appuntamenti, voci del percorso. Il test: *"Roberta vorrà cambiarlo?"* Se sì, va nei
  contenuti.
- **CMS-02** — Fa eccezione solo il **microcopy d'interfaccia** che fa parte del funzionamento del
  componente: `aria-label` dei controlli ("Menu"), testo dello skip link, messaggi di stato del
  modulo. Nel dubbio è contenuto.

## Dove vivono i dati

- **CMS-03** — I contenuti stanno in **`src/content/`**: un file YAML per ogni sezione della home in
  `src/content/home/`, le collezioni in Markdown con frontmatter (`src/content/appuntamenti/`,
  `src/content/pagine/`). Ogni collezione ha il suo **schema in `src/content.config.ts`**, che valida
  i dati al build: un dato fuori schema rompe il build invece di rompere la pagina.
- **CMS-04** — **Corrispondenza a quattro**: schema in `src/content.config.ts` ↔ file in
  `src/content/` ↔ campi di `.pages.yml` ↔ componente che li legge. Una chiave che manca in
  `.pages.yml` è invisibile a Roberta; un campo che nessun componente legge la confonde.
  `npm run check:cms` verifica file ↔ `.pages.yml` e deve passare.
- **CMS-05** — **Chiave (`name`) in inglese, `label` e valore in italiano**
  (`{ name: title, label: Titolo }`).
- **CMS-06** — Le immagini caricate da Pages CMS stanno in **`src/assets/images/`** e nei contenuti si
  scrivono come `/images/nome-file.jpg` (`media.output` in `.pages.yml`). I componenti le risolvono con
  l'helper di `src/lib/`, così Astro le ottimizza; mai immagini di contenuto in `public/`.
- **CMS-07** — `settings.commit.identity: user` (ogni salvataggio riporta chi ha modificato) e
  `settings.content.merge: true` (una chiave non ancora in `.pages.yml` non si perde al salvataggio).

## Campi

- **CMS-08** — Ogni campo immagine ha accanto il suo **campo testo alternativo**.
- **CMS-09** — Rinominare o togliere un campo **migra i contenuti esistenti nella stessa modifica**:
  quello che Roberta ha già inserito non si perde mai. È una modifica delicata (`GIT-07`).
- **CMS-10** — **I dati di Roberta non si inventano**: contatti, date e luoghi del suo percorso, enti
  di formazione, dettagli del laboratorio (durata, numero di bambini, costo), dati del premio,
  citazioni dal libro. Se mancano, il campo resta vuoto, il componente gestisce il vuoto con garbo e il
  dato finisce nell'elenco «Dati da Roberta» dell'handoff. Un testo scritto da noi come bozza si
  dichiara tale finché Roberta non lo approva.
- **CMS-11** — **Il vuoto si gestisce**: lo schema trasforma `null` e `""` in stringa o lista vuota; un
  componente non stampa mai un titolo vuoto, "undefined" o un'immagine rotta.
- **CMS-15** — Ogni campo non ovvio ha una **`description` in italiano** in `.pages.yml`: cosa fa sulla
  pagina e cosa succede se resta vuoto.
- **CMS-16** — **Nessun titolo professionale regolamentato attribuito a Roberta** (per esempio
  «educatrice», professione regolata in Italia): si descrive cosa fa e cosa ha studiato.

## Manuale di Roberta

- **CMS-12** — Il progetto ha un **manuale d'uso per Roberta**, fatto come su softairmilano:
  sorgente in `docs/manuale-cliente.html` (frammento: `<title>` + `<style>` + corpo), generato in
  `public/<percorso-non-indovinabile>/index.html` (`noindex, nofollow`, `no-referrer`) da uno script in
  `scripts/` incluso in `dev` e `build`.
- **CMS-13** — Il manuale è **riservato**: non è linkato da nessuna pagina, non è in sitemap e **non
  compare in `robots.txt`**.
- **CMS-14** — Il manuale è **sincronizzato col sito**: ogni campo modificabile è spiegato, e si
  aggiorna **nella stessa modifica** che cambia `.pages.yml`. Finché non esiste, le sezioni da scrivere
  si annotano nell'handoff.
