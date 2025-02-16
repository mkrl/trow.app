import { FunctionalComponent, h, Fragment } from 'preact'
import style from './style.module.css'
import cn from 'classnames'

interface RangeInterface {
    value: number
    range: number
    isBlock?: boolean
    onChange: (newValue: number) => void
}

interface ButtonRowInterface {
    onChange: (value: number) => void
    values: Array<number>
    activeValue: number
}

const ButtonRow: FunctionalComponent<ButtonRowInterface> = ({
    onChange,
    values,
    activeValue,
}: ButtonRowInterface) => (
    <Fragment>
        {values.map(value => (
            <button
                class={cn(
                    value === activeValue && style.active,
                    value <= activeValue && style.filled
                )}
                key={value}
                onClick={(): void => onChange(value)}
            />
        ))}
    </Fragment>
)

const RangeElement: FunctionalComponent<RangeInterface> = ({
    value,
    range,
    onChange,
    isBlock,
}: RangeInterface) => {
    const values = Array.from(Array(range).keys())
    return (
        <div class={cn(style.rangeContainer, isBlock && style.block)}>
            <ButtonRow
                activeValue={value}
                values={values}
                onChange={onChange}
            />
            <hr />
        </div>
    )
}

export default RangeElement
