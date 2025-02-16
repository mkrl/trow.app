import Peer from 'peerjs'
import peerConfig from '../../config/peerConfig'
import { onConnectHost } from './p2pHostService'
import { onConnectClient } from './p2pClientService'
import hostPeerIdentity from './identity/hostPeerIdentity'
import clientPeerIdentity from './identity/clientPeerIdentity'
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

export const onError = (error: Error): void => errorService.setError(error.message)

export const createRoom = ({ name, callback }: CreateRoomInterface): void => {
    const peer = new Peer({ ...peerConfig })
    peer.on('open', (id: string) => {
        logService.log('Connected with id ', id)
        roomState.addUser(name)
        hostPeerIdentity.setPeerId(id)
        hostPeerIdentity.setName(name)
        hostPeerIdentity.setPeerRef(peer)
        callback(id)
    })
    peer.on('connection', onConnectHost)
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
        clientPeerIdentity.setPeerId(id)
        clientPeerIdentity.setName(name)
        callback(id)
        onConnectClient(conn)
    })
    peer.on('error', onError)
}
