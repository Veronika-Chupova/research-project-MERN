import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConsentBlock from './ConsentBlock'
import ParticipantInfoText from './Info'
import TermsOfUseText from './Terms'
import { startPageText } from './assets/startpagetext'
import report from './assets/ResultReport.pdf'
 
function StartPage ({ currentConsent }) {
    const navigate = useNavigate ()
    const [userConsent, setConsent] = useState ({
        age: currentConsent?.current?.age,
        participantInfo: currentConsent?.current?.participantInfo,
        termsOfUse: currentConsent?.current?.termsOfUse
    })

    const fullUserConsent = Boolean(userConsent.age) && Boolean(userConsent.participantInfo) && Boolean(userConsent.termsOfUse)
    const startButtonStyle = fullUserConsent ? 'bg-green-500 active:bg-green-700' : 'bg-green-200'

    function handleStartPress () {
        if (fullUserConsent) {
            currentConsent.current = userConsent
            navigate ('/passcheck')
        } // Else branch -> popup Message 
    }

    return <div className='text-center font-baseline font-normal'>
            <div className='inline-block text-left mt-10 w-10/12'>
                <h3 className='text-2xl text-violet-500 mb-5'>{startPageText.title}</h3>
                <p className='text-sm font-light mb-5'>{startPageText.researchInfo}</p>
                <form >
                    {/* <p className='text-sm font-light mb-5'>{startPageText.callToAction}</p>     This part is for active experiment phase */}
                    <p className='text-sm font-light mb-5'>{startPageText.notification}</p>     {/* This part is for after study period */}
                    {/* <div >      This part is for active experiment phase
                    <ConsentBlock 
                        id ={1}
                        userConsent={userConsent}
                        setConsent={setConsent}
                        consentMark={Boolean(userConsent.age) && Boolean(userConsent.participantInfo)}
                        blockTitle='Participant Information' 
                    >
                        <ParticipantInfoText />   
                    </ConsentBlock>
                    </div>
                    <div >
                    <ConsentBlock 
                        id ={2}
                        userConsent={userConsent}
                        setConsent={setConsent}
                        consentMark={Boolean(userConsent.termsOfUse)}
                        blockTitle='Terms of Use' 
                    >
                        <TermsOfUseText />   
                    </ConsentBlock>
                    </div> */}
                    <div className='text-center'>
                        <button 
                            // onClick={handleStartPress}   This part is for active experiment phase
                            onClick={() => navigate ('/passcheck')}     //This part is for after study period
                            // className={'min-w-44 h-8 rounded mt-14 text-white font-black mb-10 '+startButtonStyle}   This part is for active experiment phase
                            className={'min-w-44 h-8 rounded mt-14 text-white font-black mb-10 bg-green-500 active:bg-green-700'}   //This part is for after study period
                            type='button'
                        >
                            <p className='inline text-md font-semibold'>Start</p>
                        </button>
                    </div>
                    <div className='text-center'>
                        <a href={report} target='_blank' rel='noreferrer'>
                            <button 
                                className={'min-w-44 h-8 rounded text-white font-black mb-20 bg-red-500 active:bg-green-700'} 
                                type='button'
                            >
                                <p className='inline text-md font-semibold'>Research Results</p>
                            </button>
                        </a>
                    </div>
                </form>
            </div>
    </div> 
 }

export default StartPage

