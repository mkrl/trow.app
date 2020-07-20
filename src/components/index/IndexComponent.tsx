import { h, FunctionalComponent } from 'preact'
import ButtonElement from '../elements/button/ButtonElement'
import BoxElement from '../elements/box/BoxElement'
import NamePromptModalContainer from '../../containers/namePromptModal/NamePromptModalContainer'

export interface IndexComponentInterface {
    onHostClick: () => void
    onNameSubmit: () => void
    isNamePromptOpen: boolean
    username: string
    setUsername: (text: string) => void
}

const IndexComponent: FunctionalComponent<IndexComponentInterface> = ({
    onHostClick,
    onNameSubmit,
    isNamePromptOpen,
    username,
    setUsername,
}: IndexComponentInterface) => (
    <BoxElement
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
    >
        <ButtonElement onClick={onHostClick}>Create a room</ButtonElement>
        <p>...or join a room via an invite link</p>
        <NamePromptModalContainer
            setUsername={setUsername}
            username={username}
            isOpen={isNamePromptOpen}
            onNameSubmit={onNameSubmit}
        />
    </BoxElement>
)

export default IndexComponent
