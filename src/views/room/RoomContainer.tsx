import { FunctionalComponent, h } from 'preact'
import RoomComponent from '../../components/room/RoomComponent'
import useRoomState from '../../hooks/useRoomState'
import RoomSidebarComponent from '../../components/room/roomSidebar/RoomSidebarComponent'
import { onVoteHost } from '../../services/p2p/p2pHostService'
import { onVoteClient } from '../../services/p2p/p2pClientService'
import roomState from '../../services/roomState/roomStateService'
import { kickUser } from '../../services/p2p/payloadService'

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

    const onCopyClick = (): void => {
        // If it fails in development, be sure to use localhost or a local server with HTTPS
        navigator.clipboard.writeText(roomUrl)
    }

    const onKickClick = isHost ? kickUser : undefined

    const onStartClick = (): void =>
        previouslyVoted ? roomState.restart() : roomState.setVotingStarted(true)

    const onSubmitVote = (vote: number): void =>
        isHost ? onVoteHost(vote) : onVoteClient(vote)

    const RoomSidebar: FunctionalComponent = () => (
        <RoomSidebarComponent
            users={users}
            votingStarted={votingStarted}
            onKick={onKickClick}
        />
    )

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
