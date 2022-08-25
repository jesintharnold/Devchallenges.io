import {useState} from "react";
import {Link} from 'react-router-dom';
import { useUser } from "../../Authlibrary/context/user.context";

export const LogoutComp=({bottom,bg=true})=>{
    const [drop,setDrop]=useState(bottom);
    const {user,_,Logout}=useUser();
    return (
        <>
        <img src={`${user.profile}`} className="h-10 w-10  rounded object-cover justify-self-start" alt="not found" loading="lazy"/>
        <div className="flex items-center relative w-full gap-4 justify-around ml-6">
        <span className={`text-lg font-sans font-txt capitalize max-w-[12rem] ${bottom?'block':'hidden lg:block'}`}>{`${user.user}`}</span>
        {drop?
           <div className={`${bottom?"bottom-14 animate-popup":"top-14 animate-topup border-2 border-authborder border-opacity-50"} z-[55] absolute right-0 ${bg?"bg-main":'bg-white bg-opacity-75'}  rounded-2xl p-2`}>
           <Link to="/" className={`flex  px-1 py-2 rounded-lg cursor-pointer ${bg?'hover:bg-search':'hover:bg-gray-200'}`}>
           <span className="material-icons">apps</span>
           <span className="ml-2 font-sans font-medium">Apps</span>
           </Link>
           <Link className={`flex px-1 py-2 rounded-lg text-redlog cursor-pointer ${bg?'hover:bg-search':'hover:bg-gray-200'}`} onClick={()=>Logout()}>
           <span className="material-icons-outlined">logout</span>
           <span className="ml-2 font-sans font-medium">Logout</span>
           </Link>
         </div>
        :''}
        <span className="material-icons-outlined cursor-pointer rounded hover:bg-gray-500" onClick={()=>setDrop(prev=>!prev)}>{drop?`expand_less`:`expand_more`}</span>
        </div>
   </>
    )
}
