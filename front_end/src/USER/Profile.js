import logoLight from '../Assets/devchallenges-light.svg';
import { useEffect, useState } from 'react';
import {ClipLoader} from 'react-spinners';
import validator from 'validator';
import axios from 'axios';
import { profileToast } from '../Toast/Alltoast';


export const Profilelogout=()=>{
  
    const[drop,setDrop]=useState(false);

return(
    <>
    <div className="flex items-center">
    <div className="flex items-center">
    <img src="https://cdn.pixabay.com/photo/2016/03/26/22/13/man-1281562_960_720.jpg" className="h-8 w-8  rounded object-cover" alt="not found" loading="lazy"/>
    <span className="hidden lg:block text-sm font-sans font-txt ml-4">Xanthe Neal</span>
    </div>
    <span className="material-icons cursor-pointer ml-2" onClick={()=>setDrop(!drop)}>{drop?`arrow_drop_down`:`arrow_drop_up`}</span>
    </div>
    {drop?
       <div className="top-14 z-[55] absolute right-4 lg:right-12  rounded-2xl bg-main border-2 border-authborder border-opacity-50 p-2 animate-topup">
       <div className="flex hover:bg-search  px-3  py-3 rounded-lg cursor-pointer">
       <span className="material-icons">account_circle</span>
       <span className="ml-3 font-sans font-semibold text-base">My Profile</span>
       </div>
       <div className="flex hover:bg-search px-3  py-2 rounded-lg cursor-pointer">
       <span className="material-icons">group</span>
       <span className="ml-3 font-sans font-semibold text-base">Group Chat</span>
       </div>
       <div className="flex hover:bg-search px-3  py-2 rounded-lg text-redlog cursor-pointer">
       <span className="material-icons">logout</span>
       <span className="ml-3 font-sans font-semibold text-base">Logout</span>
       </div>
     </div>
    :''}
</>
);
}

export const Profileview=({setEdit,data})=>{
    return (
        <>
<div className=' m-6 flex justify-between items-center gap-8'>
<div>
<span className='text-xl font-semibold'>Profile</span>
<p className='text-base leading-4 tracking-tighter my-2'>Some info may be visible to other people</p>
</div>
<button className='border-2 border-txtOpac rounded-xl px-8 text-base py-2' onClick={(e)=>{
    e.preventDefault();
    setEdit(prevState=>!prevState);
}}>Edit</button>
</div>

<div className=' m-6 flex items-center  justify-between  flex-1 gap-2'>
<span className='font-semibold text-sm flex-1'>PHOTO</span>
<div className='lg:flex-1'>
<img src={`${data.ProfileURL}`} className="h-20 w-20  rounded-xl object-cover" alt="not found" loading="lazy"/>
</div>
</div>
<hr className="opacity-50"/>
<div className='m-6 flex justify-between   items-center gap-2'>
<span className='font-semibold text-sm  lg:flex-1'>NAME</span>
<span className='text-base font-txt ml-2  lg:flex-1   text-txtOpac'>{`${data.Name}`}</span>
</div>
<hr className="opacity-50"/>
<div className='m-6 flex justify-between  items-center gap-2'>
<span className='font-semibold text-sm  lg:flex-1 '>BIO</span>
<span className='text-base font-txt ml-2 lg:flex-1  text-txtOpac'>{`${data.Bio||''}`}</span>
</div>
<hr className="opacity-50"/>
<div className='m-6 flex justify-between items-center gap-2'>
<span className='font-semibold text-sm lg:flex-1 '>EMAIL</span>
<span className='text-base font-txt ml-2  lg:flex-1 text-txtOpac'>{`${data.Email}`}</span>
</div>
<hr className="opacity-50"/>
<div className='m-6 flex justify-between  items-center gap-2'>
<span className='font-semibold text-sm lg:flex-1 '>PASSWORD</span>
<span className='text-base font-txt ml-2 lg:flex-1  text-txtOpac'>{`${data.Password|| ' '}`}</span>
</div>
</>
)
};


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
        let res_promise= axios.patch("http://localhost:5000/user/profile/update",formData,{
            headers:{
                'Content-Type': `multipart/form-data`
            }
        });
        //Create a toast based on promise
        profileToast(res_promise);

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
            console.log(`API request Sent ...`);
            console.log(obj); 
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





export const Profile=()=>{


    const [edit,setEdit]=useState(false);
    const [drop,setDrop]=useState(false);
     
    
    const [data,setData]=useState({
        Bio: null,
        Email: "example@gmail.com",
        Name: "PUBG",
        Password: null,
        ProfileURL: "https://lh3.googleusercontent.com/a/AATXAJzvCh6my3YVdaseB9vuPM8N3dVQxxZ861T4Flkp=s96-c",
        Phone:null
    });
    let {email}=JSON.parse(localStorage.getItem('user-access'));
    async function data_(){

        let userval_= await axios.get(`http://localhost:5000/user/profile`,{params:{email:email}});
        console.log(userval_);
        if(!userval_.data.redirect){
         setData(userval_.data.value);
        }else{
            window.location.href="/";
        }

    }
    
    useEffect(()=>{          
    data_();
    },[]);


    return (
    <div className="w-full min-h-screen bg-transparent box-border mx-auto text-txtOpac container ">
    <div className="flex items-center justify-between p-2">
    <img src={logoLight} alt="Not found"/>
     <Profilelogout/>
    </div>

    <div className='mx-auto  sm:w-1/2 my-4 Inner_section leading-4 tracking-tighter'>
     {edit?(

    <div className='flex items-center m-6 mt-0  cursor-pointer' onClick={(e)=>{
         e.preventDefault();
         setEdit(!edit); 
        }}>
     <span className="material-icons text-base text-sky">arrow_back_ios</span>
     <span className='font-normal text-sky ml-1'>Back</span>
     </div>
     ):<></>}

     {edit?(
     <>
     </>
     ):
     (
         <div className='text-center heading_section mt-12'>
         <span className='text-2xl font-semibold my-2 block'>Personal info</span>
         <p className='text-sm'>Basic info, like your name and photo</p>
         </div>
     )}
     <div className=' All_Component_section mt-8 sm:border border-txtOpac rounded-3xl overflow-hidden'>
     {edit?<Profileeditview data={data}/>:<Profileview setEdit={setEdit} data={data}/>}
     </div>

     </div>
    </div>

    );
};


