import { Fragment, FunctionalComponent, h } from 'preact'
import BoxElement from '../../elements/box/BoxElement'
import { P2PStateUserInterface } from '../../../services/roomState/roomStateService'
import UserCard from '../../userCard/UserCardElement'

interface RoomSidebarComponentInterface {
    users: Array<P2PStateUserInterface>
}

const UsersMapComponent: FunctionalComponent<RoomSidebarComponentInterface> = ({
    users,
}: RoomSidebarComponentInterface) => (
    <Fragment>
        {users.map(user => (
            <UserCard
                key={user.name}
                isHost={user.isHost}
                userName={user.name}
            />
        ))}
    </Fragment>
)

const RoomSidebarComponent: FunctionalComponent<RoomSidebarComponentInterface> = ({
    users,
}: RoomSidebarComponentInterface) => (
    <BoxElement flexDirection="column" justifyContent="start">
        <UsersMapComponent users={users} />
    </BoxElement>
)

export default RoomSidebarComponent
