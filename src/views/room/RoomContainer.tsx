import { FunctionalComponent, h } from 'preact'
import RoomComponent from '../../components/room/RoomComponent'
import useRoomState from '../../hooks/useRoomState'

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
    return (
        <RoomComponent
            roomUIState={roomUIState}
            isHost={isHost}
            peerId={peerId}
        />
    )
}

export default RoomContainer
