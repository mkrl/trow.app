interface KeyboardVoteHelperInterface {
    onChange: (newNumber: number) => void
    e: KeyboardEvent
}

const voteOnKeyboard = ({ onChange, e }: KeyboardVoteHelperInterface): void => {
    if (
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'].includes(e.key)
    ) {
        const keyValue = e.key === '-' ? 10 : Number(e.key)
        onChange(keyValue)
    }
}

export default voteOnKeyboard
