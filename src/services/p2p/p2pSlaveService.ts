import logService from '../logService'
import { PAYLOAD_HANDSHAKE_REQUEST } from '../../constants/p2pPayloadConstants'
import {
    PayloadContent,
    PayloadInterface,
    sendHandshake,
} from './payloadService'
import slavePeerIdentity from './identity/slavePeerIdentity'
import Peer from 'peerjs'

interface ActionMapInterface {
    [key: string]: (payload: PayloadContent, conn: Peer.DataConnection) => void
}

const SLAVE_ACTION_MAP: ActionMapInterface = {
    [PAYLOAD_HANDSHAKE_REQUEST]: (
        payload: PayloadContent,
        conn: Peer.DataConnection
    ): void => {
        sendHandshake({
            conn,
            name: slavePeerIdentity.getName(),
            peerId: slavePeerIdentity.getPeerId(),
        })
    },
}

export const onConnectSlave = (conn: Peer.DataConnection): void => {
    conn.on('data', (data: PayloadInterface) => {
        logService.log('Got ', data)
        const callback = SLAVE_ACTION_MAP[data.type]
        if (typeof callback !== 'function') {
            logService.error('Got unrecognized data from host')
        } else {
            callback(data.payload, conn)
        }
    })
    conn.on('open', () => {
        logService.log('Connected to host ', conn.peer)
    })
}
