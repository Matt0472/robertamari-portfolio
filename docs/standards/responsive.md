# Responsive — `RESP-`

- **RESP-01** — **Mobile-first.** Ogni layout si verifica a **320, 375, 768, 1024, 1440 px**, più
  **1920** per il contenitore, e su un **telefono basso** (375×667) accanto a uno alto (390×844).
- **RESP-02** — **Nessuno scroll orizzontale** e nessun overflow a nessuna larghezza. Le decorazioni
  che escono dai lati sono tagliate dalla loro sezione (`overflow-x: clip`).
- **RESP-03** — Gutter laterale **≥ 16px su mobile, ≥ 24px da desktop**.
- **RESP-04** — **Tap target ≥ 44px** per ogni elemento interattivo.
- **RESP-05** — **Immagini fluide** (`max-width: 100%`, `object-fit` corretto, nessuna larghezza fissa
  oltre il viewport).
- **RESP-06** — Sezioni a tutta altezza con **`100svh`** (o `100dvh`), mai `100vh`.
- **RESP-08** — Ogni layout a più colonne dichiara il suo **fallback per schermi stretti nello stesso
  componente**.
- **RESP-09** — La **navigazione desktop sta su una riga**; su mobile c'è il menu (`A11Y-08`).
