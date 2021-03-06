import { h, FunctionalComponent, Fragment } from 'preact'
import InputElement from '../elements/input/InputElement'
import { P2PStateInterface } from '../../services/roomState/roomStateService'
import RoomLayout from '../layout/room/RoomLayoutComponent'
import ControlGroupElement from '../elements/controlGroup/ControlGroupElement'
import ButtonElement from '../elements/button/ButtonElement'
import RangeContainer from '../../containers/RangeContainer'
import BoxElement from '../elements/box/BoxElement'
import VoteResultComponent from '../voteResult/VoteResultComponent'
import SeparatorElement from '../elements/separator/SeparatorElement'

interface RoomComponentInterface {
    isHost: boolean
    roomUrl: string
    onCopyClick: () => void
    onSubmitVote: (score: number) => void
    onStartClick: () => void
    Sidebar: FunctionalComponent
}

type RoomType = RoomComponentInterface & P2PStateInterface

const RoomComponent: FunctionalComponent<RoomType> = ({
    isHost,
    roomUrl,
    votingStarted,
    users,
    onCopyClick,
    onStartClick,
    onSubmitVote,
    Sidebar,
    previouslyVoted,
}: RoomType) => (
    <RoomLayout SidebarComponent={Sidebar}>
        {isHost && !votingStarted && !previouslyVoted && (
            <p>
                You are the host. Invite other participants to join the session
                via this invite link.
            </p>
        )}
        {isHost && !votingStarted && (
            <Fragment>
                <ControlGroupElement>
                    <InputElement
                        type="text"
                        readOnly
                        isBlock
                        value={roomUrl}
                    />
                    <ButtonElement onClick={onCopyClick}>Copy</ButtonElement>
                </ControlGroupElement>
                <SeparatorElement />
            </Fragment>
        )}
        {!isHost && !votingStarted && !previouslyVoted && (
            <p>
                Sit back and relax! You are all set. Waiting for the host to
                start the session.
            </p>
        )}
        {votingStarted && <RangeContainer onSubmitVote={onSubmitVote} />}
        {previouslyVoted && !votingStarted && (
            <VoteResultComponent users={users} />
        )}
        {isHost && !votingStarted && (
            <BoxElement
                isFullHeight={!previouslyVoted}
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
                <ButtonElement size="l" onClick={onStartClick}>
                    {previouslyVoted ? 'Start again' : 'Start'}
                </ButtonElement>
            </BoxElement>
        )}
    </RoomLayout>
)

export default RoomComponent
