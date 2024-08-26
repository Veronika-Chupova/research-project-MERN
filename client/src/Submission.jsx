import ReactDOM from 'react-dom'
import {useNavigate} from 'react-router-dom'

function Submission ({ open, setOpen, submitData }) {
    const navigate = useNavigate()

    if (!open) {
        return <></>
    }

    function handleConfirmation (event) {
        setOpen(false)
        submitData(event)
    }

    function handleCancel () {
        setOpen(false)
    }

    return ReactDOM.createPortal(
        <>
            <div className='fixed inset-0 bg-black opacity-60 z-1000'>
            </div>
            <div className='fixed left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 bg-white inline-block w-10/12 h-fit z-1000 p-5 rounded text-center text-sm'>
                <h3 className='font-bold text-lg'>Confirmation</h3>
                <div className='text-left font-light text-sm mt-2 mb-4'>
                    <p>After submission, the password and the PIN code you provided will be collected for the research in plain text. It will be impossible to attribute and withdraw your data after submission.</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <button onClick={handleCancel} className = 'w-28 h-8 bg-red-500 rounded text-white inline text-base font-semibold' type='button'>Cancel</button>
                    <button onClick={handleConfirmation} className = 'w-28 h-8 bg-green-500 rounded text-white inline text-base font-semibold' type='button'>Confirm</button>
                </div>
            </div>
        </>, document.getElementById('portal')
    )
}

export default Submission