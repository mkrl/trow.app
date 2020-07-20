import { FunctionalComponent, h } from 'preact'
import ModalComponent from '../../components/modal/ModalComponent'
import InputElement from '../../components/elements/input/InputElement'
import ButtonElement from '../../components/elements/button/ButtonElement'

interface NamePromptModalContainerInterface {
    isOpen: boolean
    onNameSubmit: () => void
    setUsername: (text: string) => void
    username: string
}

const NamePromptModalContainer: FunctionalComponent<NamePromptModalContainerInterface> = ({
    isOpen,
    onNameSubmit,
    setUsername,
    username,
}: NamePromptModalContainerInterface) => {
    return (
        <ModalComponent isOpen={isOpen} title="Introduce yourself">
            <InputElement value={username} onChange={setUsername} type="text" />
            <ButtonElement onClick={onNameSubmit}>Submit</ButtonElement>
        </ModalComponent>
    )
}

export default NamePromptModalContainer
