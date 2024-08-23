import Letter from "./Letter"
import NumControl from "./NumControl"
import { v4 as uuidv4 } from 'uuid'

function NumLine ({ line, active_field, aggregator, last }) {

    return <div className ={last ? 'flex flex-row justify-stretch' : ''}>
        {last && <NumControl key={uuidv4()} blank={true}/>}
        <div className = 'flex flex-row flex-1 gap-x-1.5 justify-stretch'>
            {line.map(item => 
                <Letter 
                    key={uuidv4()} 
                    content={item} 
                    aggregator={aggregator} 
                    active_field={active_field}
                    letters={false}
                />
            )}
        </div>
        {last && <NumControl key={uuidv4()} aggregator={aggregator} active_field={active_field} blank={false}/>}
    </div>
}

export default NumLine
