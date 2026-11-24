# Design — `DES-`

Le **regole** del design. Il mestiere (come si giudica una sezione, cosa la fa sembrare un template)
sta nell'agente `design-specialist`; i **valori** stanno in `src/styles/global.css`.

## Autorità

- **DES-01** — I valori dei token vivono in `:root` di `src/styles/global.css`: sono la fonte di
  verità.

## Identità

- **DES-02** — L'identità è **«Radici e Orizzonti»**, il marchio che Roberta usa già
  (Instagram `@piccolicuoriconsapevoli`): un sole che sorge su una linea d'orizzonte, radici sottili
  che scendono sotto, piccoli uccelli in volo, la scritta «radici & orizzonti» in minuscolo. Segno a
  **linea sottile ed essenziale**, toni caldi della terra e del sole, calma, autenticità. Le radici
  sono il percorso e la formazione di Roberta, l'orizzonte è ciò che porta ai bambini.
  Il sito **non copia lo stile né le forme di lanternata.it e campodizucchemilano.it** (eventi legati
  allo stesso libro): niente cielo notturno, luna e stelle come ambientazione, niente scene
  illustrate, niente Fraunces, nessuna composizione o elemento ripreso da lì. **I colori invece si
  possono condividere**: non sono il problema (precisazione dell'utente, 23 nov 2026).
- **DES-03** — **Palette** (approvata dall'utente il 23 nov 2026, dal riferimento di `DES-09`):
  crema `#FAF7F2` e crema scuro `#F2EDE4` per i fondi, corteccia `#3D2B1F` per i titoli, prugna
  `#5C4B6B` per il testo, `#6B4C38` per il testo attenuato, brace `#9B3922` e brace chiara
  `#C4512E` per l'accento, oro `#E8A44A`, pesca `#F4C6A1` e pesca chiaro `#FAE8D8`, cielo
  `#C8D8E8` per l'alba. I valori vivono in `src/styles/global.css`. I **caratteri** sono in
  definizione: approvati su una prova vera, questa regola li nomina.

## Gerarchia e azione

- **DES-04** — È un **portfolio**: nell'apertura c'è **Roberta**, con la sua foto, chi è e cosa
  propone. La copertina del libro sta nella sezione del libro, non nell'apertura (decisione
  dell'utente, 23 nov 2026).
- **DES-05** — **È prima di tutto un portfolio**, su una **pagina unica** che segue Roberta: chi è,
  il libro, le risorse gratuite da scaricare e il premio, il laboratorio che propone, gli eventi
  fatti, organizzati o a cui ha partecipato, e in chiusura il modulo di contatto. **Nessuna azione domina l'apertura**: foto, nome
  e un'intro brevissima. L'unica azione ricorrente è **«Contattami»**, che porta al modulo
  `#contatti`; scoprire e comprare il libro sono subordinate. **Una sola etichetta per intento** su
  tutto il sito. Il contatto è **solo modulo ed email**: niente telefono né WhatsApp (decisioni
  dell'utente, 23 nov 2026).
- **DES-06** — Icone **solo SVG**, una famiglia (lucide) più le icone dei social (simple-icons).
  **Mai emoji come icone.**

- **DES-08** — **LUCE è il concetto e lo slogan di Roberta** e deve essere chiarissimo. È una
  **parola sola**, non un acronimo: la luce interiore che ognuno porta dentro, come la lanterna del
  libro. Apre il sito accanto a Roberta, con la sua frase «Ognuno di noi ha dentro una lanterna
  interiore. Basta ricordarsi di tenerla sempre accesa.». I **quattro valori** che tengono accesa la
  lanterna sono gratitudine, gentilezza, amore per sé stessi e rispetto (per sé stessi, per gli altri
  e per tutto ciò che ci circonda). Slogan, frase e valori sono testi del CMS (`CMS-01`). Decisione
  dell'utente, 23 nov 2026.

## Movimento

- **DES-07** — Il movimento ha uno scopo e usa le durate dei token. Sono voluti (decisione
  dell'utente, 23 nov 2026):
  - **titoli che compaiono** parola per parola, testi e foto che salgono con dolcezza
    (`data-reveal`, che diventa `.is-visible`);
  - **linee del marchio** che si disegnano;
  - **scorrimento morbido con inerzia** (Lenis);
  - **sfondo che si scalda** scorrendo.

  **L'elemento LCP dell'apertura (foto o titolo) non si anima.** Con `prefers-reduced-motion` il
  sito è statico e completamente leggibile, e Lenis non parte.
- **DES-09** — **Direzione: «la giornata della luce»**, con lo spirito (non la copia) del template
  Canopy che l'utente ha indicato come riferimento.
  - **Morbidezza e rotondità**: cornici ad arco per le foto, schede leggere sospese, etichette e
    pulsanti arrotondati, ombre morbide e calde.
  - **Titoli** in serif con una parola in corsivo color brace.
  - **La pagina è una giornata**: alba nell'apertura (cielo che sfuma nel crema), giorno nelle
    sezioni centrali, tramonto pesca verso Eventi e Instagram, sera con la lanterna accesa nei
    contatti (brace e oro).
  - **Personalità prima di tutto**: nessuna parte del sito sembra un template neutro.

## Decisioni già prese — non riproporre

- **DES-10** — Queste strade sono già state provate e **bocciate**. Non si ripropongono nemmeno come
  alternativa, salvo che sia l'utente a riaprirle:

  | Bocciato | Perché / al suo posto |
  |---|---|
  | Prima versione «bosco chiaro, acquerello»: macchie d'acquerello, notte stellata nei dettagli, Fraunces + Nunito + Caveat, lanterna illustrata come logo | Troppo simile a lanternata.it e campodizucchemilano.it → identità Radici e Orizzonti (`DES-02`). Rotondità, ombre morbide e pulsanti arrotondati sono stati **riaperti dall'utente** (`DES-09`) |
  | Stile «editoriale»: Instrument Serif + Geist, fondo bianco, filetti neri, sigillo rotante, fascia scorrevole | Bocciato |
  | Stile «colori pieni»: Unbounded, sezioni a blocchi di colore, bordi e ombre nette, adesivi | Bocciato |
  | Stile «stampa riso»: Gloock, blu e rosa sfalsati, retini a puntini | Bocciato |
  | Colorazioni 60/30/10 «Notte e pompelmo» (#0F1B3D, #EFE4CC, #FF6B8B), «Farina e basilico» (#F4EFE6, #1D1B18, #23863A), «Carta ed evidenziatore» (#F2EBDD, #1B2A57, #F3E33B) | Bocciate su tutti e tre gli stili |
  | Copertina del libro come immagine dell'apertura | Foto di Roberta in apertura (`DES-04`) |
  | Proporre uno stile con mockup schematici fatti di rettangoli | Si propongono solo **prove vere**, nel browser, con contenuti e immagini reali |
  | «Scaffold» neutro in bianco e nero per far giudicare solo la struttura (Source Serif 4 + Source Sans 3, niente forme morbide né movimento, LUCE gigante con un vuoto sopra) | «Imbarazzante, zero personalità»: ogni cosa mostrata all'utente si giudica come finita → `DES-09` |
  | Otto palette 60/30/10 proposte: le tre sopra più «Sabbia e sole», «Radici», «Argilla», «Lavagna e gesso», «Kraft e cobalto» | Nessuna piaciuta → palette del riferimento (`DES-03`) |

  Decisioni dell'utente del 23 nov 2026.
