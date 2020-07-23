import logService from '../logService'

export interface P2PStateUserInterface {
    name: string
    voteRating: number
    isHost?: boolean
}

export interface P2PStateInterface {
    users: Array<P2PStateUserInterface>
    votingStarted: boolean
}

type UIUpdater = (state: string) => void

interface RoomStateInterface {
    getState: () => P2PStateInterface
    getUserNames: () => Array<string>
    getNameByPeerId: (name: string) => string | undefined
    removeUser: (name: string | undefined) => void
    addUser: (name: string) => void
    voteUser: ({ name, voteRating }: P2PStateUserInterface) => void
    setUIUpdater: (updater: UIUpdater) => void
    setState: (state: P2PStateInterface) => void
}

const initialRoomState: P2PStateInterface = {
    users: [],
    votingStarted: false,
}

const roomState = ((): RoomStateInterface => {
    let currentRoomState = initialRoomState
    let stateUIUpdater: UIUpdater = state => {
        logService.log(
            'Got a state update while not yet being subscribed to UI state: ',
            state
        )
    }
    const _updateUIState = (newState: P2PStateInterface): void => {
        stateUIUpdater(JSON.stringify(newState))
    }
    const _setUIUpdater = (updater: UIUpdater): void => {
        stateUIUpdater = updater
    }
    const _removeUser = (name: string | undefined): void => {
        if (name) {
            currentRoomState = {
                ...currentRoomState,
                users: currentRoomState.users.filter(
                    user => user.name !== name
                ),
            }
            _updateUIState(currentRoomState)
        }
    }
    const _addUser = (name: string): void => {
        const isNoUsers = currentRoomState.users.length === 0
        const isHost = isNoUsers
            ? {
                  isHost: true,
              }
            : undefined
        currentRoomState.users.push({ name, voteRating: -1, ...isHost })
        _updateUIState(currentRoomState)
    }
    const _voteUser = ({ name, voteRating }: P2PStateUserInterface): void => {
        currentRoomState.users = currentRoomState.users.map(user =>
            user.name === name ? { ...user, voteRating } : user
        )
        _updateUIState(currentRoomState)
    }
    const _getNameByPeerId = (name: string): string | undefined => {
        const foundUser = currentRoomState.users.find(
            user => user.name === name
        )
        return foundUser ? foundUser.name : undefined
    }
    const _getUserNames = (): Array<string> => {
        return currentRoomState.users.map(user => user.name)
    }
    const _setState = (newState: P2PStateInterface): void => {
        currentRoomState = newState
        _updateUIState(currentRoomState)
    }
    return {
        getState: (): P2PStateInterface => currentRoomState,
        getUserNames: _getUserNames,
        getNameByPeerId: _getNameByPeerId,
        removeUser: _removeUser,
        addUser: _addUser,
        voteUser: _voteUser,
        setUIUpdater: _setUIUpdater,
        setState: _setState,
    }
})()

export default roomState
