import { Link } from 'react-router-dom';
import { useUser } from '../Authlibrary/context/user.context';
import appdata from './app.json';

export const Appoverview=()=>{
    const {user,_,Logout}=useUser();
return(
<div className="min-w-full min-h-screen h-0 relative bg-main box-border flex flex-col">
<div className='text-white text-2xl mx-10 sm:p-6 py-6 flex flex-col'>
    <span className='font-quick text-2xl sm:text-3xl'>{`Welcome, ${user.user}`}</span>
    <span className='text-xl text-center mt-3 px-2 border-2 border-gray-400 border-opacity-40 text-white rounded-lg w-fit cursor-pointer hover:scale-95' onClick={()=>Logout()}>Logout</span>
</div>
<div className='sm:ml-auto sm:mr-auto sm:mt-auto sm:mb-auto mt-10 px-8'>
<div className="relative px-4 py-8 bg-transparent shadow-lg sm:rounded-xl flex flex-col gap-4 bg-opacity-40 border-4 border-gray-400 " style={{backdropFilter: "blur(20px)"}}>
{
appdata.Apps.map(({name,url,icon},index)=>(
<Link to={`${url}`} className='flex items-center gap-4 text-lg text-center p-2 border-2 border-gray-400 border-opacity-40 text-white rounded-lg hover:scale-95' key={index}>
<span className="material-icons-outlined text-center font-light">{icon}</span>
<span className='font-quick'>{name}</span>
</Link>
))
}    
</div>
</div>

</div>
);

};

