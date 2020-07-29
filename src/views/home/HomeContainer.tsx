import { FunctionalComponent, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { createRoom, joinRoom } from '../../services/p2p/p2pService'
import {
    APP_VIEW_INDEX,
    APP_VIEW_ROOM,
    APP_VIEW_NAME_PROMPT,
} from '../../constants/appViewConstants'
import ViewMapperContainer from '../../containers/ViewMapperContainer'
import onPageLeave from '../../helpers/pageLeaveHelper'

const HomeContainer: FunctionalComponent = () => {
    const roomId = window.location.search.slice(1)
    const isHost = roomId.length === 0
    const [peerId, setPeerId] = useState<string>('')
    const [activeView, setActiveView] = useState<string>(APP_VIEW_INDEX)
    const [userName, setUserName] = useState<string>('')
    const onBeginClick = (): void => {
        setActiveView(APP_VIEW_NAME_PROMPT)
    }
    useEffect(() => {
        const onCreateRoom = (): void => {
            createRoom({
                name: userName,
                callback: (id: string) => {
                    setPeerId(id)
                    setActiveView(APP_VIEW_ROOM)
                },
            })
        }
        const onJoinRoom = (): void => {
            joinRoom({
                roomId,
                name: userName,
                callback: (id: string) => {
                    setPeerId(id)
                    setActiveView(APP_VIEW_ROOM)
                },
            })
        }
        if (userName.length > 0) {
            if (!isHost) {
                onJoinRoom()
            } else {
                onCreateRoom()
            }
            window.addEventListener('beforeunload', onPageLeave)
        } else {
            if (!isHost) {
                setActiveView(APP_VIEW_NAME_PROMPT)
            }
        }
        return (): void =>
            window.removeEventListener('beforeunload', onPageLeave)
    }, [isHost, userName, roomId])
    return (
        <ViewMapperContainer
            activeView={activeView}
            onHostClick={onBeginClick}
            isHost={isHost}
            setUsername={setUserName}
            peerId={peerId}
        />
    )
}

export default HomeContainer
