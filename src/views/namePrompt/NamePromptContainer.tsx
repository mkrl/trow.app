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
    const [isDisabled, setDisabled] = useState<boolean>(false)
    const onSubmit = (): void => {
        setDisabled(true)
        setUsername(modalUsername)
    }
    return (
        <NamePromptModalComponent
            username={modalUsername}
            setUsername={setModalUsername}
            onNameSubmit={onSubmit}
            isOpen
            isBtnDisabled={isDisabled}
        />
    )
}

export default NamePromptContainer
