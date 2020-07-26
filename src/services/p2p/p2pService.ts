import Peer from 'peerjs'
import peerConfig from '../../config/peerConfig'
import { onConnectMaster } from './p2pMasterService'
import { onConnectSlave } from './p2pSlaveService'
import masterPeerIdentity from './identity/masterPeerIdentity'
import slavePeerIdentity from './identity/slavePeerIdentity'
import logService from '../logService'
import roomState from '../roomState/roomStateService'
import errorService from '../errorService'

interface CreateRoomInterface {
    name: string
    callback: (id: string) => void
}

interface JoinRoomInterface {
    roomId: string
    name: string
    callback: (id: string) => void
}

export const onError = (error: string): void => errorService.setError(error)

export const createRoom = ({ name, callback }: CreateRoomInterface): void => {
    const peer = new Peer({ ...peerConfig })
    peer.on('open', (id: string) => {
        logService.log('Connected with id ', id)
        roomState.addUser(name)
        masterPeerIdentity.setPeerId(id)
        masterPeerIdentity.setName(name)
        masterPeerIdentity.setPeerRef(peer)
        callback(id)
    })
    peer.on('connection', onConnectMaster)
    peer.on('error', onError)
}

export const joinRoom = ({
    roomId,
    name,
    callback,
}: JoinRoomInterface): void => {
    const peer = new Peer({ ...peerConfig })
    peer.on('open', (id: string) => {
        logService.log('Connected with id ', id)
        const conn = peer.connect(roomId, { reliable: true })
        slavePeerIdentity.setPeerId(id)
        slavePeerIdentity.setName(name)
        callback(id)
        onConnectSlave(conn)
    })
    peer.on('error', onError)
}
