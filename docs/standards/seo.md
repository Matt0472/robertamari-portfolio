# SEO, GEO e indicizzazione — `SEO-`

## On-page e tecnica

- **SEO-01** — **HTML semantico**: esattamente **un `<h1>` per pagina**, gerarchia dei titoli senza
  salti, landmark corretti (`header`, `nav`, `main`, `footer`).
- **SEO-02** — **`<title>` e meta description unici** per pagina, gestiti **da un solo punto** (il
  layout, via props) e alimentati dal CMS (`CMS-01`).
- **SEO-03** — **URL canonico** su ogni pagina, slug puliti, `lang="it"`, favicon e `theme-color`.
- **SEO-04** — **Open Graph + Twitter Card** su ogni pagina, con **immagine raster 1200×630**
  (PNG/JPG: i social non mostrano gli SVG).
- **SEO-05** — **JSON-LD** valido: `Person` (Roberta, con `sameAs` dei profili e il premio), `Book`
  (titolo, autrice, ISBN, editore, età, premio) e `Event` per gli appuntamenti futuri. Dati dal CMS,
  mai inventati (`CMS-10`).
- **SEO-06** — **`sitemap.xml`** via `@astrojs/sitemap`; privacy, grazie, invio non riuscito e 404
  sono `noindex` ed escluse dalla sitemap, come il manuale (`CMS-13`).
- **SEO-07** — **Copy orientato alle ricerche** reali in modo naturale ("lettura animata scuola
  dell'infanzia", "laboratorio lanterne bambini", "Il richiamo delle lanterne", "Roberta Mari
  autrice"), senza keyword stuffing. Le scelte di copy restano di Roberta.

## GEO — farsi citare dagli assistenti AI

- **SEO-08** — Contenuto **answer-first**: chi è Roberta, cosa propone, a chi, dove, quanto dura,
  come si prenota, detto in testo chiaro e citabile, non solo in immagini o animazioni.
- **SEO-09** — In produzione `robots.txt` ammette tutti i crawler, AI compresi, e indica la sitemap.

## Gate di indicizzazione (regola critica)

- **SEO-10** — **Solo la produzione sul dominio definitivo è indicizzabile**: lo decide un solo flag di
  build, `PUBLIC_SITE_INDEXABLE=true` (`CODE-14`), impostato dall'utente nel build di produzione su
  Cloudflare il giorno del dominio. Ogni altra build (locale, anteprime, indirizzo `workers.dev`) ha
  `robots.txt` con `Disallow: /` e `<meta name="robots" content="noindex">` su ogni pagina.
- **SEO-11** — Il percorso del manuale **non compare mai** in `robots.txt` (`CMS-13`).
