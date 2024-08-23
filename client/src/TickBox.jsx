import { useEffect } from 'react'

function ConsentTickBox ({ id, consentStatus, setConsent, inputName, signatureText }) {

    useEffect (() => {
        document.getElementsByName(inputName)[0].checked = consentStatus
    }, [])

    function handleConsentTick (event) {
        const actionTimestamp = Date.now()

        const consentBlock = event.target
        const { name } = event.target
        const isChecked = consentBlock.checked
        setConsent(prev => {
            if (!prev[name]) {
                if (name === 'termsOfUse' || Boolean(prev.participantInfo) === true || Boolean(prev.age) === true) {
                    setTimeout ( () => {
                        document.getElementById(id).style.transform = 'rotate(0deg)'
                        const parentElement = consentBlock.closest('details')
                        if (parentElement) {
                            parentElement.open = false
                        }
                    },500)
                }
            }
            return isChecked ? {...prev, [name]: actionTimestamp } : {...prev, [name]: null }
        })
    }

    return <div className='flex flex-row gap-2 items-start bg-white mb-2'>
            <input name={inputName} onChange={handleConsentTick} className='w-3.5 h-3.5 mt-1 flex-none' type='checkbox' />
            <label className='text-sm font-normal'>{signatureText}</label>
        </div>
}

export default ConsentTickBox