import { FunctionalComponent, h } from 'preact'
import * as style from './style.css'
import RangeElement from '../elements/range/RangeElement'
import ButtonElement from '../elements/button/ButtonElement'

interface VoteRangeComponentInterface {
    value: number
    range: number
    onChange: (newValue: number) => void
    onSubmit: (newValue: number) => void
}

const VoteRangeComponent: FunctionalComponent<VoteRangeComponentInterface> = ({
    value,
    range,
    onChange,
    onSubmit,
}: VoteRangeComponentInterface) => (
    <div class={style.container}>
        <div class={style.controls}>
            <ButtonElement onClick={(): void => onSubmit(-2)}>
                Not voting
            </ButtonElement>
            <ButtonElement onClick={(): void => onSubmit(value)}>
                Submit
            </ButtonElement>
        </div>
        <h1>{value}</h1>
        <div class={style.rangeContainer}>
            <RangeElement value={value} range={range} onChange={onChange} />
        </div>
    </div>
)

export default VoteRangeComponent
