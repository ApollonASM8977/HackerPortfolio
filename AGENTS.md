# AGENTS.md — HackerPortfolio

**Read first.** The owner's rules for every project (mandatory checklists, synchronisation at the start and end of every session, standing rules) are in `AGENTS-master.md`, in the owner's private repository `agents-rules`, cloned at `~/agents-rules` on each of the owner's computers and loaded automatically by the global `~/.claude/CLAUDE.md`. Apply them before anything else. If they are not in your context, read `~/agents-rules/AGENTS-master.md` first; if you cannot, ask the owner before working. This file only holds what is specific to this project.

## This project

- **What it is**: The owner's cybersecurity portfolio: CTF challenges, live terminal, animations (live site on Vercel).
- **Category**: Personnel; public repository: nothing private may be written in it (no secret, no private matter).
- **Stack**: React + TypeScript + Vite, Tailwind CSS, Framer Motion, Vercel (`vercel.json`).
- **Install, run, test**:
  - `npm install --ignore-scripts`, `npm run dev`; before pushing: `npm run lint` and `npm run build`.
- **Branches**: work and test on `stg`; `main` is production and only receives work the owner has validated, merged from `stg` on the owner's OK. A push to `main` deploys: Vercel publishes the live site (other branches such as `stg` only get a Vercel preview address).
- **Folder**: mini-PC `D:\My Project\Personnel\HackerPortfolio`; on another computer, `~/agents-rules/sync-all.cmd` clones it in the same place under that computer's root.
- **Where we are**: `README.md`; create `docs/agent/HANDOFF.md` (and the other traces of the master file) as soon as real work starts here.
- **Rules learned on this project**: none yet.
