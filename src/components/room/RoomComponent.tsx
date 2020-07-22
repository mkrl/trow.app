import { h, FunctionalComponent } from 'preact'
import InputElement from '../elements/input/InputElement'
import { P2PStateInterface } from '../../services/roomState/roomStateService'
import RoomLayout from '../layout/room/RoomLayoutComponent'

export interface RoomComponentInterface {
    isHost: boolean
    peerId: string
    roomUIState: P2PStateInterface
    Sidebar: FunctionalComponent
}

const RoomComponent: FunctionalComponent<RoomComponentInterface> = ({
    isHost,
    peerId,
    roomUIState,
    Sidebar,
}: RoomComponentInterface) => (
    <RoomLayout SidebarComponent={Sidebar}>
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
    </RoomLayout>
)

export default RoomComponent
