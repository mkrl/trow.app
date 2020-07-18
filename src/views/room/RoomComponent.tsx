import { h, FunctionalComponent, Fragment } from 'preact'

export interface RoomComponentInterface {
    isHost: boolean
    peerId: string
}

const RoomComponent: FunctionalComponent<RoomComponentInterface> = ({
    isHost,
    peerId,
}: RoomComponentInterface) => (
    <Fragment>
        {isHost && (
            <p>You are the host. Feel free to share the link to your room.</p>
        )}
        {isHost && (
            <input
                type="text"
                readOnly
                value={`${window.location.origin}/?${peerId}`}
            />
        )}
        {isHost && (
            <a
                href={`${window.location.origin}/?${peerId}`}
                target="_blank"
                rel="noreferrer"
            >
                Or click here
            </a>
        )}
        {!isHost && <p>Sit back and relax. You are all set.</p>}
    </Fragment>
)

export default RoomComponent
