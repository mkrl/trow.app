import { FunctionalComponent, h, ComponentType } from 'preact'
import IndexComponent, {
    IndexComponentInterface,
} from '../views/index/IndexComponent'
import RoomComponent, {
    RoomComponentInterface,
} from '../views/room/RoomComponent'
import { APP_VIEW_INDEX, APP_VIEW_ROOM } from '../constants/appViewConstants'

interface ViewMapInterface {
    [key: string]: ComponentType<
        IndexComponentInterface & RoomComponentInterface
    >
}
interface ViewMapperInterface {
    activeView: string
}

type CommonViewType = ViewMapperInterface &
    RoomComponentInterface &
    IndexComponentInterface

const VIEW_MAP: ViewMapInterface = {
    [APP_VIEW_INDEX]: IndexComponent,
    [APP_VIEW_ROOM]: RoomComponent,
}

const ViewMapperContainer: FunctionalComponent<CommonViewType> = ({
    activeView,
    ...props
}: CommonViewType) => {
    const Component = VIEW_MAP[activeView]
    return <Component {...props} />
}

export default ViewMapperContainer
