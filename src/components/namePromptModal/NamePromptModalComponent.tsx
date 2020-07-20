import { FunctionalComponent, h } from 'preact'
import ModalComponent from '../modal/ModalComponent'
import InputElement from '../elements/input/InputElement'
import ButtonElement from '../elements/button/ButtonElement'

interface NamePromptModalContainerInterface {
    isOpen: boolean
    onNameSubmit: () => void
    setUsername: (text: string) => void
    username: string
}

const NamePromptModalComponent: FunctionalComponent<NamePromptModalContainerInterface> = ({
    isOpen,
    onNameSubmit,
    setUsername,
    username,
}: NamePromptModalContainerInterface) => (
    <ModalComponent isOpen={isOpen} title="Introduce yourself">
        <InputElement value={username} onChange={setUsername} type="text" />
        <ButtonElement onClick={onNameSubmit}>Submit</ButtonElement>
    </ModalComponent>
)

export default NamePromptModalComponent
