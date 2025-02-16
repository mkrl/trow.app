import { FunctionalComponent, h } from 'preact'
import style from './style.module.css'
import cn from 'classnames'
import getAvatar from '../../helpers/avatarHelper'

interface UserCardInterface {
    userName: string
    isVoted?: boolean
    score: number
    votingStarted: boolean
    isHost?: boolean
    onKick?: (name: string) => void
}

const getScore = (score: number): string | null => {
    if (score === -2) return '❌'
    if (score === -1) return null
    return String(score)
}

const UserCard: FunctionalComponent<UserCardInterface> = ({
    userName,
    isVoted = false,
    isHost = false,
    score,
    votingStarted,
    onKick,
}: UserCardInterface) => (
    <div
        class={cn(style.avatar, isVoted && style.voted)}
        style={`background-image: url(${getAvatar(userName)})`}
    >
        <div class={style.tooltip}>{`${isHost ? '👑 ' : ''}${userName}`}</div>
        {onKick && !isHost && (
            <button onClick={(): void => onKick(userName)} class={style.kick}>
                Kick
            </button>
        )}
        {!votingStarted && <div class={style.score}>{getScore(score)}</div>}
    </div>
)

export default UserCard
