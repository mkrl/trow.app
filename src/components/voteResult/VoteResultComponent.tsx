import { FunctionalComponent, h } from 'preact'
import style from './style.module.css'
import { P2PStateUserInterface } from '../../services/roomState/roomStateService'
import BoxElement from '../elements/box/BoxElement'

interface VoteResultComponentInterface {
    users: Array<P2PStateUserInterface>
}

const VoteResultComponent: FunctionalComponent<VoteResultComponentInterface> = ({
    users,
}: VoteResultComponentInterface) => {
    const scores = users.map(user => user.voteRating)
    let average = 0
    let multipliedAverage = 0
    const positiveVotes = scores.filter(score => score >= 0)
    const someoneVoted = positiveVotes.length > 0
    if (someoneVoted) {
        average = positiveVotes.reduce((a, b) => a + b) / positiveVotes.length
        multipliedAverage =
            positiveVotes.reduce((a, b) => a * b) / positiveVotes.length
    }

    return (
        <BoxElement
            justifyContent="between"
            alignItems="center"
            flexDirection="column"
        >
            {someoneVoted ? (
                <BoxElement justifyContent="between" isFullWidth>
                    <span>
                        Lowest score: <b>{Math.min(...positiveVotes)}</b>
                    </span>
                    <span>
                        Muitiplied average:{' '}
                        <b>{multipliedAverage.toFixed(2)}</b>
                    </span>
                </BoxElement>
            ) : (
                <p>No one voted</p>
            )}
            <h1 class={style.result}>{average.toFixed(2)}</h1>
        </BoxElement>
    )
}

export default VoteResultComponent
