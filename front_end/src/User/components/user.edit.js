import { useState } from 'react';
import toast from 'react-hot-toast';
import {ClipLoader} from 'react-spinners';
import validator from 'validator';
import axios from '../../utils/axios';

export const profiletoast=(promise)=>{
    return toast.promise(promise,{
        loading:'Saving...',
        success:({data})=>{
         let {error}=data;
         if(error.status){
            throw new Error(error.value); 
         }else{ 
            window.location.href="/profile"; 
            return <b>Profile updated </b>
         }
        },
        error:({response})=>{
           return <b>{response.data.message}</b>
        }
    });
    }

export const Profileeditview=({data})=>{
    const [load,setLoad]=useState(false);
    const [error,setError]=useState({
      Name:'',
      Bio:'',
      Phone:'',
      Email:'',
      Password:''
    });

   async function sentData(formData){
        let res_promise= axios.patch(`${process.env.REACT_APP_API_URL}/user/profile/update`,formData,{
            headers:{
                'Content-Type': `multipart/form-data`
            }
        });
        profiletoast(res_promise);
   }; 


    function profielform(e){
        let err={};
        e.preventDefault();
        setLoad(true);
        setTimeout(()=>{
            setLoad(false);
        },3000);
        const data_=new FormData(e.target);
        let obj=Object.fromEntries(data_.entries());
        data_.append("Email",data.Email);
        let passwordVal={
            minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
        };
        if(validator.isEmpty(obj.Name)){
           err.Name="please provide a name";
        };
        if(validator.isEmpty(obj.Bio)){
            err.Bio="provide a description";
        };
        if(validator.isMobilePhone(obj.Phone)===false){
            err.Phone="provide a valid phone number";
        };
        if(validator.isEmail(data.Email)===false){
            err.Email="provide a valid email";
        };
        if(!data.Password&&validator.isStrongPassword(obj.Password,passwordVal)){
            err.Password="provide a strong passprase";
        };
        setError({...err});
        if(!err.Name && !err.Bio && !err.Email && !err.Password && !err.Phone){
            sentData(data_);
        }
    }


    return (
        
        <div className='m-6'>
        <div>
        <span className='text-xl font-semibold'>Change Info</span>
        <p className='text-sm leading-4 tracking-tighter my-2'>Changes willl be reflected to every services</p>
        </div>
         
        <form onSubmit={profielform} encType="multipart/form-data">
        <div className='my-6 flex items-center gap-6'>
             <div className='w-16 h-16  overflow-hidden relative'>
             <img src={data.ProfileURL||"https://cdn.pixabay.com/photo/2016/03/26/22/13/man-1281562_960_720.jpg"} className="w-full h-full rounded object-cover" alt="not found" loading="lazy"/>
             <span className=" justify-center items-center top-0 hidden material-icons absolute w-full h-full">photo_camera</span>
             </div>
             <label className='text-sm outline-none border-2 px-3 rounded-xl py-2 bg-transparent block'>
             <span className='block'>{load?<ClipLoader size={20} color="#E0E0E0"/>:"CHANGE PHOTO"}</span>    
             <input type="file" accept="image/png, image/jpeg" name='Image' className='hidden' placeholder="CHANGE PHOTO"/>
             </label>
         </div>
             <div className='my-6 lg:my-4 relative'>
             <label htmlFor='Name' className='block my-4'>Name</label>
             <input type="text" name='Name' placeholder='Enter your name...' defaultValue={data.Name} className='w-full lg:w-3/5 outline-none border-2 border-txtOpac bg-transparent h-12 p-2 rounded-lg'/>
             </div>
             {error.Name?<span className='text-sm block -mt-5 lg:-mt-3  pl-4 text-red-700'>{error.Name}</span>:<></>}
             <div className='my-6 lg:my-4'>
             <label htmlFor='Bio' className='block my-4'>Bio</label>
             <textarea type="text" placeholder='Enter your bio...' name='Bio' defaultValue={data.Bio} className='w-full lg:w-3/5 outline-none border-2 border-txtOpac bg-transparent pt-4 resize-none  p-2 rounded-lg' maxLength={150} rows="5"/>
             </div>
             {error.Bio?<span className='text-sm block -mt-5 lg:-mt-3 pl-4 text-red-700'>{error.Bio}</span>:<></>}
             <div className='my-6 lg:my-4'>
             <label htmlFor='Phone' className='block my-4'>Phone</label>
             <input type="text" name='Phone' defaultValue={data.Phone} placeholder='Enter your phone...' className='w-full lg:w-3/5 outline-none border-2 border-txtOpac bg-transparent  p-2 h-12 pl-4 rounded-lg'/>
             </div>
             {error.Phone?<span className='text-sm block -mt-5 lg:-mt-3 pl-4 text-red-700'>{error.Phone}</span>:<></>}
             <div className='my-6 lg:my-4'>
             <label htmlFor='Email' className='block my-4'>Email</label>
             <div className='w-full items-center flex lg:w-3/5 outline-none border-2 border-txtOpac bg-transparent p-2 h-12 pl-4 rounded-lg'>{data.Email}</div>
             </div>
             {error.Email?<span className='text-sm block -mt-5 lg:-mt-3 pl-4 text-red-700'>{error.Email}</span>:<></>}
             <div className='my-6 lg:my-4'>
             <label htmlFor='Password' className='block my-4'>Password</label>
             <input type="password" disabled={data.Password} defaultValue={data.Password?null:""} placeholder='Enter your new password...' name='Password' className={`w-full lg:w-3/5 outline-none border-2  p-2 bg-transparent h-12 pl-4 rounded-lg ${data.Password?'border-disable-txt':'border-txtOpac'}`}/>
             </div>
             {error.Password?<span className='text-sm block -mt-5 lg:-mt-3 pl-4 text-red-700'>{error.Password}</span>:<></>}
             <button disabled={load} type='submit' className='mt-8 cursor-pointer rounded-lg bg-sky flex justify-center items-center text-center font-semibold text-base py-2 ml-2 px-5 flex-shrink-0'>{load?<ClipLoader color='#FFFFF' size={25}/>:"Save"}</button>
         </form>
         </div>
    )
};