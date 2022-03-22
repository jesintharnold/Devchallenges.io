import {toast} from 'react-hot-toast';
import Image from '../../Assets/Imageupload.svg';


export const Uploadsection=({setUpload,setData})=>{

    const dragPrevent=(e)=>{
        e.preventDefault();
        e.stopPropagation();
    };
    

const dragDrop=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        let files=e.dataTransfer.files[0];
        let {type,size}=files;
        console.log(files);
        const supported_types=["image/jpeg","image/jpg","image/png"];
        if(supported_types.includes(type.toString())){
           if(parseInt(size)<1024*1024*4){
                setUpload(prevState=>({...prevState,uploading:true}));

                 setTimeout(()=>{
                    setUpload({uploaded:true,uploading:false});
                 },3000);

           }else{
                 toast.error("size limit exceeded !");
           }
        }else{
                toast.error("unsupported media type");
        }
    }


    return (
<div className="flex flex-col text-center justify-between">
                <div className="text-2xl mt-6 mb-3">Upload your image</div>
                <span className="block text-sm mb-4">File should be Jpeg, Png,...</span>
                <label onDrop={dragDrop} onDragOver={dragPrevent} onDragEnter={dragPrevent} onDragLeave={dragPrevent}   className="flex justify-center flex-col items-center w-full my-4 h-64 p-2 border-dashed border-2 rounded-2xl  border-sky">   
                  <img alt="Not found" src={Image} className="w-40 my-4 opacity-50"/>
                  <span className='block my-4 opacity-50'>Drag & Drop your image here</span>
                </label>
                <span className='my-2 text-lg block'>or</span>
                <label className='cursor-pointer block bg-sky self-center py-2 px-4 rounded-lg w-32'>
                    <span className='block'>Choose a file</span>
                    <input type="file" accept='image/jpeg,image/png' className='hidden' name="Image"/>
                </label>
                </div> 
    );
}


