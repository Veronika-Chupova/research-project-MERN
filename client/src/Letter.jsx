import { useState } from 'react'

function Letter ({ content, upper_case, aggregator, active_field, size, letters, keyboardMode }) {
    const [pressed, setPressed] = useState(false)
    const [addStyle, setAddStyle] = useState ('bg-white')

    const output = (upper_case && (typeof content === 'string')) ? content.toUpperCase() : content
    const output_size = ((upper_case && typeof content === 'string') || typeof content === 'number' || keyboardMode=== 'symbols') ? 
        ' text-xl' : 
        ' text-2xl font-light pb-1'
    const width = 'w-[' + String(Math.round(size)) +']'
    const style = size ? {'width': size+'px'} : {'flex': 1}
    const style_dbl = {'width': size*2 + 'px'}
    const style_rot = {'width': (size+8) +'px', 'height': (size+8) +'px'}

    const main_style = 'inline-block rounded-md h-11 outline outline-1 outline-transparent bg-white focus:outline-none'
    const type_style = ''

    function handleClick() {
        if (active_field) {
            aggregator (prev => {
                const current_value = prev[active_field]
                let new_value
                
                if (size) { //optimize
                    new_value = {...prev, [active_field]: current_value + output}
                } else {
                    new_value = {...prev, [active_field]: (current_value.length == 4) ? current_value : current_value + output}
                }
                return new_value
            })
        }
    }

    function handlePress (e) {
        const {name} = e.target
        if (name==='let') {
            setPressed(prev => !prev)
        } else if (name==='num') {
            setAddStyle('bg-ios-kb-control')
        }
    }
    function handleRelease (e) {
            const {name} = e.target
            if (name==='let') {
                const myPromise = new Promise((resolve, reject) => {
                    setTimeout(() => {
                      resolve('Ok')
                    }, 150)
                  })
                myPromise
                    .then(() => {setPressed(prev => !prev)})
                    .then(() => {handleClick()})
            } else if (name==='num') {
                setAddStyle('bg-white')
            }
    }

    if (letters) {
        return <button 
            name='let'
            className={'flex flex-col bg-transparent items-center '}
            onTouchStart={handlePress} 
            onTouchEnd={handleRelease}
        >
            <div style={style} className='z-20 relative flex items-center justify-center inline-block rounded-md h-11 outline outline-1 outline-transparent bg-white focus:outline-none pointer-events-none'>
                {pressed ?
                    <div className='relative inline-block rounded-md h-full w-full border border-solid border-gray-400 bg-white focus:outline-none pointer-events-none'>
                        <div style={style_dbl} className='bg-white h-14 absolute -top-16 -left-4 rounded-md flex items-center justify-center z-10 border border-solid border-gray-400 pointer-events-none'>
                            <div style={style_rot} className='bg-white rotate-45 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-10 pointer-events-none'></div>
                            <p className={'text-2xl z-10 pointer-events-none '  + output_size}>{output}</p>
                        </div>
                    </div> :
                    <p className={'pointer-events-none '  + output_size}>{output}</p>
                }
            </div>
        </button>} else {
                return <button 
                    name='num'
                    className={'font-ios text-xl inline-block flex-1 rounded-md h-11 outline outline-1 outline-transparent focus:outline-none ' +  addStyle}
                    onClick={handleClick}
                    onTouchStart={handlePress}
                    onTouchEnd={handleRelease}>
                    {output}
                </button>
            }
}

export default Letter
