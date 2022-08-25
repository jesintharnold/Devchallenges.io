import {useState} from'react';
import {Preview} from './components/preview';
import {Progress} from './components/progress';
import {Uploadsection} from './components/upload';
import {LogoutComp} from '../utils/components/LogoutComp'
import logoLight from '../Assets/devchallenges-light.svg';
import { Link } from 'react-router-dom';

export const Imageupload=()=>{
 
    const [upload,setUpload]=useState({
        uploading:false,
        uploaded:false
    });
    
    const [data,setData]=useState({
        id:null,
        url:null
    });

    return (
        <div className="w-full min-h-screen bg-transparent flex flex-col justify-center box-border">     
        <div className="py-2 pl-2 mb-5 flex items-center justify-between px-8 ">
        <Link to="/imageuploader">
        <img className='w-28 h-12 scale-110' src={logoLight} alt="Cat-Wiki"/>
        </Link>
        <div className='flex items-center text-white font-quick text-lg font-bold'>
        <LogoutComp bottom={false}/>
        </div>
</div>

        <div className="w-full border-2 ml-auto mr-auto mt-auto mb-auto rounded-2xl border-transparent sm:border-authborder p-5 sm:w-1/2 xl:w-1/3 text-white">      
                {!upload.uploading && !upload.uploaded &&<Uploadsection setUpload={setUpload} setData={setData}/>} 
                {upload.uploading && <Progress/>}
                {upload.uploaded && !upload.uploading && <Preview data={data}/>}
        </div>
    </div>
    )
};