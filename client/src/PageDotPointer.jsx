function PageDotPointer ({ dotCount, activeDot}) {
    const dotArray = [...Array(dotCount).keys()]
    
    return <div className='flex flex-row gap-2 justify-center text-2xl pointer-events-none'>
        {dotArray.map( (element, index) => {
            const dotStyle = (index === activeDot-1) ? 'text-violet-400' : 'text-violet-200'
            return <p className={'pointer-events-none ' + dotStyle}>•</p> 
            }
        )}
    </div>
}

export default PageDotPointer