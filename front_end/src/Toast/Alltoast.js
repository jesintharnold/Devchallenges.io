import {toast} from 'react-hot-toast';


export const profileToast=(promise)=>{
return toast.promise(promise,{
    loading:'Saving...',
    success:(data)=>{
     let {error}=data.data;
     if(error.status){
        throw new Error(error.value); 
     }else{ 
        window.location.href="/profile"; 
        return <b>Profile updated !</b>
     }
    },
    error:(err)=>{
        return <b>{err.message}</b>
    }
});
}

