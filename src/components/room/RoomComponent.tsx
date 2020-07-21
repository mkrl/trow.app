import { h, FunctionalComponent, Fragment } from 'preact'
import InputElement from '../elements/input/InputElement'
import { P2PStateInterface } from '../../services/roomState/roomStateService'

export interface RoomComponentInterface {
    isHost: boolean
    peerId: string
    roomUIState: P2PStateInterface
}

const RoomComponent: FunctionalComponent<RoomComponentInterface> = ({
    isHost,
    peerId,
    roomUIState,
}: RoomComponentInterface) => (
    <Fragment>
        <p>{roomUIState?.users[0]?.name}</p>
        <p>{roomUIState?.users[1]?.name}</p>
        {isHost && (
            <p>You are the host. Feel free to share the link to your room.</p>
        )}
        {isHost && (
            <InputElement
                type="text"
                readOnly
                value={`${window.location.origin}/?${peerId}`}
            />
        )}
        {isHost && (
            <a
                href={`${window.location.origin}/?${peerId}`}
                target="_blank"
                rel="noreferrer"
            >
                Or click here
            </a>
        )}
        {!isHost && <p>Sit back and relax. You are all set.</p>}
    </Fragment>
)

export default RoomComponent
