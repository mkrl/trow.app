import { FunctionalComponent, h } from 'preact'
import { useState } from 'preact/hooks'
import NamePromptModalComponent from '../../components/namePromptModal/NamePromptModalComponent'

export interface NamePromptContainerInterface {
    setUsername: (text: string) => void
}

const NamePromptContainer: FunctionalComponent<NamePromptContainerInterface> = ({
    setUsername,
}: NamePromptContainerInterface) => {
    const [modalUsername, setModalUsername] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [isDisabled, setDisabled] = useState<boolean>(false)
    const onSubmit = (): void => {
        if (modalUsername.length > 0) {
            setDisabled(true)
            setUsername(modalUsername)
        } else {
            setError(`Name can't be blank!`)
        }
    }
    return (
        <NamePromptModalComponent
            username={modalUsername}
            setUsername={setModalUsername}
            onNameSubmit={onSubmit}
            isOpen
            isBtnDisabled={isDisabled}
            error={error}
        />
    )
}

export default NamePromptContainer
