const DEFAULT_PEERJS_SERVER = '0.peerjs.com'

const peerConfig = {
    host: import.meta.env.VITE_PEERJS_SERVER ?? DEFAULT_PEERJS_SERVER,
}

export default peerConfig
