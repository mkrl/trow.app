import Peer from 'peerjs'

interface IdentityInterface {
    setName: (newName: string) => void
    setPeerId: (newPeer: string) => void
    setPeerRef: (newPeer: Peer) => void
    getName: () => string
    getPeerId: () => string
    getPeerRef: () => Peer
}

const masterPeerIdentity = ((): IdentityInterface => {
    let peerId: string
    let peerRef: Peer
    let name: string

    const _setName = (newName: string): void => {
        name = newName
    }
    const _setPeerRef = (newPeer: Peer): void => {
        peerRef = newPeer
    }
    const _setPeerId = (newID: string): void => {
        peerId = newID
    }
    return {
        setName: _setName,
        setPeerId: _setPeerId,
        setPeerRef: _setPeerRef,
        getName: (): string => name,
        getPeerId: (): string => peerId,
        getPeerRef: (): Peer => peerRef,
    }
})()

export default masterPeerIdentity
