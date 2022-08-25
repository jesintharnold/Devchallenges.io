import logoLight from '../Assets/devchallenges-light.svg';
import { useEffect, useState } from 'react';
import { useUser } from '../Authlibrary/context/user.context';
import axios from '../utils/axios';
import {LogoutComp} from '../utils/components/LogoutComp';
import { Profileeditview } from './components/user.edit';
import { Profileview } from './components/user.profile';
import toast from 'react-hot-toast';

export const Profile=()=>{

    const [edit,setEdit]=useState(false);
    const {user,_,Logout}=useUser();
     
    const [data,setData]=useState({
        Bio: null,
        Email: "Email@gmail.com",
        Name: "Your Name",
        Password: null,
        ProfileURL: "https://lh3.googleusercontent.com/a/AATXAJzvCh6my3YVdaseB9vuPM8N3dVQxxZ861T4Flkp=s96-c",
        Phone:null
    });
    async function getProfileInfo(){
        await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`,{params:{email:user.email}}).then(({data})=>{
            if(data.redirect===false){
                setData(data.value);
            };
        }).catch(({response})=>{
            if(response.data.name.includes("ItemNotFound")){
                  toast.error(`${response.data.message}`);
            }else{
                window.location.href="/";
            }
        });
    }
    useEffect(()=>{          
        getProfileInfo();
    },[]);


    return (
    <div className="w-full min-h-screen bg-transparent box-border mx-auto text-txtOpac container ">
    <div className="flex items-center justify-between p-2">
    <img src={logoLight} alt="Not found"/>
    <div className="flex items-center gap-4">
      <LogoutComp bottom={false}/>
    </div>
    
    </div>
    <div className='mx-auto  sm:w-1/2 my-4 Inner_section leading-4 tracking-tighter'>
    {
    edit?(
    <div className='flex items-center m-6 mt-0  cursor-pointer' onClick={(e)=>{e.preventDefault();setEdit(prev=>!prev);}}>
    <span className="material-icons text-base text-sky">arrow_back_ios</span>
    <span className='font-normal text-sky ml-1'>Back</span>
    </div>
     ):
     <></>
    }

    {
    edit?(<></>):(
    <div className='text-center heading_section mt-12'>
    <span className='text-2xl font-semibold my-2 block'>Personal info</span>
    <p className='text-sm'>Basic info, like your name and photo</p>
    </div>
    )}
    <div className=' All_Component_section mt-8 sm:border border-txtOpac rounded-3xl overflow-hidden'>
    {
    edit?
    <Profileeditview data={data}/>:
    <Profileview setEdit={setEdit} data={data}/>
    }
    </div>
    </div>
    </div>
    );
};


