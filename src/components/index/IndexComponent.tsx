import { h, FunctionalComponent } from 'preact'
import ButtonElement from '../elements/button/ButtonElement'
import BoxElement from '../elements/box/BoxElement'

export interface IndexComponentInterface {
    onHostClick: () => void
}

const IndexComponent: FunctionalComponent<IndexComponentInterface> = ({
    onHostClick,
}: IndexComponentInterface) => (
    <BoxElement
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        isFullHeight
    >
        <ButtonElement onClick={onHostClick}>Create a room</ButtonElement>
        <p>...or join a room via an invite link</p>
    </BoxElement>
)

export default IndexComponent
