import { FunctionalComponent, h } from 'preact'
import * as style from './style.css'
import cn from 'classnames'

interface InputInterface {
    value: string
    type: 'text' | 'number'
    isBlock?: boolean
    onChange?: (text: string) => void
    readOnly?: boolean
    placeholder?: string
}

// https://github.com/preactjs/preact/issues/1930
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
        onKeyUp={(e): void =>
            onChange && onChange((e.target as HTMLInputElement).value)
        }
        placeholder={placeholder}
    />
)

export default InputElement
