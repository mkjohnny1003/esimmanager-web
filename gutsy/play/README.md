# Gaboon Viper browser game (formerly GUTSY)

`index.html` is based on the open-source Gaboon Viper web prototype at
https://github.com/mkjohnny1003/gaboon-viper-web (formerly `gutsy-web`). The
site copy adds a responsive cabinet, Chinese/English leaderboard UI, and
optional score submission. The iPhone Game Center leaderboard is separate.

The game logic (including the 2.0.3 rival snake) must stay in sync with the
prototype: apply the same changes to both copies.

The public score API is the Cloudflare Worker in `../../worker/gutsy-scores/`.
Its D1 database is `gutsy-scores`, bound to the Worker as `DB`. Deploy schema
changes to D1 before deploying Worker code (see `migrations/`). The API URL is
configured in the `gutsy-score-api` meta tag in `index.html`.

Leaderboards are split by game mode (`standard`, `map`, `timeattack`). Each
submitted run carries `mode`; `GET /scores?mode=…` returns that mode's top 20.
Runs without a mode (older clients and records created before the split) count
as `standard`.

Run locally with `python3 -m http.server 8765` from the repository root, then
open `/gutsy/play/` or `/gutsy/play/?lang=en`. The Worker allows this local
origin for development. Public scores are client-reported, so this leaderboard
is recreational and is not suitable for prizes or trusted rankings.
