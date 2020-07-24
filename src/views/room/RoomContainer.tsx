import { FunctionalComponent, h } from 'preact'
import RoomComponent from '../../components/room/RoomComponent'
import useRoomState from '../../hooks/useRoomState'
import RoomSidebarComponent from '../../components/room/roomSidebar/RoomSidebarComponent'
import { onVoteMaster } from '../../services/p2p/p2pMasterService'
import { onVoteSlave } from '../../services/p2p/p2pSlaveService'
import roomState from '../../services/roomState/roomStateService'

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
    const { users, votingStarted, previouslyVoted } = useRoomState(isHost)

    const RoomSidebar: FunctionalComponent = () => (
        <RoomSidebarComponent users={users} votingStarted={votingStarted} />
    )

    const onCopyClick = (): void => {
        navigator.clipboard.writeText(roomUrl)
    }
    const onStartClick = (): void =>
        previouslyVoted ? roomState.restart() : roomState.setVotingStarted(true)
    const onSubmitVote = (vote: number): void =>
        isHost ? onVoteMaster(vote) : onVoteSlave(vote)

    return (
        <RoomComponent
            Sidebar={RoomSidebar}
            votingStarted={votingStarted}
            users={users}
            isHost={isHost}
            roomUrl={roomUrl}
            onCopyClick={onCopyClick}
            onSubmitVote={onSubmitVote}
            onStartClick={onStartClick}
            previouslyVoted={previouslyVoted}
        />
    )
}

export default RoomContainer
