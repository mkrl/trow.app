import { FunctionalComponent, h, ComponentType } from 'preact'
import IndexComponent, {
    IndexComponentInterface,
} from '../components/index/IndexComponent'
import {
    APP_VIEW_INDEX,
    APP_VIEW_NAME_PROMPT,
    APP_VIEW_ROOM,
} from '../constants/appViewConstants'
import NamePromptContainer, {
    NamePromptContainerInterface,
} from '../views/namePrompt/NamePromptContainer'
import RoomContainer, { RoomContainerType } from '../views/room/RoomContainer'

interface ViewMapperInterface {
    activeView: string
}

type CommonViewType = RoomContainerType &
    IndexComponentInterface &
    NamePromptContainerInterface

type UnitedViewType = ViewMapperInterface & CommonViewType

interface ViewMapInterface {
    [key: string]: ComponentType<CommonViewType>
}

const VIEW_MAP: ViewMapInterface = {
    [APP_VIEW_INDEX]: IndexComponent,
    [APP_VIEW_ROOM]: RoomContainer,
    [APP_VIEW_NAME_PROMPT]: NamePromptContainer,
}

const ViewMapperContainer: FunctionalComponent<UnitedViewType> = ({
    activeView,
    ...props
}: UnitedViewType) => {
    const Component = VIEW_MAP[activeView]
    return <Component {...props} />
}

export default ViewMapperContainer
