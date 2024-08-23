import arrow from './assets/upper.png'
import arrow_filled from './assets/upper_filled.png'

function UpperKey ({ upper_case, toggler, size }) {
    // const width = 'w-\['+ String(Math.round(size*1.26)) + 'px\]'
    const style = 'relative inline-block rounded-[7px] w-11 h-11 border border-b-zinc-300 justify-self-start focus:outline-none'
    function handleUpper () {
        toggler (prev => !prev)
    }

    return <button className ={upper_case ? style +' bg-white' : style +' bg-ios-kb-control'} onClick = {handleUpper}>
        <img src={upper_case ? arrow_filled : arrow} className='absolute left-[20%] top-[23%] w-[54%] h-[54%]'/>
    </button>   
}

export default UpperKey