# Media — `MEDIA-`

Foto, copertina, logo e favicon. Il procedimento sta nell'agente `asset-specialist`; qui ci sono le
regole.

## Fonti e fiducia

- **MEDIA-01** — **Budget zero**: nessun asset a pagamento. Si usano le foto di Roberta, i materiali
  dell'editore e, solo per texture neutre, stock con licenza libera commerciale.
- **MEDIA-10** — Le **illustrazioni del libro** (Belgiorno, Stellafiore, il bosco) sono di Roberta e
  dell'utente, che le hanno date all'editore. Si possono usare per materiali gratuiti legati al
  libro (per esempio una scheda da colorare), **partendo dai loro file originali o dal PDF del
  libro**: mai ridisegnate, imitate o generate con l'AI (`MEDIA-02`). Precisazione dell'utente,
  24 nov 2026.
- **MEDIA-02** — **Nessuna immagine generata con l'AI che mostri Roberta, i bambini, i laboratori o il
  libro**, e nessuna imitazione delle illustrazioni del libro: il sito presenta una persona reale e un
  lavoro reale, e le illustrazioni si usano solo dai file originali (`MEDIA-10`). La verità la danno
  solo le foto vere.
- **MEDIA-03** — **Bambini**: una foto in cui un bambino è riconoscibile si pubblica solo con il
  **consenso scritto** dei genitori (o della scuola che lo raccoglie). In assenza, mani, lanterne,
  bambini di spalle o fuori fuoco.
- **MEDIA-04** — Ogni asset nuovo si **mostra e si fa approvare** prima di collegarlo al sito.

## Formati e peso

- **MEDIA-05** — I sorgenti (JPG, PNG, WebP) stanno in `src/assets/images/`; formati moderni e
  `srcset` li genera Astro (`<Image>` con `widths` e `sizes`). Niente HEIC: Pages CMS accetta solo le
  estensioni elencate in `.pages.yml`.
- **MEDIA-06** — La **copertina** viene dall'editore o da Roberta, mai ricostruita. Si preferisce il
  file in alta risoluzione dell'editore a quello scaricato dalla scheda prodotto (529×794).

## Identità

- **MEDIA-07** — Il **logo «Radici e Orizzonti»** è di Roberta. Si usa il file originale; un
  ridisegno vettoriale è ammesso solo se **fedele**, senza reinterpretazioni, e approvato da Roberta.
- **MEDIA-08** — La **favicon** nasce da `public/favicon.svg`, con `public/apple-touch-icon.png`
  (180×180) ricavata dallo stesso disegno; si rigenerano insieme quando cambia l'identità.
- **MEDIA-09** — Le **immagini segnaposto** sono riconoscibili come tali, elencate nell'handoff e non
  vanno mai online.
