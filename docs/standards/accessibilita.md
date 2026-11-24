# Accessibilità — `A11Y-`

- **A11Y-01** — **WCAG 2.2 livello AA è bloccante**: un fallimento AA blocca il lancio. Lighthouse
  Accessibility è solo un sottoinsieme superficiale; conta la verifica completa.

## Percepibile

- **A11Y-02** — **Contrasto** misurato, non stimato: ≥ **4.5:1** testo normale, ≥ **3:1** testo grande
  e componenti UI/bordi che servono a riconoscere un controllo (1.4.3, 1.4.11). Vale anche per il testo
  su foto o su sfondi colorati.
- **A11Y-03** — **Testo alternativo** descrittivo sulle immagini informative, `alt=""` su quelle
  decorative (macchie, foglie, linee). Gli alt delle immagini di contenuto sono campi CMS (`CMS-08`).
- **A11Y-04** — L'informazione non passa mai solo dal colore.

## Operabile

- **A11Y-05** — **100% operabile da tastiera**, ordine del focus logico, **focus sempre visibile** e mai
  nascosto dalla testata fissa (2.4.11): `scroll-padding-top` tiene conto della sua altezza.
- **A11Y-06** — **Skip link** "Vai al contenuto" funzionante.
- **A11Y-07** — `prefers-reduced-motion` spegne il movimento non essenziale (comparse, oscillazioni,
  rotazioni, fasce scorrevoli). Ciò che si muove da solo per più di 5 secondi ha un modo per fermarlo
  (2.2.2).
- **A11Y-08** — Il **menu mobile** si apre e chiude da tastiera, si chiude con **Esc**, ha
  `aria-expanded` corretto sul pulsante e tiene il focus dentro finché è aperto (resto della pagina
  `inert`).
- **A11Y-09** — Dimensione minima dei target 24×24 px (2.5.8); lo standard del progetto è 44 px
  (`RESP-04`).

## Comprensibile e robusto

- **A11Y-10** — **ARIA solo dove serve, e corretta**; prima gli elementi nativi.
- **A11Y-12** — **Modulo**: `<label>` associate a ogni campo, gruppi di scelte in `<fieldset>` con
  `<legend>`, obbligatori indicati anche a parole, errori annunciati (`role="status"` o
  `aria-describedby` + `aria-invalid`), focus sul primo campo da correggere, messaggi che dicono causa e
  rimedio. Il campo trappola anti-spam è fuori dal flusso del focus.
- **A11Y-13** — `lang="it"` sul documento.
