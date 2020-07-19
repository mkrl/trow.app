import { FunctionalComponent, h } from 'preact'
import * as style from './style.css'
import cn from 'classnames'

interface InputInterface {
    value: string
    type: 'text' | 'number'
    isBlock?: boolean
    onChange?: () => void
    readOnly?: boolean
    placeholder?: string
}

const InputElement: FunctionalComponent<InputInterface> = ({
    value,
    onChange,
    type,
    isBlock,
    readOnly,
    placeholder,
}: InputInterface) => (
    <input
        class={cn(style.input, isBlock && style.block)}
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        placeholder={placeholder}
    />
)

export default InputElement
