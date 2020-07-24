import { FunctionalComponent, h } from 'preact'
import * as style from './style.css'
import cn from 'classnames'
import getAvatar from '../../helpers/avatarHelper'

interface UserCardInterface {
    userName: string
    isOnline?: boolean
    isHost?: boolean
}

const UserCard: FunctionalComponent<UserCardInterface> = ({
    userName,
    isOnline = true,
    isHost = false,
}: UserCardInterface) => (
    <div
        class={cn(style.avatar, isOnline && style.online)}
        style={`background-image: url(${getAvatar(userName)})`}
    >
        <div class={style.tooltip}>{`${isHost ? '👑 ' : ''}${userName}`}</div>
    </div>
)

export default UserCard
