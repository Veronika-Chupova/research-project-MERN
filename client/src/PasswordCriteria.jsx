import CheckPoint from "./CheckPoint"
import {v4 as uuidv4} from 'uuid'

function PasswordCriteria ({ criteria }) {

    return <>
        <h5 className='text-sm font-light mb-2 pointer-events-none'>Your password must satisfy the criteria</h5>
        <div className='flex flex-col gap-1 mb-6 pointer-events-none'>
            {criteria.map(element => 
                <CheckPoint key={uuidv4()} title={element.title} status={element.control}/>
                )
            }
        </div>
    </>
}

export default PasswordCriteria