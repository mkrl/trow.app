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
    const onSubmit = (): void => {
        setUsername(modalUsername)
    }
    return (
        <NamePromptModalComponent
            username={modalUsername}
            setUsername={setModalUsername}
            onNameSubmit={onSubmit}
            isOpen
        />
    )
}

export default NamePromptContainer
