# Trow.app

It's like [scrum poker](https://en.wikipedia.org/wiki/Planning_poker), but without the poker!

A dead simple and lightweight WebRTC collaborative voting/estimating system, built with Preact.
Invite your friends and/or coworkers into rooms, start voting on the ideas.

https://en.wikipedia.org/wiki/Trow_(folklore)

Runs fully on the client side, but needs a signalling server for the initial connection.


## Getting Started

First of all, `pnpm install`

-   `pnpm dev` - Starts a dev server at http://localhost:5173/

-   `pnpm build` - Builds for production, emitting to `dist/`. Prerenders app to static HTML

-   `pnpm preview` - Starts a server at http://localhost:4173/ to test a production build locally

## Advanced debugging

To get verbose browser console logging in production, use https://debug.trow.app/ as an alternative url.
Verbose logging is always enabled in development mode.

## Support the project

While this is developed at my free time and my own amusement, it would not be possible without [peer.js](https://peerjs.com/). Please consider [donating](https://opencollective.com/peer) to keep the signalling servers alive.