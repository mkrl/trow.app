import logService from '../logService'
import {
    PAYLOAD_HANDSHAKE_REQUEST,
    PAYLOAD_KICK_NOTICE,
    PAYLOAD_NAME_REJECT,
    PAYLOAD_STATE_BROADCAST,
} from '../../constants/p2pPayloadConstants'
import {
    sendHandshake,
    voteClient,
    PayloadContent,
    PayloadInterface,
} from './payloadService'
import clientPeerIdentity from './identity/clientPeerIdentity'
import type { DataConnection } from 'peerjs'
import roomState from '../roomState/roomStateService'
import { onError } from './p2pService'
import errorService from '../errorService'
import onPageLeave from '../../helpers/pageLeaveHelper'

interface ActionMapInterface {
    [key: string]: (payload: PayloadContent, conn: DataConnection) => void
}

const CLIENT_ACTION_MAP: ActionMapInterface = {
    [PAYLOAD_HANDSHAKE_REQUEST]: (payload, conn): void => {
        sendHandshake({
            conn,
            name: clientPeerIdentity.getName(),
            peerId: clientPeerIdentity.getPeerId(),
        })
    },
    [PAYLOAD_STATE_BROADCAST]: (payload): void => {
        roomState.setState(payload)
    },
    [PAYLOAD_NAME_REJECT]: (payload, conn): void => {
        errorService.setError(
            `Name ${payload} is already in use, please reconnect with another name`
        )
        setTimeout(() => {
            conn.close()
            window.location.reload()
        }, 5000)
    },
    [PAYLOAD_KICK_NOTICE]: (payload, conn): void => {
        errorService.setError('You have been kicked from the room', true)
        setTimeout(() => {
            conn.close()
        }, 5000)
    },
}

export const onConnectClient = (conn: DataConnection): void => {
    conn.on('data', (data: PayloadInterface) => {
        logService.log('Got ', data)
        const callback = CLIENT_ACTION_MAP[data.type]
        if (typeof callback !== 'function') {
            logService.error('Got unrecognized data from host')
        } else {
            callback(data.payload, conn)
        }
    })
    conn.on('open', () => {
        logService.log('Connected to host ', conn.peer)
        clientPeerIdentity.setHostRef(conn)
    })
    conn.on('error', onError)
    window.addEventListener('beforeunload', e => {
        conn.close()
        onPageLeave(e)
    })
}

export const onVoteClient = (vote: number): void => voteClient(vote)
