function NotNewUser () {
    return <div className='mt-40 text-center px-10'>
        <h3 className='text-2xl text-violet-500'>You have already participated in the researh!</h3>
        {/* <img src={candy} className='inline-block w-1/4 h-auto mt-10'/> */}
        <h5 className='mt-10 text-lg '>Your data was successfully collected last time you visited this website. Thank you!</h5>
    </div>
}

export default NotNewUser