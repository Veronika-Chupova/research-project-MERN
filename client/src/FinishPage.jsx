import { useEffect } from 'react'
import candy from './assets/candy.png'

function FinishPage ({ userLog }) {

    return <div className='mt-40 text-center px-10'>
        <h3 className='text-2xl text-violet-500'>Thank you for participation in the researh!</h3>
        <img src={candy} className='inline-block w-1/4 h-auto mt-10'/>
        <h5 className='mt-10 text-lg '>Your data is successfully collected. Now you can close the tab.</h5>
    </div>
    
}

export default FinishPage