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
    const roomUrl = `${window.location.origin}/?${peerId}`
    const { users, votingStarted } = useRoomState()
    const RoomSidebar: FunctionalComponent = () => (
        <RoomSidebarComponent users={users} />
    )
    const onCopyClick = (): void => {
        navigator.clipboard.writeText(roomUrl)
    }
    return (
        <RoomComponent
            Sidebar={RoomSidebar}
            votingStarted={votingStarted}
            users={users}
            isHost={isHost}
            roomUrl={roomUrl}
            onCopyClick={onCopyClick}
        />
    )
}

export default RoomContainer
