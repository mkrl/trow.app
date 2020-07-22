import { FunctionalComponent, h } from 'preact'
import RoomComponent from '../../components/room/RoomComponent'
import useRoomState from '../../hooks/useRoomState'
import RoomSidebarComponent from '../../components/room/roomSidebar/RoomSidebarComponent'

interface RoomInterface {
    isHost: boolean
    peerId: string
}

export type RoomContainerType = RoomInterface

const RoomContainer: FunctionalComponent<RoomContainerType> = ({
    isHost,
    peerId,
}: RoomContainerType) => {
    const roomUIState = useRoomState()
    const RoomSidebar: FunctionalComponent = () => (
        <RoomSidebarComponent users={roomUIState.users} />
    )
    return (
        <RoomComponent
            Sidebar={RoomSidebar}
            roomUIState={roomUIState}
            isHost={isHost}
            peerId={peerId}
        />
    )
}

export default RoomContainer
