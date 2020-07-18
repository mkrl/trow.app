import {
    PAYLOAD_HANDSHAKE_REQUEST,
    PAYLOAD_HANDSHAKE_RESPONSE,
} from '../../constants/p2pPayloadConstants'
import logService from '../logService'
import Peer from 'peerjs'

type PayloadFields = 'name' | 'peerId'

export type PayloadContent = Record<PayloadFields, string>

export interface PayloadInterface {
    type: typeof PAYLOAD_HANDSHAKE_REQUEST & typeof PAYLOAD_HANDSHAKE_RESPONSE
    payload: PayloadContent
}

interface SendHandshakeInterface {
    conn: Peer.DataConnection
    name: string
    peerId: string
    isHost?: boolean
}

export const sendHandshake = ({
    conn,
    name,
    peerId,
    isHost = false,
}: SendHandshakeInterface): void => {
    logService.log(`Sent ${isHost ? 'master' : 'slave'} handshake request`)
    conn.send({
        type: isHost ? PAYLOAD_HANDSHAKE_REQUEST : PAYLOAD_HANDSHAKE_RESPONSE,
        payload: {
            name,
            peerId,
        },
    })
}
