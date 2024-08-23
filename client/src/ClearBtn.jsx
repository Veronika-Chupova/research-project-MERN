import empty from './assets/clear.png'

function ClearBtn ({ aggregator, inputName, handleInputClick}) {

    function handleClearClick (event) {
        aggregator(prev => {
            return {...prev, [inputName]: ''}
        })
        // setStyle('')
        // setFocus (inputRef)
        handleInputClick(event, inputName)
    }
    return <button 
                className = 'inline rounded border-solid border-slate-400 w-8 h-full bg-white focus:outline-none' 
                onClick={handleClearClick} 
                type='button'><img className='h-full mr-0 ml-auto' src={empty} />
            </button>
}

export default ClearBtn