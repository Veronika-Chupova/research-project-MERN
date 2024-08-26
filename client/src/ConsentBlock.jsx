import { useRef } from 'react'
import downArrowIcon from './assets/down_arrow.png'
import consentReceivedIcon from './assets/icons8-check-mark-32.png'
import ConsentTickBox from './TickBox'

function ConsentBlock ({ id, children, userConsent, setConsent, consentMark, blockTitle }) {
    const consentElement = useRef(null)

    function scrollElementToTop () {
        if (!consentElement.current?.open) {
            document.getElementById(id).style.transform = 'rotate(-90deg)'
        } else {
            document.getElementById(id).style.transform = 'rotate(0deg)'
        }
        setTimeout(() => consentElement.current?.scrollIntoView({ behavior: "smooth", block: "start"}), 300)
    }

    return <details ref={consentElement} className='bg-violet-600 rounded mt-2'>
            <summary className='text-white' onClick={scrollElementToTop}>
                <div className='flex flex-row justify-stretch items-center h-10 p-2 gap-2 pointer-events-none'>
                    <img id={id} src={downArrowIcon} className='inline h-3/4 w-auto pointer-events-none '/>
                    <p className='inline flex-1 pointer-events-none'>{blockTitle}</p>
                    <img src={consentReceivedIcon} className={consentMark ? '' : 'hidden'}/>
                </div>
            </summary>
            <div className='text-[10px] font-light bg-white py-2 h-96 text-clip ovrflow-hidden overflow-auto'>
                {children}
                {blockTitle === 'Participant Information' && 
                    <>
                        <ConsentTickBox
                            id={id}
                            consentStatus={Boolean(userConsent['participantInfo'])}
                            setConsent={setConsent}
                            inputName='participantInfo'
                            signatureText='I have read and understood "Participant Information" and give my consent to take part in the study'
                        />

                        <ConsentTickBox
                            id={id} 
                            consentStatus={Boolean(userConsent['age'])}
                            setConsent={setConsent}
                            inputName='age'
                            signatureText='I am a capable person over 18 years old'
                        />
                    </>
                }
                {blockTitle==='Terms of Use' &&
                        <ConsentTickBox
                            id={id} 
                            consentStatus={Boolean(userConsent['termsOfUse'])}
                            setConsent={setConsent}
                            inputName='termsOfUse'
                            signatureText='I have read and understood "Terms of Use"'
                        />
                }
            </div>  
        </details>
}

export default ConsentBlock