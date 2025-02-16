import type Peer from 'peerjs'
import roomState from '../../roomState/roomStateService'

export interface ConnectionInterface {
    name: string
    peerId: string
}

type Connections = Array<ConnectionInterface>

interface IdentityInterface {
    setName: (newName: string) => void
    setPeerId: (newPeer: string) => void
    setPeerRef: (newPeer: Peer) => void
    getName: () => string
    getPeerId: () => string
    getPeerRef: () => Peer
    getConnections: () => Connections
    addConnection: (connection: ConnectionInterface) => boolean
    removeConnection: (peerId: string) => string | undefined
    findNameByPeer: (peerId: string) => string | undefined
    findPeerByName: (name: string) => string | undefined
}

const hostPeerIdentity = ((): IdentityInterface => {
    let peerId: string
    let peerRef: Peer
    let name: string
    let connections: Connections = []

    const _setName = (newName: string): void => {
        name = newName
    }
    const _setPeerRef = (newPeer: Peer): void => {
        peerRef = newPeer
    }
    const _setPeerId = (newID: string): void => {
        peerId = newID
    }
    const _addConnection = (connection: ConnectionInterface): boolean => {
        const { name } = connection
        const users = connections.map(conn => conn.name)
        if (
            !users.includes(name) &&
            name !== '' &&
            name !== hostPeerIdentity.getName()
        ) {
            connections.push(connection)
            roomState.addUser(name)
            return true
        }
        return false
    }
    const _removeConnection = (peerId: string): string | undefined => {
        const connToRemove = connections.find(conn => conn.peerId === peerId)
        if (connToRemove) {
            connections = connections.filter(item => item.peerId !== peerId)
            return connToRemove.name
        }
        return undefined
    }
    const _findNameByPeer = (peerId: string): string | undefined => {
        const connToFind = connections.find(conn => conn.peerId === peerId)
        if (connToFind) {
            return connToFind.name
        }
        return undefined
    }
    const _findPeerByName = (name: string): string | undefined => {
        const connToFind = connections.find(conn => conn.name === name)
        if (connToFind) {
            return connToFind.peerId
        }
        return undefined
    }
    return {
        setName: _setName,
        setPeerId: _setPeerId,
        setPeerRef: _setPeerRef,
        addConnection: _addConnection,
        getName: (): string => name,
        getPeerId: (): string => peerId,
        getPeerRef: (): Peer => peerRef,
        getConnections: (): Connections => connections,
        removeConnection: _removeConnection,
        findNameByPeer: _findNameByPeer,
        findPeerByName: _findPeerByName,
    }
})()

export default hostPeerIdentity
