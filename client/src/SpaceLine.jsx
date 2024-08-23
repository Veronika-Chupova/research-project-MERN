import Space from "./Space"
import Return from './Return'
import Symbols from './Symbols'

function SpaceLine({ aggregator, active_field, view, setView, size }) {
    return <div className = 'flex flex-row gap-1.5 justify-center text-base'>
        <Symbols view={view} setView={setView} />
        <Space aggregator={aggregator} active_field={active_field} size={size}/>
        <Return />
    </div>

}

export default SpaceLine