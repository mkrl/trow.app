import Peer from 'peerjs'

interface IdentityInterface {
    setName: (newName: string) => void
    setPeerId: (newPeer: string) => void
    setMasterRef: (newConn: Peer.DataConnection) => void
    getName: () => string
    getPeerId: () => string
    getMasterRef: () => Peer.DataConnection
}

const slavePeerIdentity = ((): IdentityInterface => {
    let peerId: string
    let peerMasterRef: Peer.DataConnection
    let name: string

    const _setName = (newName: string): void => {
        name = newName
    }
    const _setPeerRef = (newConn: Peer.DataConnection): void => {
        peerMasterRef = newConn
    }
    const _setPeerId = (newID: string): void => {
        peerId = newID
    }
    return {
        setName: _setName,
        setPeerId: _setPeerId,
        setMasterRef: _setPeerRef,
        getName: (): string => name,
        getPeerId: (): string => peerId,
        getMasterRef: (): Peer.DataConnection => peerMasterRef,
    }
})()

export default slavePeerIdentity
