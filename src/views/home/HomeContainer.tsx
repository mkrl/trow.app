import { FunctionalComponent, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { createRoom, joinRoom } from '../../services/p2p/p2pService'
import { APP_VIEW_INDEX, APP_VIEW_ROOM } from '../../constants/appViewConstants'
import ViewMapperContainer from '../../containers/ViewMapperContainer'

const HomeContainer: FunctionalComponent = () => {
    const roomId = window.location.search.slice(1)
    const [peerId, setPeerId] = useState<string>('')
    const [activeView, setActiveView] = useState<string>(APP_VIEW_INDEX)
    const [isHost, setIsHost] = useState(true)
    const onCreateRoom = (): void => {
        createRoom({
            name: String(prompt('Enter your name')),
            callback: (id: string) => {
                setPeerId(id)
                setActiveView(APP_VIEW_ROOM)
            },
        })
    }
    useEffect(() => {
        if (roomId.length > 0) {
            joinRoom({
                roomId,
                callback: (id: string) => {
                    setIsHost(false)
                    setPeerId(id)
                    setActiveView(APP_VIEW_ROOM)
                },
            })
        }
    }, [roomId])
    return (
        <ViewMapperContainer
            activeView={activeView}
            onHostClick={onCreateRoom}
            isHost={isHost}
            peerId={peerId}
        />
    )
}

export default HomeContainer
