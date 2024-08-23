import leftArrow from './assets/left-arrow.png'
import rightArrow from './assets/right-arrow.png'

function NavigationButton ({ buttonType, handleButtonClick }) {
    let buttonProperties = {
        text: '',
        style: ' ' + 'bg-green-500 active:bg-green-700'
    }
    let imgProperties = {
        source: '',
        visibility: '',
        style: ''
    }

    switch (buttonType){
        case 'left': {
            imgProperties.source = leftArrow
            buttonProperties.text = 'Prev'
            imgProperties.style = ' ' + 'mr-3'
            break
        }
        case 'right': {
            imgProperties.source = rightArrow
            buttonProperties.text = 'Next'
            imgProperties.style = ' ' + 'ml-3'
            break
        }
        case 'submit': {
            imgProperties.visibility = ' ' + 'hidden'
            buttonProperties.text = 'Submit'
            buttonProperties.style = ' ' + 'bg-violet-600 active:bg-violet-700'
            break
        }
    }

    return <button 
                name={buttonProperties.text.toLowerCase()} 
                onClick={handleButtonClick} 
                className = {'min-w-28 h-8 rounded' + buttonProperties.style} 
                type='button'
            >
                {buttonType==='left' ? <>
                    <img 
                        className={'h-3/4 w-auto inline pointer-events-none' + imgProperties.style + imgProperties.visibility} 
                        src={imgProperties.source}    
                    />
                    <p className='inline text-md font-semibold pointer-events-none'>{buttonProperties.text}</p>
                </> :
                <>
                    <p className='inline text-md font-semibold pointer-events-none'>{buttonProperties.text}</p>
                    <img 
                        className={'h-3/4 w-auto inline pointer-events-none' + imgProperties.style + imgProperties.visibility} 
                        src={imgProperties.source}    
                    />
                </>
                }
            </button>
}

export default NavigationButton