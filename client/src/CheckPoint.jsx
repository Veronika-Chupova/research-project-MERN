import icon_active from './assets/icons8-check-mark-32.png'
import icon_inactive from './assets/icons8-check-mark-32 copy.png'

function CheckPoint ({title, status}) {
    const style = status ? 'text-green-400 inline' : 'text-slate-400 inline'
    
    return <>
        <div className='flex gap-2 justify-left items-center text-sm font-light pointer-events-none'>
            <img className = 'inline w-4 h-4 pointer-events-none' alt={String(status)} src={status ? icon_active : icon_inactive}/>
            <p className={'pointer-events-none ' + style}>{title}</p>
        </div>
    </>
}

export default CheckPoint