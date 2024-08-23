import { devicePageText } from './assets/wrongdevicepage.js'

function WrongDevicePage () {
    return <>
        <div className='text-center font-baseline font-normal px-20'>
            <div className='inline-block text-left mt-60 w-10/12'>
                <h3 className='text-2xl text-violet-500 mb-5'>{devicePageText.title}</h3>
                <p className='text-baseline font-light mb-5'>{devicePageText.researchInfo}</p>
                <p className='text-baseline font-semibold font-light mb-5'>{devicePageText.callToAction}</p>
            </div>
        </div>
    </>
}

export default WrongDevicePage