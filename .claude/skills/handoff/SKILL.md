---
name: handoff
description: "Write or update the project handoff, docs/in-development/HANDOFF.md, so the next agent — starting with zero context — can continue the work on Roberta Mari's site. Use when the user asks to hand off, wrap up the session, save progress or prepare to continue in a new conversation — \"passiamo la mano\", \"chiudiamo la sessione\", \"salva i progressi\", \"aggiorna l'handoff\". This project's own version: one handoff for the whole project, in Italian, with what the user and Roberta have seen, approved, rejected and still owe us. Usage: /handoff"
user-invocable: true
---

# Handoff

Write or update the handoff so the next agent can continue without repeating mistakes or
re-discovering what is already known.

**This is the project's own version, and it wins over the personal `handoff` skill.** What differs: a
single file for the whole project, written in Italian, with sections for what the user and Roberta
decided, and a sorting step that keeps rules out of the handoff.

## Where it lives

- Always **`docs/in-development/HANDOFF.md`**: one file for the whole project.
- A handoff found anywhere else belongs here: merge it and remove the other one.
- **Paths inside the handoff are relative to the repository root** (`src/components/...`).

## What goes here, and what does not

The handoff is the **state of the work in flight**; it expires when the work is done. Before writing,
sort what the session learned:

| What was learned | Where it goes |
|---|---|
| A rule that holds beyond the current work: a decision, a rejection, a convention | `docs/standards/` — **propose** it; the canon changes only with the user's ok. The handoff links the rule ID |
| Craft for a specialist: a technique that works, a verification trick, a trap | the matching agent in `.claude/agents/` — propose it |
| How the user wants to work (a preference, a correction) | memory |
| What is done, in progress, waiting for the user or Roberta, missing, next | **here** |

Never copy the canon into the handoff: link the rule (`DES-10`, `SEO-10`).

## Steps

1. **Read the existing file in full** before touching it. Keep what is still valid; remove what is
   stale or resolved.

2. **Gather the real state. Do not write from memory:**
   - `git status`, `git log --oneline -10`, unpushed commits (once a remote exists);
   - **what is online**: once Cloudflare is connected, the result of the last deploy of `main` and
     whether the live site matches it; until then say plainly that nothing is online;
   - the **last verified** build, checks and Lighthouse, with the date — never claim a pass not seen in
     this session;
   - what the **user** (and Roberta) saw in this session, approved and rejected, with the reason in
     their words.

3. **Write or update the file** with these sections, in Italian:

   - **Titolo e riga di aggiornamento** — `Aggiornato: <data assoluta, ora>` and one line on what
     changed.
   - **Obiettivo** — the site and its goals in two or three lines, and the current focus.
   - **Stato attuale** — sections done, key components, commits, what is online versus only local.
   - **In attesa dell'utente** — what has been shown and waits for an ok (`MEDIA-04`, `GIT-01`), and
     the open choices (style proposals, copy).
   - **Dati da Roberta** — everything still missing (`CMS-10`): photos, logo file, contacts, dates and
     places of her path, workshop details, award details, confirmations of drafted copy.
   - **Cosa ha funzionato** — approaches that worked, with exact commands.
   - **Cosa NON ha funzionato / trappole** — what failed and **why**. The most valuable section. A
     trap that has become a rule is proposed for the canon and left here as a link.
   - **File chiave** — `path:line` references with one line on why each matters.
   - **Ambiente & comandi** — only commands verified in this session; where secrets live
     (`.dev.vars`, `wrangler secret`), never the secrets.
   - **Prossimi passi** — ordered and actionable; the first one startable immediately.
   - **Da chiudere prima del go-live** — what must be fixed before the domain switch. `/audit` reads it
     as **known debt**, so keep it complete and labelled exactly like this.
   - **Decisioni aperte** — what needs the user's or Roberta's input, with the options.

## Writing rules

- **Italian**; code identifiers, paths and commands stay as they are.
- Write for a reader with **zero context**: no pronouns pointing at this conversation.
- **Absolute dates** ("23 nov 2026"), never "oggi" or "ieri".
- Specifics over prose: exact errors, paths, commands.
- As short as completeness allows.
- **Treat the repository as public (`GIT-04`)**: no secrets, and nothing about Roberta beyond what the
  site itself publishes.

## Finish

- **Do not commit** unless the user asks (`GIT-01`).
- If the sorting step produced proposals for the canon, an agent or memory, list them and wait for the
  ok before applying them.
- Tell the user the path and that a fresh conversation can start with *"Leggi
  docs/in-development/HANDOFF.md e continua"*.
