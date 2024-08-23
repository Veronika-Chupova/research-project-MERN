import {useState} from 'react'
import del_icon from './assets/ios_del.png'
import del_icon_filled from './assets/ios_del_filled.png'

function NumControl ({ aggregator, active_field, blank}) {
    const style = 'flex-1 relative inline-block rounded-[7px] h-11 bg-transparent focus:outline-none'

    const [active, setActive] = useState (false)

    function handleBackspace () {
        setActive(true)
        if (active_field) {
            aggregator (prev => {
                const new_value = {...prev, [active_field]: prev[active_field].substring(0, prev[active_field].length-1)}
                return new_value
            })
        }
    }

    return <>
        {blank ? 
        <button className={style}></button> :
        <button className={style} onClick = {handleBackspace} onMouseUp={()=>setActive(false)}>
            <img className = 'absolute left-[40%] top-[23%] w-6 h-[56%]' src = {active ? del_icon_filled :del_icon}/>
        </button>}
    </>
}

export default NumControl