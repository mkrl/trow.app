import { FunctionalComponent, h } from 'preact'
import RoomComponent, {
    RoomComponentInterface,
} from '../../components/room/RoomComponent'

// interface RoomInterface {
//     hostName: string
// }

export type RoomContainerType = RoomComponentInterface

const RoomContainer: FunctionalComponent<RoomContainerType> = ({
    isHost,
    peerId,
}: RoomContainerType) => {
    return <RoomComponent isHost={isHost} peerId={peerId} />
}

export default RoomContainer
