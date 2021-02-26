import { h, FunctionalComponent } from 'preact'
import ButtonElement from '../elements/button/ButtonElement'
import BoxElement from '../elements/box/BoxElement'
import SeparatorElement from '../elements/separator/SeparatorElement'

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
        <ButtonElement size="xl" onClick={onHostClick}>
            Create a room
        </ButtonElement>
        <SeparatorElement />
        <p>...or join a room via an invite link</p>
    </BoxElement>
)

export default IndexComponent
