import { FunctionalComponent, h, ComponentType } from 'preact'
import IndexComponent, {
    IndexComponentInterface,
} from '../components/index/IndexComponent'
import RoomComponent, {
    RoomComponentInterface,
} from '../components/room/RoomComponent'
import { APP_VIEW_INDEX, APP_VIEW_ROOM } from '../constants/appViewConstants'

interface ViewMapperInterface {
    activeView: string
}

type CommonViewType = RoomComponentInterface & IndexComponentInterface

type UnitedViewType = ViewMapperInterface & CommonViewType

interface ViewMapInterface {
    [key: string]: ComponentType<CommonViewType>
}

const VIEW_MAP: ViewMapInterface = {
    [APP_VIEW_INDEX]: IndexComponent,
    [APP_VIEW_ROOM]: RoomComponent,
}

const ViewMapperContainer: FunctionalComponent<UnitedViewType> = ({
    activeView,
    ...props
}: UnitedViewType) => {
    const Component = VIEW_MAP[activeView]
    return <Component {...props} />
}

export default ViewMapperContainer
