import {ClipLoader} from 'react-spinners';
import {useState} from'react';
import toast from 'react-hot-toast';

export const Preview=({data})=>{
    const [load,setLoad]=useState(true);

    const copyLink=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText("Copid bro");
        toast.success(<b>link copied !</b>);
  };


    return(
    <div className="flex flex-col text-center justify-between box-border">
        <span class="material-icons text-greentick text-3xl">check_circle</span>
        <span className="block text-xl font-semibold mt-2 mb-3">Uploaded Successfully!</span>

        <div className={`w-full h-64 relative my-4 bg-transparent rounded-xl overflow-hidden flex justify-center items-center`}>
            {load?<div className='absolute'><ClipLoader size={40} color="#2F80ED"/></div>:''}
            <img onLoad={(e)=>{e.preventDefault(); setLoad(false);}} alt="Not found" src="https://unsplash.com/photos/XtWS2HX4Z6k/download?ixid=MnwxMjA3fDB8MXxhbGx8MTN8fHx8fHwyfHwxNjQ3ODgwMjU2&force=true" className={`object-cover w-full h-full  ${load ? 'hidden' :'animate-accord'}`}/>
        </div>

        <div className='border-[1px] flex-nowrap flex box-border p-1 rounded-lg overflow-hidden items-center justify-between'>
            <p className='ml-1 mr-2 text-base  overflow-hidden whitespace-nowrap'>https://imageccccccccccccccccccsphoto-aaaaaaaaaaaaaaaaaaaa</p>
            <button className='py-2 flex-shrink-0 active:scale-95 self-center px-2 font-semibold text-xs sm:text-sm bg-sky rounded-md' onClick={copyLink}>
            Copy Link
            </button>
        </div>
    </div>
    );
}