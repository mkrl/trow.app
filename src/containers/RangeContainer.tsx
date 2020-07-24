import { FunctionalComponent, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import voteOnKeyboard from '../helpers/keyboardVoteHelper'
import VoteRangeComponent from '../components/voteRange/VoteRangeComponent'

interface RangeContainerInterface {
    onSubmitVote: (vote: number) => void
}

const RangeContainer: FunctionalComponent<RangeContainerInterface> = ({
    onSubmitVote,
}: RangeContainerInterface) => {
    const [value, setValue] = useState<number>(5)
    useEffect(() => {
        const listener = (e: KeyboardEvent): void => {
            voteOnKeyboard({ onChange: setValue, e })
        }
        document.addEventListener('keyup', listener)
        return (): void => document.removeEventListener('keyup', listener)
    }, [])
    return (
        <VoteRangeComponent
            value={value}
            range={11}
            onChange={setValue}
            onSubmit={onSubmitVote}
        />
    )
}

export default RangeContainer
