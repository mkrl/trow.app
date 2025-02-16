import type { DataConnection } from 'peerjs'

interface IdentityInterface {
    setName: (newName: string) => void
    setPeerId: (newPeer: string) => void
    setHostRef: (newConn: DataConnection) => void
    getName: () => string
    getPeerId: () => string
    getHostRef: () => DataConnection
}

const clientPeerIdentity = ((): IdentityInterface => {
    let peerId: string
    let peerHostRef: DataConnection
    let name: string

    const _setName = (newName: string): void => {
        name = newName
    }
    const _setPeerRef = (newConn: DataConnection): void => {
        peerHostRef = newConn
    }
    const _setPeerId = (newID: string): void => {
        peerId = newID
    }
    return {
        setName: _setName,
        setPeerId: _setPeerId,
        setHostRef: _setPeerRef,
        getName: (): string => name,
        getPeerId: (): string => peerId,
        getHostRef: (): DataConnection => peerHostRef,
    }
})()

export default clientPeerIdentity
