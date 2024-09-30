
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from './InputField'
import NumLine from './NumLine'
import Submission from './Submission'
import PageDotPointer from './PageDotPointer'
import NavigationButton from './NavigationButton'
import MissingDataWarn from './MissingDataWarn'

import { v4 as uuidv4 } from 'uuid'
 
function PinPage ({ userData, keyboard, submitData, userLog, consent }) {
    const navigate = useNavigate()
    const [userGeneratedContent, setUserContent] = useState ({
        mainData: userData.current.pin,
        controlData: ''
    })
    const [focusedInput, setFocusedInput] = useState ()
    const [unmaskedInput, setUnmaskedInput] = useState([])
    const [pinProblem, setPinProblem] = useState (false)
    const [keyboardVisibility, setKeyboardVisibility] = useState ('hidden')
    const [isModalOpen, setModalOpen] = useState (false)
    const [isDataWarnOpen, setDataWarnOpen] = useState (false)
    const formRef = useRef (null)

    useEffect (() => {
        window.addEventListener('click', handleSideClick)
    }, [])

    useEffect (() => {
        const now = Date.now()
        userLog.current.push({'pin page is opened': now})
      }, [])

    function handleButtonClick (event) { //optimize
        const {name} = event.target
        const readyStatus = (userGeneratedContent.mainData === userGeneratedContent.controlData && userGeneratedContent.mainData.length == 4)
        const fullConsent = Boolean(consent.current?.age) && Boolean(consent.current?.participantInfo) && Boolean(consent.current?.termsOfUse)

        setKeyboardVisibility('hidden')
        if (name=='prev') {
            navigate('/passcheck')
        } else if ((name=='next' || name=='submit') && readyStatus && fullConsent && userData.current?.pwd.length>0) {
            userData.current.pin = userGeneratedContent.mainData
            setPinProblem (false)
            setModalOpen (true)
        } else if ((userGeneratedContent.mainData != userGeneratedContent.controlData && userGeneratedContent.mainData.length != 0) || 
            userGeneratedContent.mainData.length === 0) {
                setPinProblem(true)
        } else {
            setDataWarnOpen (true)
        }
    }

    function handleSideClick (event) {
        const id = event.target.id 
        if (id==='page body' || id==='work area' || id==='control area') {
            setKeyboardVisibility('hidden')
            setFocusedInput()
            setUnmaskedInput([])
        }
    }

    return <div id='page body' className='text-center font-baseline font-normal'>
    <div id='work area' className='inline-block text-left mt-10 w-10/12'>
        <h3 className='text-2xl text-violet-500 pointer-events-none mb-1'>Create a 4-digit PIN code</h3>
        <h5 className='block text-md font-light mb-8 pointer-events-none'>Do not use your active PIN codes</h5>
        <div ref={formRef} className={pinProblem ? 'mb-10 text-red-500 pointer-events-none' : 'mb-10 text-red-500 invisible'}>
            <p>PIN codes don't match or don't satisfy the criteria</p>
        </div>
        <form>
            {Object.entries(userGeneratedContent).map( element => 
                <InputField 
                    key={uuidv4()} 
                    name={element[0]} 
                    value={element[1]} 
                    focused={focusedInput} 
                    setFocus={setFocusedInput}
                    unmaskedInput={unmaskedInput}
                    setUnmaskedInput={setUnmaskedInput} 
                    aggregator = {setUserContent}
                    setStyle = {setKeyboardVisibility}
                    label = 'PIN code'
                    ref={formRef}
                />
            )}
            <div className='flex justify-between mt-10 text-white font-black mb-20'>
                <NavigationButton buttonType='left' handleButtonClick={handleButtonClick} />
                {/* <NavigationButton buttonType='submit' handleButtonClick={handleButtonClick} />     This part is for active experiment */}
                <NavigationButton buttonType='submit' handleButtonClick={() => navigate('/')} />        {/* This part is for after research */}
            </div>
            <PageDotPointer dotCount={2} activeDot={2} />
        </form>
    </div>
    <div className={keyboardVisibility.concat(' ','sticky w-full bottom-0 px-0.5 pt-4 pb-4 z-10 bg-ios-kb-background text-center flex flex-col gap-3')}>
        {keyboard.current.map((line, index) => 
            <NumLine
                key={uuidv4()}
                line={line}
                active_field = {focusedInput} 
                aggregator = {setUserContent}
                last = {keyboard.current.length - 1 === index}
            />
        )}
    </div>
    <div className={isModalOpen ? '' : 'hidden'}>
        <Submission open={isModalOpen} setOpen={setModalOpen} submitData={submitData} />
    </div>
    <div className={isDataWarnOpen ? '' : 'hidden'}>
        <MissingDataWarn open={isDataWarnOpen} setOpen={setDataWarnOpen} />
    </div>
    </div>   
 }

export default PinPage





    // function handleSubmission (e) { //working!
    //     e.preventDefault()
    //     const result = userGeneratedContent.mainData
    //     const ready_status = (userGeneratedContent.mainData === userGeneratedContent.controlData && userGeneratedContent.mainData.length == 4)

    //     const form_data = new FormData(e.target)
    //     const entries = Object.fromEntries(form_data)
    //     const data = Object.values(entries)

    //     if (ready_status) {
    //         fetch('http://localhost:3500/submission', {
    //             method: 'POST',
    //             headers: {"Content-type" : "application/json"},
    //             body: JSON.stringify({pwd: result}),
    //             credentials: 'include'
    //         })
    //     } else {
    //         console.log ('Check your PIN!')
    //     }
    // }