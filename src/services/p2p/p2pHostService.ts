import {
    broadcastData,
    nameReject,
    sendHandshake,
    PayloadContent,
    PayloadInterface,
} from './payloadService'
import logService from '../logService'
import {
    PAYLOAD_HANDSHAKE_RESPONSE,
    PAYLOAD_VOTE,
} from '../../constants/p2pPayloadConstants'
import hostPeerIdentity from './identity/hostPeerIdentity'
import type { DataConnection } from 'peerjs'
import roomState from '../roomState/roomStateService'
import { onError } from './p2pService'

interface ActionMapInterface {
    [key: string]: (payload: PayloadContent, conn: DataConnection) => void
}

const HOST_ACTION_MAP: ActionMapInterface = {
    [PAYLOAD_HANDSHAKE_RESPONSE]: (payload, conn): void => {
        if (hostPeerIdentity.addConnection(payload)) {
            broadcastData({
                data: roomState.getState(),
            })
        } else {
            nameReject(payload, conn)
        }
    },
    [PAYLOAD_VOTE]: (payload, conn): void => {
        const votedUsername = hostPeerIdentity.findNameByPeer(conn.peer)
        if (votedUsername) {
            roomState.voteUser({
                name: votedUsername,
                voteRating: payload,
            })
        }
    },
}

export const onConnectHost = (conn: DataConnection): void => {
    conn.on('data', (data: PayloadInterface) => {
        logService.log(`Id ${conn.peer} sent `, data)
        const callback = HOST_ACTION_MAP[data.type]
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
        logService.log('New client connection with id ', conn.peer)
        sendHandshake({
            conn,
            name: hostPeerIdentity.getName(),
            peerId: hostPeerIdentity.getPeerId(),
            isHost: true,
        })
    })
    conn.on('close', () => {
        const leftUser = hostPeerIdentity.findNameByPeer(conn.peer)
        if (leftUser) {
            logService.log('Disconnected client ', leftUser)
            roomState.removeUser(leftUser)
        }
    })
    conn.on('error', onError)
}

export const onVoteHost = (vote: number): void =>
    roomState.voteUser({
        name: hostPeerIdentity.getName(),
        voteRating: vote,
    })
