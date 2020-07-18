import Peer from 'peerjs'
import peerConfig from '../../config/peerConfig'
import { onConnectMaster } from './p2pMasterService'
import { onConnectSlave } from './p2pSlaveService'
import masterPeerIdentity from './identity/masterPeerIdentity'
import slavePeerIdentity from './identity/slavePeerIdentity'
import logService from '../logService'

interface CreateRoomInterface {
    name: string
    callback: (id: string) => void
}

interface JoinRoomInterface {
    roomId: string
    callback: (id: string) => void
}

export const createRoom = ({ name, callback }: CreateRoomInterface): void => {
    const peer = new Peer({ ...peerConfig })
    peer.on('open', (id: string) => {
        logService.log('Connected with id ', id)
        callback(id)
        masterPeerIdentity.setPeerId(id)
        masterPeerIdentity.setName(name)
        masterPeerIdentity.setPeerRef(peer)
    })
    peer.on('connection', onConnectMaster)
    // window.peer = peer
}

export const joinRoom = ({ roomId, callback }: JoinRoomInterface): void => {
    const peer = new Peer({ ...peerConfig })
    peer.on('open', (id: string) => {
        logService.log('Connected with id ', id)
        const conn = peer.connect(roomId)
        callback(id)
        slavePeerIdentity.setPeerId(id)
        onConnectSlave(conn)
        // window.peer = peer
        // window.conn = conn
    })
}
