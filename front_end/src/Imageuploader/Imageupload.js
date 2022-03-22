import {useState} from'react';
import {Preview} from './components/preview';
import {Progress} from './components/progress';
import {Uploadsection} from './components/upload';

export const Imageupload=()=>{
 
    const [upload,setUpload]=useState({
        uploading:false,
        uploaded:false
    });
    
    const [data,setData]=useState();

    return (
        <div className="w-full min-h-screen bg-transparent flex justify-center sm:items-center box-border">     
        <div className="w-full border-2 rounded-2xl border-transparent sm:border-authborder p-5 sm:w-1/2 xl:w-1/3 text-white">      
                {!upload.uploading && !upload.uploaded &&<Uploadsection setUpload={setUpload} setData={setData}/>} 
                {upload.uploading && <Progress/>}
                {upload.uploaded && !upload.uploading && <Preview data={data}/>}
        </div>
    </div>
    )
};