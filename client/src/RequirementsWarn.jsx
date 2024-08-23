import ReactDOM from 'react-dom'

function RequirementsWarn ({ open, setOpen }) {

    if (!open) {
        return <></>
    }

    function handleOkButton () {
        setOpen(false)
    }

    return ReactDOM.createPortal(
        <>
            <div className='fixed inset-0 bg-black opacity-60 z-1000'>
            </div>
            <div className='fixed left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 bg-white inline-block w-10/12 h-fit z-1000 p-5 rounded text-center text-sm'>
                <div className='text-left font-light text-sm my-4'>
                    <p>Please ensure your password satisfies all criteria.</p>
                </div>
                <div className='flex flex-row justify-center'>
                    <button onClick={handleOkButton} className = 'w-28 h-8 bg-red-500 rounded text-white inline text-base font-semibold' type='button'>OK</button>
                </div>
            </div>
        </>, document.getElementById('portal')
    )
}

export default RequirementsWarn