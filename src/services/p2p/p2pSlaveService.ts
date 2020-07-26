import logService from '../logService'
import {
    PAYLOAD_HANDSHAKE_REQUEST,
    PAYLOAD_NAME_REJECT,
    PAYLOAD_STATE_BROADCAST,
} from '../../constants/p2pPayloadConstants'
import {
    PayloadContent,
    PayloadInterface,
    sendHandshake,
    voteSlave,
} from './payloadService'
import slavePeerIdentity from './identity/slavePeerIdentity'
import Peer from 'peerjs'
import roomState from '../roomState/roomStateService'
import { onError } from './p2pService'
import errorService from '../errorService'

interface ActionMapInterface {
    [key: string]: (payload: PayloadContent, conn: Peer.DataConnection) => void
}

const SLAVE_ACTION_MAP: ActionMapInterface = {
    [PAYLOAD_HANDSHAKE_REQUEST]: (payload, conn): void => {
        sendHandshake({
            conn,
            name: slavePeerIdentity.getName(),
            peerId: slavePeerIdentity.getPeerId(),
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
        slavePeerIdentity.setMasterRef(conn)
    })
    conn.on('error', onError)
}

export const onVoteSlave = (vote: number): void => voteSlave(vote)
