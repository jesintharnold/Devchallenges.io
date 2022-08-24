import {useState} from "react";
import {Link} from 'react-router-dom';
import { useUser } from "../../Authlibrary/context/user.context";

function Logoutchat(){
    const [drop,setDrop]=useState(false);
    const {user,_,Logout}=useUser();
    return (
        <>
        <div className="flex z-50 items-center pb-2 pt-3 px-4 justify-between absolute min-w-full bottom-0 bg-blk">
        <div className="flex items-center">
        <img src={`${user.profile}`} className="h-10 w-10  rounded object-cover" alt="not found" loading="lazy"/>
        <span className="text-lg font-sans font-txt ml-6 capitalize">{`${user.user}`}</span>
        </div>
        <span className="material-icons-outlined cursor-pointer  rounded hover:bg-gray-500" onClick={()=>setDrop(prev=>!prev)}>{drop?`expand_less`:`expand_more`}</span>
        </div>
        {drop?
           <div className="bottom-11 z-[55] absolute right-8  rounded-2xl bg-main p-2 animate-popup">
           <Link to="/" className="flex hover:bg-search px-1 py-2 rounded-lg cursor-pointer">
           <span className="material-icons">apps</span>
           <span className="ml-2 font-sans font-medium">Apps</span>
           </Link>
           <Link className="flex hover:bg-search px-1 py-2 rounded-lg text-redlog cursor-pointer" onClick={()=>Logout()}>
           <span className="material-icons-outlined">logout</span>
           <span className="ml-2 font-sans font-medium">Logout</span>
           </Link>
         </div>
        :''}
</>

    )
}

export default Logoutchat;