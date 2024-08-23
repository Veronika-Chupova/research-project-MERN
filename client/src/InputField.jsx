import { forwardRef } from 'react'
import ClearBtn from './ClearBtn'
import ShowStringBtn from './ShowStringBtn'
import {v4 as uuidv4} from 'uuid'

function InputField ({name, value, focused, setFocus, unmaskedInput, setUnmaskedInput, aggregator, setStyle, label }, ref) {
    const labels = {
        mainData: 'New ',
        controlData: 'Confirm '
    }
    const isMasked = !unmaskedInput.includes(name)
    const ring = (focused == name) ? ' ring ring-violet-500' : ''

    function handleFocusOn (event) {
        event.preventDefault()
    }

    function handleInputClick (event, inputName) {
        const elementName = inputName ? inputName : event?.target.name
        if (focused != elementName) {
            setUnmaskedInput(prev => {
                const newList = prev.filter(element => element != focused)
                return [...newList, elementName]
            })
            setFocus (elementName)
        }
        setStyle('')
        setTimeout(() => ref?.current?.scrollIntoView({ behavior: "smooth", block: "start"}), 300)
    }

    return <>
    <label className='block text-md font-light'>{labels[name] + label}</label>
    <div className={'flex inline-block border-solid border-violet-200 border-2 rounded mb-5 mx-auto text-md h-8' + ring}>
        <ShowStringBtn isMasked={isMasked} setUnmaskedInput={setUnmaskedInput} name={name}/>
        <input 
            className = 'flex-auto w-full h-full focus:outline-none pl-2' 
            onFocus={handleFocusOn}
            onClick={handleInputClick}
            value={value} 
            name={name}
            type={isMasked ? 'password' : 'text'}
            readOnly>
        </input>
        <ClearBtn 
            key={uuidv4()} 
            aggregator={aggregator} 
            inputName={name}
            handleInputClick={handleInputClick}
            />
    </div>
    </>
}

export default forwardRef( InputField )