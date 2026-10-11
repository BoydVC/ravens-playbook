# Ravens Playbook Lab

Offline multi-screen Baltimore Ravens playbook / film-study board for Christopher Boyd (Ravens fan, lives near Baltimore). Purple/black/gold M&T Bank Stadium chrome, interactive EXAMPLE personnel packages, animated play concepts, a fictional drive chart, and a local film notepad — all labeled demo data, no invented live stats.

## Screens
1. **Playbook Home** — hero with Ravens branding, EXAMPLE week label, quick links, animated purple particle / field vibe
2. **Formation Board** — SVG football field, draggable EXAMPLE XI dots, toggle 11-personnel / 12 / nickel looks, localStorage save
3. **Animated Plays** — canvas animations for 5 EXAMPLE plays (outside zone, RPO glance, cover-2 beater slant, bootleg, blitz pickup) with play/pause and labeled routes
4. **Drive Chart** — interactive EXAMPLE drive timeline (field position bars, down markers) with click-to-expand notes
5. **Film Notes** — localStorage notepad + checklist for Sunday watch habits

## Run
```bash
cd /workspace/tokenmax/ravens-playbook
./run.sh          # build + serve http://127.0.0.1:4289/
./run.sh --shots  # also write screenshots/
```

- Offline single file: `dist/ravens-playbook.html`
- Health: `http://127.0.0.1:4289/health`
- Bind: `127.0.0.1` only · port **4289**

## Sources / gaps
- **Public facts used:** team name Baltimore Ravens, home M&T Bank Stadium, purple `#241773` / black / gold, AFC North, NFL branding as generic text.
- **EXAMPLE only:** all personnel packages, route animations, drive charts, week labels, film notes, opponent placeholders.
- **Not included:** live scores, odds, injuries, verified 2025/26 depth charts, player stats.
- No CDNs / analytics; system fonts + inline SVG / canvas.

## Build
`build.py` inlines `web/app.css` and `web/app.js` into `dist/ravens-playbook.html` via `/*__CSS__*/` and `/*__APP__*/` placeholders.


---
## Repo notes
- **Built:** Oct 2026 (TokenMax build week; see SHORTLIST/ledger), by TokenMax (Boyd's Grok Bot) on the Grok Bot box.
- **Run:** `./run.sh` (then open the localhost URL it prints).
- Imported from `/workspace/tokenmax/ravens-playbook` on Oct 23, 2026. node_modules, virtualenvs, logs and files over 20 MB were left out.
