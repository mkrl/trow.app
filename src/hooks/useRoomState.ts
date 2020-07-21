import { useState, useEffect } from 'preact/hooks'
import roomState, {
    P2PStateInterface,
} from '../services/roomState/roomStateService'

const useRoomState = (/* isHost: boolean */): P2PStateInterface => {
    const [roomUIState, setRoomUIState] = useState<string>(
        // We use store UI replica of roomState in string as useEffect can't deeply compare nested objects
        JSON.stringify(roomState.getState())
    )
    useEffect(() => {
        roomState.setUIUpdater(setRoomUIState)
    }, [roomUIState, setRoomUIState])

    return JSON.parse(roomUIState)
}

export default useRoomState
