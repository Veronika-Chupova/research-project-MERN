import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConsentBlock from './ConsentBlock'
import ParticipantInfoText from './Info'
import TermsOfUseText from './Terms'
import { startPageText } from './assets/startpagetext'
 
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
                    <p className='text-sm font-light mb-5'>{startPageText.callToAction}</p>
                    <div >
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
                    </div>
                    <div className='text-center'>
                        <button 
                            onClick={handleStartPress} 
                            className={'min-w-32 h-8 rounded mt-14 text-white font-black mb-20 '+startButtonStyle} 
                            type='button'
                        >
                            <p className='inline text-md font-semibold'>Start</p>
                        </button>
                    </div>
                </form>
            </div>
    </div> 
 }

export default StartPage

