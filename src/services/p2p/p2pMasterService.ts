import {
    broadcastData,
    PayloadContent,
    PayloadInterface,
    sendHandshake,
} from './payloadService'
import logService from '../logService'
import {
    PAYLOAD_HANDSHAKE_RESPONSE,
    PAYLOAD_VOTE,
} from '../../constants/p2pPayloadConstants'
import masterPeerIdentity from './identity/masterPeerIdentity'
import Peer from 'peerjs'
import roomState from '../roomState/roomStateService'

interface ActionMapInterface {
    [key: string]: (payload: PayloadContent, conn: Peer.DataConnection) => void
}

const MASTER_ACTION_MAP: ActionMapInterface = {
    [PAYLOAD_HANDSHAKE_RESPONSE]: (payload: PayloadContent): void => {
        if (masterPeerIdentity.addConnection(payload)) {
            broadcastData({
                data: roomState.getState(),
            })
        } else {
            logService.error('Name is already in use or no name supplied')
        }
    },
    [PAYLOAD_VOTE]: (
        payload: PayloadContent,
        conn: Peer.DataConnection
    ): void => {
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
        const leftUser = roomState.getNameByPeerId(conn.peer)
        if (leftUser) {
            logService.log('Disconnected slave ', leftUser)
            roomState.removeUser(leftUser)
        }
    })
}

export const onVoteMaster = (vote: number): void =>
    roomState.voteUser({
        name: masterPeerIdentity.getName(),
        voteRating: vote,
    })
