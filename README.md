# Trow

It's like [scrum poker](https://en.wikipedia.org/wiki/Planning_poker), but without the poker!

A dead simple and lightweight WebRTC collaborative voting/estimating system, built on TypeScript and Preact.
Invite your friends and/or coworkers into rooms, start voting on the ideas.

## Building and developing

*   `npm install`: Installs dependencies

*   `npm start`: Run a development, HMR server

*   `npm run serve`: Run a production-like server

*   `npm run build`: Production-ready build

*   `npm run lint`: Pass TypeScript files using TSLint

In order to develop locally, you might need to install [PeerJS server](https://github.com/peers/peerjs-server) and run it locally (default config points to port 9000).

```
npm i -g peer
peerjs -p 9000
```

## Deployment

Be sure to specify `PEERJS_SERVER` environment variable to point your production build to your PeerJS server. 
