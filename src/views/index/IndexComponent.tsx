import { h, FunctionalComponent } from 'preact'

export interface IndexComponentInterface {
    onHostClick: () => void
}

const IndexComponent: FunctionalComponent<IndexComponentInterface> = ({
    onHostClick,
}: IndexComponentInterface) => (
    <div>
        <button onClick={onHostClick}>Create a room</button>
        <p>...or join a room via an invite link</p>
    </div>
)

export default IndexComponent
