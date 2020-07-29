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
import masterPeerIdentity from './identity/masterPeerIdentity'
import Peer from 'peerjs'
import roomState from '../roomState/roomStateService'
import { onError } from './p2pService'

interface ActionMapInterface {
    [key: string]: (payload: PayloadContent, conn: Peer.DataConnection) => void
}

const MASTER_ACTION_MAP: ActionMapInterface = {
    [PAYLOAD_HANDSHAKE_RESPONSE]: (payload, conn): void => {
        if (masterPeerIdentity.addConnection(payload)) {
            broadcastData({
                data: roomState.getState(),
            })
        } else {
            nameReject(payload, conn)
        }
    },
    [PAYLOAD_VOTE]: (payload, conn): void => {
        const votedUsername = masterPeerIdentity.findNameByPeer(conn.peer)
        if (votedUsername) {
            roomState.voteUser({
                name: votedUsername,
                voteRating: payload,
            })
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
        const leftUser = masterPeerIdentity.findNameByPeer(conn.peer)
        if (leftUser) {
            logService.log('Disconnected slave ', leftUser)
            roomState.removeUser(leftUser)
        }
    })
    conn.on('error', onError)
}

export const onVoteMaster = (vote: number): void =>
    roomState.voteUser({
        name: masterPeerIdentity.getName(),
        voteRating: vote,
    })
