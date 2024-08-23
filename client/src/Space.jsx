import { useState } from 'react'

function Space ({ aggregator, active_field, size }) {
    const [addStyle, setAddStyle] = useState ('bg-white')

    function handleClick() {
        if (active_field) {
            aggregator (prev => {
                const new_value = {...prev, [active_field]: prev[active_field].concat(' ')}
                return new_value
            })
        }
    }

    function handlePress() {
        setAddStyle('bg-ios-kb-control')
    }
    function handleRelease() {
        setAddStyle('bg-white')
    }

    return <button 
        style={{'width': (size*5+24) + 'px'}} 
        className={'inline-block rounded-[7px] h-11 border border-b-zinc-300 w-52 focus:outline-none ' + addStyle} 
        onClick = {handleClick}
        onTouchStart={handlePress}
        onTouchEnd={handleRelease}>
            space
    </button>
}

export default Space