import { FunctionalComponent, h } from 'preact'
import * as style from './style.css'
import { P2PStateUserInterface } from '../../services/roomState/roomStateService'
import BoxElement from '../elements/box/BoxElement'

interface VoteResultComponentInterface {
    users: Array<P2PStateUserInterface>
}

const VoteResultComponent: FunctionalComponent<VoteResultComponentInterface> = ({
    users,
}: VoteResultComponentInterface) => {
    const scores = users.map(user => user.voteRating)
    const positiveVotes = scores.filter(score => score >= 0)
    const average = positiveVotes.reduce((a, b) => a + b) / positiveVotes.length
    const multipliedAverage =
        positiveVotes.reduce((a, b) => a * b) / positiveVotes.length
    return (
        <BoxElement
            justifyContent="between"
            alignItems="center"
            flexDirection="column"
        >
            <BoxElement justifyContent="between" isFullWidth>
                <span>
                    Lowest score: <b>{Math.min(...positiveVotes)}</b>
                </span>
                <span>
                    Muitiplied average: <b>{multipliedAverage.toFixed(2)}</b>
                </span>
            </BoxElement>
            <h1 class={style.result}>{average.toFixed(2)}</h1>
        </BoxElement>
    )
}

export default VoteResultComponent
