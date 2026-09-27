# GUTSY browser game

`index.html` is based on the open-source GUTSY web prototype at
https://github.com/mkjohnny1003/gutsy-web (commit
`35079d6cd56f0c2ecc5b2362b5d89b63abf31b50`). The site copy adds a
responsive cabinet, Chinese/English leaderboard UI, and optional score
submission. The iPhone Game Center leaderboard is separate.

The public score API is the Cloudflare Worker in `../../worker/gutsy-scores/`.
Its D1 database is `gutsy-scores`, bound to the Worker as `DB`. Deploy schema
changes to D1 before deploying Worker code. The API URL is configured in the
`gutsy-score-api` meta tag in `index.html`.

Run locally with `python3 -m http.server 8765` from the repository root, then
open `/gutsy/play/` or `/gutsy/play/?lang=en`. The Worker allows this local
origin for development. Public scores are client-reported, so this leaderboard
is recreational and is not suitable for prizes or trusted rankings.
