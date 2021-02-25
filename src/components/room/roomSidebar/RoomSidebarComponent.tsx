import { Fragment, FunctionalComponent, h } from 'preact'
import BoxElement from '../../elements/box/BoxElement'
import { P2PStateUserInterface } from '../../../services/roomState/roomStateService'
import UserCard from '../../userCard/UserCardElement'

interface RoomSidebarComponentInterface {
    users: Array<P2PStateUserInterface>
    votingStarted: boolean
    onKick?: (name: string) => void
}

const UsersMapComponent: FunctionalComponent<RoomSidebarComponentInterface> = ({
    users,
    votingStarted,
    onKick,
}: RoomSidebarComponentInterface) => (
    <Fragment>
        {users.map(user => (
            <UserCard
                key={user.name}
                isHost={user.isHost}
                userName={user.name}
                isVoted={user.voteRating !== -1}
                score={user.voteRating}
                votingStarted={votingStarted}
                onKick={onKick}
            />
        ))}
    </Fragment>
)

const RoomSidebarComponent: FunctionalComponent<RoomSidebarComponentInterface> = ({
    users,
    votingStarted,
    onKick,
}: RoomSidebarComponentInterface) => (
    <BoxElement flexDirection="column" justifyContent="start">
        <UsersMapComponent
            onKick={onKick}
            users={users}
            votingStarted={votingStarted}
        />
    </BoxElement>
)

export default RoomSidebarComponent
