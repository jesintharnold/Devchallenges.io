import {BarLoader} from 'react-spinners';

export const Progress=()=>{
    return(
        <div>
        <span className='text-lg font-semibold mt-1 text-white block tracking-wide leading-6'>Uploading...</span>    
        <div className='flex mt-6 mb-4 bg-load'>
        <BarLoader color='#2F80ED' width="100%" height={4}/>
        </div>          
        </div>
    );
}