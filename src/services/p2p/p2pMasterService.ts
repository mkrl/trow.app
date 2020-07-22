import {
    broadcastData,
    PayloadContent,
    PayloadInterface,
    sendHandshake,
} from './payloadService'
import logService from '../logService'
import { PAYLOAD_HANDSHAKE_RESPONSE } from '../../constants/p2pPayloadConstants'
import masterPeerIdentity from './identity/masterPeerIdentity'
import Peer from 'peerjs'
import roomState from '../roomState/roomStateService'

export interface ConnectionInterface {
    name: string
    peerId: string
}

const connections: Array<ConnectionInterface> = []
const names: Array<string> = []

interface ActionMapInterface {
    [key: string]: (payload: PayloadContent, conn: Peer.DataConnection) => void
}

const MASTER_ACTION_MAP: ActionMapInterface = {
    [PAYLOAD_HANDSHAKE_RESPONSE]: (payload: PayloadContent): void => {
        const activeUsers = roomState.getUserNames()
        if (!activeUsers.includes(payload.name) && payload.name !== null) {
            connections.push(payload)
            names.push(payload.name)
            roomState.addUser(payload.name)
            broadcastData({
                peer: masterPeerIdentity.getPeerRef(),
                connections,
                data: roomState.getState(),
            })
        } else {
            logService.error('Name is already in use or no name supplied')
        }
    },
}

export const onConnectMaster = (conn: Peer.DataConnection): void => {
    conn.on('data', (data: PayloadInterface) => {
        logService.log(`Id ${conn.peer} sent `, data)
        const callback = MASTER_ACTION_MAP[data.type]
        if (typeof callback !== 'function') {
            logService.error(
                `Got unrecognized data from ${conn.peer}, containing:`,
                data
            )
        } else {
            callback(data.payload, conn)
        }
    })
    conn.on('open', () => {
        logService.log('New slave connection with id ', conn.peer)
        sendHandshake({
            conn,
            name: masterPeerIdentity.getName(),
            peerId: masterPeerIdentity.getPeerId(),
            isHost: true,
        })
    })
    conn.on('close', () => {
        const leftUser = roomState.getNameByPeerId(conn.peer)
        if (leftUser) {
            logService.log('Disconnected slave ', leftUser)
            roomState.removeUser(leftUser)
        }
    })
}
