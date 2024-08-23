import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from './InputField'
import NumLine from './NumLine'
import Submission from './Submission'
import PageDotPointer from './PageDotPointer'
import NavigationButton from './NavigationButton'
import PasswordCriteria from './PasswordCriteria'
import setNumboard from './numboard'
import { v4 as uuidv4 } from 'uuid'

import l_arrow from './assets/left-arrow.png'
 
function DataCollectionPage ({ userData }) {
    const navigate = useNavigate()
    const [userGeneratedContent, setUserContent] = useState ({ 
        mainData: userData.current.pin,
        controlData: userData.current.pin
    })
    const [dataReadyStatus, setReadyStatus] = useState ()
    const [focused, setFocus] = useState ()
    const [notice, setNotice] = useState (false)
    const [keyboardStyle, setStyle] = useState ('hidden')
    const [modalOpen, setModalOpen] = useState (false)
    const keyboard = useRef (setNumboard())
    // const [upper_case, setCase] = useState (false)
    // const [view, setView] = useState ('letters')
    // const keyboard = useRef (setKeyboard())

    // useEffect(()=>{
    //     if (upper_case) {
    //         setCase(false)
    //     }
    // },[pass_value, view])


    // const letter_size = getSize(window.screen.availWidth, 2, 6)
    // const focus_style = 'border-solid border-violet-600 rounded border-2'


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
    function handleMove (event) { //optimize
        const {name} = event.target
        const ready_status = (userGeneratedContent.mainData === userGeneratedContent.controlData && userGeneratedContent.mainData.length == 4)
        // const ready_status = pass_criteria.reduce((acc, element) => {
        //     return (acc && element.control)
        // },true)
        setStyle('hidden')
        if (name=='prev') {
            navigate('/passcheck')
            // setModalOpen (true)
        }
        if (name=='next' && ready_status) {
            setModalOpen (true)
            // navigate('/pincheck')
            // userData.current.pwd = userGeneratedContent.mainData
        }
        if (userGeneratedContent.mainData != userGeneratedContent.controlData && userGeneratedContent.mainData.length != 0) {
            setNotice(true)
        }
        userData.current.pin = userGeneratedContent.mainData
    }

    return <div className='text-center font-baseline font-normal'>
    <div className='inline-block text-left mt-10 w-10/12'>
    <h3 className='text-2xl text-violet-500 mb-10'>Create a new 4-digit PIN code</h3>  {/* Create a new password */}
        <form> 
            <PasswordCriteria userContent={userGeneratedContent} setReadyStatus={setReadyStatus}  />
            <div className={notice ? 'mb-10 text-red-500' : 'mb-10 text-red-500 invisible'}>
                <p>PIN codes don't match</p>
            </div>

            {Object.entries(userGeneratedContent).map( element => 
                <InputField 
                    key={uuidv4()} 
                    name={element[0]} 
                    value={element[1]} 
                    focused={focused} 
                    setFocus={setFocus}
                    aggregator={setUserContent}
                    setStyle={setStyle}
                    label = 'PIN code'
                    // label = 'Password'
                />
            )}
            
            <div className='flex justify-between mt-10 text-white font-black mb-20'>
                <NavigationButton buttonType='left' handleButtonClick={handleMove}/>
                <NavigationButton buttonType='right' handleButtonClick={handleMove}/>
                <NavigationButton buttonType='submit' handleButtonClick={handleMove}/>
            </div>

            <PageDotPointer dotCount={2} activeDot={1} />
        </form>
    </div>
    <div className={keyboardStyle.concat(' ','sticky w-full bottom-0 px-0.5 pt-4 pb-4 z-10 bg-ios-kb-background text-center flex flex-col gap-3')}>
        {keyboard.current.map((line, index) => 
            <NumLine
                key={uuidv4()}
                line={line}
                active_field = {focused} 
                aggregator = {setUserContent}
                last = {keyboard.current.length - 1 === index}
            />
        )}
    </div>
    <div className={modalOpen ? '' : 'hidden'}>
        <Submission open={modalOpen} setOpen={setModalOpen} />
    </div>
    </div>   
 }

export default DataCollectionPage