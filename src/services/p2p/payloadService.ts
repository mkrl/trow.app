import {
    PAYLOAD_HANDSHAKE_REQUEST,
    PAYLOAD_HANDSHAKE_RESPONSE,
    PAYLOAD_NAME_REJECT,
    PAYLOAD_STATE_BROADCAST,
    PAYLOAD_VOTE,
} from '../../constants/p2pPayloadConstants'
import logService from '../logService'
import Peer from 'peerjs'
import { P2PStateInterface } from '../roomState/roomStateService'
import masterPeerIdentity from './identity/masterPeerIdentity'
import slavePeerIdentity from './identity/slavePeerIdentity'

type PayloadFields = 'name' | 'peerId'

// @TODO: break down this type
export type PayloadContent = Record<PayloadFields, string> &
    P2PStateInterface &
    number

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

export const broadcastData = ({ data }: BroadcastInterface): void => {
    // This can later be changed if need for slave broadcasting is introduced
    const peer = masterPeerIdentity.getPeerRef()
    const connections = masterPeerIdentity.getConnections()
    connections.map(item => {
        const connection = peer.connections[item.peerId][0]
        if (connection) {
            connection.send({
                type: PAYLOAD_STATE_BROADCAST,
                payload: data,
            })
        }
    })
}

export const voteSlave = (newVote: number): void => {
    logService.log(`Sent vote payload to host: ${newVote}`)
    const conn = slavePeerIdentity.getMasterRef()
    conn.send({
        type: PAYLOAD_VOTE,
        payload: newVote,
    })
}

export const nameReject = (
    data: PayloadContent,
    conn: Peer.DataConnection
): void => {
    logService.error('Name is already is use: ', data)
    conn.send({
        type: PAYLOAD_NAME_REJECT,
        payload: data.name,
    })
    setTimeout(() => conn.close(), 2000)
}
