import {useState} from 'react'
import del_icon from './assets/ios_del.png'
import del_icon_filled from './assets/ios_del_filled.png'
// import del_icon from './assets/ios_delete.png'

function Backspace ({ aggregator, active_field, size}) {
    // const width = 'w-['+ Math.round(size*1.26) + 'px]'
    const style = 'relative inline-block rounded-[7px] w-11 h-11 bg-ios-kb-control border border-b-zinc-300 focus:outline-none '

    const [src, setSrc] = useState (del_icon)
    const [addStyle, setAddStyle] = useState ('bg-ios-kb-control')

    function handlePress() {
        setAddStyle('bg-white')
        setSrc (del_icon_filled)
    }
    function handleRelease() {
        setAddStyle('bg-ios-kb-control')
        setSrc (del_icon)
    }

    function handleBackspace () {

        if (active_field) {
            aggregator (prev => {
                const new_value = {...prev, [active_field]: prev[active_field].substring(0, prev[active_field].length-1)}
                return new_value
            })
        }
    }

    return <button className={style.concat(addStyle)} onClick = {handleBackspace} onTouchStart={handlePress} onTouchEnd={handleRelease}>
        <img className = 'absolute left-[20%] top-[23%] w-[54%] h-[56%]' src={src}/>
    </button>
}

export default Backspace

// {active ? style +' bg-white' : style +' bg-ios-kb-control'}