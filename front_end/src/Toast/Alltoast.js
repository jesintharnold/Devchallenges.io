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
        if(err.response.status===400){
            return <b>{err.response.data.error.value}</b>
        }else{
            return <b>{err.message}</b>
        }
        
    }
});
}

