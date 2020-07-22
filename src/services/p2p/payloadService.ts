import {
    PAYLOAD_HANDSHAKE_REQUEST,
    PAYLOAD_HANDSHAKE_RESPONSE,
    PAYLOAD_STATE_BROADCAST,
} from '../../constants/p2pPayloadConstants'
import logService from '../logService'
import Peer from 'peerjs'
import { ConnectionInterface } from './p2pMasterService'
import { P2PStateInterface } from '../roomState/roomStateService'

type PayloadFields = 'name' | 'peerId'

export type PayloadContent = Record<PayloadFields, string> & P2PStateInterface

export interface PayloadInterface {
    type: string
    payload: PayloadContent
}

interface SendHandshakeInterface {
    conn: Peer.DataConnection
    name: string
    peerId: string
    isHost?: boolean
}
interface BroadcastInterface {
    peer: Peer
    connections: Array<ConnectionInterface>
    data: P2PStateInterface
}

export const sendHandshake = ({
    conn,
    name,
    peerId,
    isHost = false,
}: SendHandshakeInterface): void => {
    logService.log(`Sent handshake ${isHost ? 'request' : 'response'} `)
    conn.send({
        type: isHost ? PAYLOAD_HANDSHAKE_REQUEST : PAYLOAD_HANDSHAKE_RESPONSE,
        payload: {
            name,
            peerId,
        },
    })
}

export const broadcastData = ({
    peer,
    connections,
    data,
}: BroadcastInterface): void => {
    connections.map(item => {
        peer.connections[item.peerId][0].send({
            type: PAYLOAD_STATE_BROADCAST,
            payload: data,
        })
    })
}
