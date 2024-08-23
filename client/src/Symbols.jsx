function Symbols ({ view, setView }) {
    const output = {
        letters: '#+=',
        symbols: 'ABC'
    }
    function handleClick () {
        view=='letters' ? setView('symbols') : setView('letters')
    }

    return <button className = 'inline-block rounded-[7px] h-11 border border-b-zinc-300 flex-1 bg-ios-kb-control focus:outline-none' onClick = {handleClick}>
        {output[view]}
    </button>
}

export default Symbols 

