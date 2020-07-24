import { h, FunctionalComponent } from 'preact'
import InputElement from '../elements/input/InputElement'
import { P2PStateInterface } from '../../services/roomState/roomStateService'
import RoomLayout from '../layout/room/RoomLayoutComponent'
import { useEffect, useState } from 'preact/hooks'
import VoteRangeComponent from '../voteRange/VoteRangeComponent'
import ControlGroupElement from '../elements/controlGroup/ControlGroupElement'
import ButtonElement from '../elements/button/ButtonElement'

interface RoomComponentInterface {
    isHost: boolean
    roomUrl: string
    onCopyClick: () => void
    Sidebar: FunctionalComponent
}

type RoomType = RoomComponentInterface & P2PStateInterface

const RangeContainer: FunctionalComponent = () => {
    const [value, setValue] = useState<number>(5)
    const onSubmit = (thing: number): void => alert(thing)
    useEffect(() => {
        const listener = (e: KeyboardEvent): void => {
            if (
                [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '0',
                    '-',
                ].includes(e.key)
            ) {
                const keyValue = e.key === '-' ? 10 : Number(e.key)
                setValue(keyValue)
            }
        }
        document.addEventListener('keyup', listener)
        return (): void => document.removeEventListener('keyup', listener)
    }, [])
    return (
        <VoteRangeComponent
            value={value}
            range={11}
            onChange={setValue}
            onSubmit={onSubmit}
        />
    )
}

const RoomComponent: FunctionalComponent<RoomType> = ({
    isHost,
    roomUrl,
    votingStarted,
    users,
    onCopyClick,
    Sidebar,
}: RoomType) => (
    <RoomLayout SidebarComponent={Sidebar}>
        {isHost && (
            <p>You are the host. Feel free to share the link to your room.</p>
        )}
        {isHost && !votingStarted && (
            <ControlGroupElement>
                <InputElement type="text" readOnly isBlock value={roomUrl} />
                <ButtonElement onClick={onCopyClick}>Copy</ButtonElement>
            </ControlGroupElement>
        )}
        {!isHost && <p>Sit back and relax. You are all set.</p>}
        <RangeContainer />
    </RoomLayout>
)

export default RoomComponent
