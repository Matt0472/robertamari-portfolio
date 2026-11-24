# Performance — `PERF-`

- **PERF-01** — **Lighthouse mobile ≥ 95** su Performance, Accessibility, Best Practices e SEO, misurato
  sulla **build** (`npm run preview`), non sul dev server.
- **PERF-02** — **LCP** < 2.5 s: l'immagine o il titolo dell'apertura ha la priorità
  (`loading="eager"`, `fetchpriority="high"`) e **non si anima** (`DES-07`).
- **PERF-03** — **CLS ~0**: spazio riservato a immagini, iframe e font.
- **PERF-04** — **Immagini** da `astro:assets` con `widths` e `sizes` adatti al riquadro in cui
  finiscono, formati moderni, **lazy sotto la piega** (`MEDIA-05`).
- **PERF-05** — **Font self-hosted** (`@fontsource`) con `font-display: swap`, solo i sottoinsiemi e i
  pesi usati; nessun font da CDN.
- **PERF-06** — **CSS/JS minimi**: nessun runtime di framework (`CODE-08`), TBT ~0.
- **PERF-08** — Le **terze parti** non pesano sul primo caricamento: Turnstile solo dove c'è il modulo
  (`CODE-09`).
- **PERF-09** — **Gli effetti costosi non si fanno**: un effetto che pesa più di quanto comunica si
  toglie (`CODE-17`).
