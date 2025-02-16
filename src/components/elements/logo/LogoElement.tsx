import { FunctionalComponent, h } from 'preact'
import cn from 'classnames'
import style from './style.module.css'

type Props = {
    isSpinner?: boolean
}

const LogoElement: FunctionalComponent<Props> = ({ isSpinner }: Props) => {
    return <div className={cn(style.logo, isSpinner && style.spinner)} />
}

export default LogoElement
