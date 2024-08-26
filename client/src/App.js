import {Route, Routes } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import './App.css'
import StartPage from './StartPage'
import PasswordPage from './PasswordPage'
import PinPage from './PinPage'
import FinishPage from './FinishPage'
import WrongDevicePage from './WrongDevicePage'
import NotFoundPage from './NotFoundPage'
import NotNewUser from './NotNewUser'
import setKeyboard from './keyboard'
import setNumboard from './numboard'

function App({ isNewUser }) {
  const userDevice = navigator.userAgent
  const userConsent = useRef ({
    age: null,
    participantInfo: null,
    termsOfUse: null,
  })
  const userData = useRef ({
    pwd: '',
    pin: ''
  })
  const userLog = useRef([])
  const keyboard = useRef (setKeyboard())
  const numboard = useRef (setNumboard())
  const isMobile = /Android|iPhone/i.test(userDevice)
  

  useEffect (() => {
    const now = Date.now()
    userLog.current.push({'initialisation': now})
  }, [])

  useEffect (() => {

  })
  
  function handleSubmission (event) {
        event.preventDefault()
        const time = Date.now()
        const fullConsent = Boolean(userConsent.current?.age) && Boolean(userConsent.current?.participantInfo) && Boolean(userConsent.current?.termsOfUse)
        userLog.current.push({'subtit button is pressed': time})
        let submissionStatus = null

          if (userData.current?.pwd.length>0 && userData.current?.pin.length>0 && fullConsent) {
            fetch('https://research-project-main-7b7d74af6ebc.herokuapp.com/submission', {
                method: 'POST',
                headers: {"Content-type" : "application/json"},
                body: JSON.stringify({
                  userDevice: userDevice,
                  userConsent: userConsent.current,
                  userData: userData.current, 
                  keyboard: keyboard.current, 
                  numboard: numboard.current, 
                  userLog: userLog.current}),
                credentials: 'include'
            }).then((res) => {
              submissionStatus = 'ok'
              localStorage.setItem('visit', Date.now())
            }).catch(error => {
              console.log('Posting went wrong!')
            })
        } else {
            submissionStatus = 'data problem'
        }
        return submissionStatus
  }
  
  return <>
    <Routes>
      <Route 
        path='/' 
        element={(isMobile && isNewUser) ? 
          <StartPage currentConsent={userConsent} userLog={userLog}/> : 
          (isNewUser ? 
            <WrongDevicePage /> :
            <NotNewUser />
          )}
      />

      <Route path='/passcheck' element = {
        <PasswordPage userData={userData} keyboard={keyboard} userLog={userLog}/>
      }/>

      <Route path='/pincheck' element = {
        <PinPage 
          userData={userData} 
          keyboard={numboard} 
          submitData={handleSubmission} 
          userLog={userLog} 
          consent={userConsent}/>
      }/>

      <Route path='/complete' element = {<FinishPage userLog={userLog}/>}/>

      <Route path='*' element= {<NotFoundPage />} />
    </Routes>
  </>
}

export default App
