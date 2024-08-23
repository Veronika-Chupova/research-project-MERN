import {useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from './InputField'
import KeyLine from './KeyLine'
import SpaceLine from './SpaceLine'
import Discard from './Discard'
import NavigationButton from './NavigationButton'
import PageDotPointer from './PageDotPointer'
import PasswordCriteria from './PasswordCriteria'
import RequirementsWarn from './RequirementsWarn'
// import RefreshWarn from './RefreshWarn'
import getSize from './getlettersize'
import { v4 as uuidv4 } from 'uuid'
 
function PasswordPage ({ userData, keyboard, userLog }) {
    const navigate = useNavigate()
    const [userGeneratedContent, setUserContent] = useState ({
        mainData: userData.current.pwd,
        controlData: ''
    })
    const [focusedInput, setFocusedInput] = useState ()
    const [unmaskedInput, setUnmaskedInput] = useState([])
    const [isUpperCase, setUpperCase] = useState (false)
    const [keyboardMode, setMode] = useState ('letters')
    const [keyboardVisibility, setKeyboardVisibility] = useState ('hidden')
    const [isPrevModalOpen, setPrevModalOpen] = useState (false)
    const [isNextModalOpen, setNextModalOpen] = useState()
    // const [isRefreshModalOpen, setRefreshModalOpen] = useState (false)
    const formRef = useRef(null)

    useEffect (() => {
        if (isUpperCase) {
            setUpperCase(false)
        }
    }, [userGeneratedContent, keyboardMode])

    useEffect (() => {
        window.addEventListener('click', handleSideClick)
    }, [])

    useEffect (() => {
        const now = Date.now()
        userLog.current.push({'password page is opened': now})
      }, [])

    const passwordCriteria = [
        {title: 'At least 8 caracters',
        control: userGeneratedContent.mainData.length > 7},
        {title: 'Both upper and lower case letters',
        control: (/[A-Z]/).test(userGeneratedContent.mainData) && (/[a-z]/).test(userGeneratedContent.mainData)},
        {title: 'At least 1 number',
        control: /\d/.test(userGeneratedContent.mainData)},
        {title: 'Passwords match',
        control: (userGeneratedContent.mainData === userGeneratedContent.controlData) && (userGeneratedContent.mainData != '')}
    ]
    const letterSize = getSize(window.screen.availWidth, 2, 6)

    function handleButtonClick (event) { //optimize
        const {name} = event.target
        const readyStatus = passwordCriteria.reduce((acc, element) => {
            return (acc && element.control)
        },true)
        setKeyboardVisibility('hidden')
        if (name == 'prev') {
            setPrevModalOpen (true)
        } else if (name == 'next' && readyStatus) {
            navigate('/pincheck')
            userData.current.pwd = userGeneratedContent.mainData
        } else if (name == 'next' && !readyStatus) {
            setNextModalOpen (true)
        }
    }

    function handleSideClick (event) {
        const id = event.target.id 
        if (id==='page body' || id==='work area') {
            setKeyboardVisibility('hidden')
            setFocusedInput()
            setUnmaskedInput([])
        }
    }

    return <div id='page body' className='text-center font-baseline font-normal'>
        <div id='work area' className='inline-block text-left mt-10 w-10/12'>
            <h3 className='text-2xl text-violet-500 pointer-events-none mb-1'>Create a new password</h3>
            <h5 className='block text-md font-light mb-8 pointer-events-none'>Do not use your active passwords</h5>
            <div ref={formRef} className='pointer-events-none'>
                <PasswordCriteria criteria={passwordCriteria} />
            </div>
            <form>
                <InputField 
                        key={uuidv4()} 
                        name='mainData'
                        value={userGeneratedContent.mainData} 
                        focused={focusedInput}
                        setFocus={setFocusedInput}
                        unmaskedInput={unmaskedInput}
                        setUnmaskedInput={setUnmaskedInput} 
                        aggregator = {setUserContent}
                        setStyle = {setKeyboardVisibility}
                        label = 'Password'
                        ref = {formRef}
                />

                <InputField 
                        key={uuidv4()} 
                        name='controlData' 
                        value={userGeneratedContent.controlData} 
                        focused={focusedInput} 
                        setFocus={setFocusedInput}
                        unmaskedInput={unmaskedInput}
                        setUnmaskedInput={setUnmaskedInput} 
                        aggregator = {setUserContent}
                        setStyle = {setKeyboardVisibility}
                        label = 'Password'
                        ref = {formRef}
                />
                
                <div className='flex justify-between mt-10 text-white font-black mb-20'>
                    <NavigationButton buttonType='left' handleButtonClick={handleButtonClick} />
                    <NavigationButton buttonType='right' handleButtonClick={handleButtonClick} />
                </div>
                <PageDotPointer dotCount={2} activeDot={1} />
            </form>
        </div>
        <div className={keyboardVisibility.concat(' ','sticky w-full bottom-0 px-0.5 pt-4 pb-4 z-10 bg-ios-kb-background text-center font-ios flex flex-col gap-3')}>
            {keyboard.current[keyboardMode].map((line, index) => 
                    <KeyLine 
                    key={uuidv4()}
                    line={line}
                    upper_case = {isUpperCase}
                    active_field = {focusedInput} 
                    aggregator = {setUserContent}
                    toggler = {setUpperCase}
                    size = {letterSize}
                    last = {keyboard.current[keyboardMode].length - 1 === index}
                    keyboardMode = {keyboardMode}
                />
            )}
            <SpaceLine 
                key={uuidv4()}
                aggregator = {setUserContent} 
                active_field = {focusedInput} 
                view={keyboardMode} 
                setView={setMode}
                size = {letterSize}
            />
        </div>
        <div className={isPrevModalOpen || isNextModalOpen ? '' : 'hidden'}>
            <Discard open={isPrevModalOpen} setOpen={setPrevModalOpen} userData={userData} />
            <RequirementsWarn open={isNextModalOpen} setOpen={setNextModalOpen} />
            {/* <RefreshWarn open={isRefreshModalOpen} setOpen={setRefreshModalOpen} path='/passcheck'/> */}
        </div>
    </div>   
 }

export default PasswordPage