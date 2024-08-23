import { useState } from 'react'
import eyeIcon from './assets/eye.png'
import hiddenIcon from './assets/hidden.png'

function ShowStringBtn ({ isMasked, setUnmaskedInput, name }) {    
    const [imgSource, setImgSource] = useState (isMasked ? hiddenIcon : eyeIcon)

    function handleClick () {
        if (isMasked) {
            setImgSource (eyeIcon)
            setUnmaskedInput(prev => [...prev, name])
        } else {
            setImgSource (hiddenIcon)
            setUnmaskedInput(prev => prev.filter(element => element != name))
        }
    }
    return <button 
                className = 'inline rounded w-8 h-full bg-white pl-1 focus:outline-none' 
                onClick={handleClick} 
                type='button'><img className='h-3/4 ml-0 mr-auto' src={imgSource} />
            </button>
}

export default ShowStringBtn