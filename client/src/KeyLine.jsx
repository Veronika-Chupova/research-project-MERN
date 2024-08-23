import Letter from "./Letter"
import UpperKey from "./UpperKey"
import Backspace from "./Backspace"
import { v4 as uuidv4 } from 'uuid'

function KeyLine ({ line, upper_case, active_field, aggregator, toggler, size, last, keyboardMode }) {

    return <div className ={last ? 'flex flex-row justify-between' : ''}>
        {last && <UpperKey upper_case={upper_case} toggler = {toggler} size={size}/>}
        <div className = 'flex flex-row gap-x-1.5 justify-center'>
            {line.map(item => 
                <Letter 
                    key={uuidv4()} 
                    content={item} 
                    upper_case={upper_case} 
                    aggregator={aggregator} 
                    active_field={active_field}
                    size = {size}
                    letters = {true}
                    keyboardMode = {keyboardMode}
                />
            )}
        </div>
        {last && <Backspace aggregator={aggregator} active_field={active_field} size={size}/>}
    </div>
}

export default KeyLine
