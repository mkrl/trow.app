import { FunctionalComponent, h } from 'preact'
import ModalComponent from '../modal/ModalComponent'
import InputElement from '../elements/input/InputElement'
import ButtonElement from '../elements/button/ButtonElement'
import ControlGroupElement from '../elements/controlGroup/ControlGroupElement'

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
        <ControlGroupElement>
            <InputElement
                value={username}
                autoFocus
                onChange={setUsername}
                type="text"
            />
            <ButtonElement onClick={onNameSubmit}>Submit</ButtonElement>
        </ControlGroupElement>
    </ModalComponent>
)

export default NamePromptModalComponent
