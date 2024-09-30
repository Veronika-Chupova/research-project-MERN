import { devicePageText } from './assets/wrongdevicepage.js'
import report from './assets/ResultReport.pdf'

function WrongDevicePage () {
    return <>
        <div className='text-center font-baseline font-normal px-20'>
            <div className='inline-block text-left mt-60 w-10/12'>
                <h3 className='text-2xl text-violet-500 mb-5'>{devicePageText.title}</h3>
                <p className='text-baseline font-light mb-5'>{devicePageText.researchInfo}</p>
                <p className='text-baseline font-semibold font-light mb-5'>{devicePageText.callToAction}</p>   {/* This is for active experiment period */}
                <p className='text-baseline font-semibold font-light mb-5'>{devicePageText.notification}</p>     {/* This is for AFTER experiment period */}
            </div>
            <div className='text-center'>    {/* This is for AFTER experiment period */}
                        <a href={report} target='_blank' rel='noreferrer'>
                            <button 
                                className={'min-w-44 h-8 rounded text-white font-black mb-20 bg-red-500 active:bg-green-700'} 
                                type='button'
                            >
                                <p className='inline text-md font-semibold'>Research Results</p>
                            </button>
                        </a>
            </div>
        </div>
    </>
}

export default WrongDevicePage