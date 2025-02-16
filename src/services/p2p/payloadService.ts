import {
    PAYLOAD_HANDSHAKE_REQUEST,
    PAYLOAD_HANDSHAKE_RESPONSE,
    PAYLOAD_KICK_NOTICE,
    PAYLOAD_NAME_REJECT,
    PAYLOAD_STATE_BROADCAST,
    PAYLOAD_VOTE,
} from '../../constants/p2pPayloadConstants'
import logService from '../logService'
import type { DataConnection } from 'peerjs'
import roomState, { P2PStateInterface } from '../roomState/roomStateService'
import hostPeerIdentity from './identity/hostPeerIdentity'
import clientPeerIdentity from './identity/clientPeerIdentity'

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
    conn: DataConnection
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
    // This can later be changed if a need for client peer broadcasting is introduced
    const peer = hostPeerIdentity.getPeerRef()
    const connections = hostPeerIdentity.getConnections()
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

export const voteClient = (newVote: number): void => {
    logService.log(`Sent vote payload to host: ${newVote}`)
    const conn = clientPeerIdentity.getHostRef()
    conn.send({
        type: PAYLOAD_VOTE,
        payload: newVote,
    })
}

export const nameReject = (
    data: PayloadContent,
    conn: DataConnection
): void => {
    logService.error('Name is already is use: ', data)
    conn.send({
        type: PAYLOAD_NAME_REJECT,
        payload: data.name,
    })
    setTimeout(() => conn.close(), 2000)
}

export const kickUser = (username: string): void => {
    const peer = hostPeerIdentity.getPeerRef()
    const peerIdToKick = hostPeerIdentity.findPeerByName(username)
    if (peerIdToKick) {
        const connection = peer.connections[peerIdToKick][0]
        if (connection) {
            roomState.removeUser(username)
            connection.send({
                type: PAYLOAD_KICK_NOTICE,
            })
            setTimeout(() => connection.close(), 2000)
        }
    }
}
