function Return () {
    const output = 'return'

    function handleClick () {

    }

    return <button className = 'inline-block flex-1 rounded-[7px] h-11 border border-b-zinc-300 bg-ios-kb-control focus:outline-none' onClick = {handleClick}>
        {output}
    </button>
}

export default Return