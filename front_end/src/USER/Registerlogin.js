import logoLight from '../Assets/devchallenges-light.svg';
import google from '../Assets/Google.svg';
import github from '../Assets/Gihub.svg';
import facebook from '../Assets/Facebook.svg';
import {ClipLoader} from 'react-spinners';
import { useRef, useState } from 'react';
import validator from 'validator';
import { googleOauth,githubOauth,facebookOauth} from '../Authlibrary/OauthService';
import axios from 'axios';



const icon_list=[
    {
     "Path":google,
     "Name":"GO",
     "Func":googleOauth()    
    },
    {
       "Path":facebook,
       "Name":"FA",
       "Func":facebookOauth()    
   }
   ,
   {
      "Path":github,
      "Name":"GI",
      "Func":githubOauth()   
   }
] 


// ,
//    {
//      "Path":twitter,
//      "Name":"TI",
//      "Func":twitterOauth()    
//    }


export const Auth=()=>{

    const Authref=useRef(null);
    const [load,setload]=useState(false);
    const [login,setLogin]=useState(true);
    const [error,setError]=useState({
        Email:'',
        Password:''
    });
    
  
    

    async  function Authsubmit(e,payload){
        e.preventDefault();
        
        let err={Email:'',Password:''};
        let passwordVal={
            minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
        };
        const data=new FormData(e.target);
        let obj=Object.fromEntries(data.entries());
        console.log(validator.isEmail(obj.Email))
        if(validator.isEmpty(obj.Email) && validator.isEmail(obj.Email)===false){
            err.Email="provide a valid email";
        }
        if(validator.isEmpty(obj.Password) && validator.isStrongPassword(obj.Password,passwordVal)===false){
            err.Password="provide a strong passprase"
        }
        
        setError({...err});


        if(validator.isEmpty(err.Password) && validator.isEmpty(err.Email)){
            setload(true);
            console.log(`API request Sent to user`);
            let url=`http://localhost:5000/api/auth/${login?'login':'register'}`;
            console.log(url);

            await axios.post(`${url}`,obj).then((data_)=>{
                
                let {status,data}=data_;
                let {access_token,_id,error}=data;

                
           
                if(access_token==null&&error.status===true&&status==200){
                    console.log(`This is 200 - some Error`);
                    setError({...err,...{Email:error.email,Password:error.password}});
                }


                if((status==201||status==200)&&error.status===false){
                    console.log(`This is 201`);
                   window.location.href=`/login/auth/${access_token}/${_id}`
                }
                if(status==302){
                    window.location.href=`/login`
                }
                setload(false);
            });
        }
    };

    return (
        <div className="w-full min-h-screen bg-transparent flex justify-center sm:items-center box-border ">
               <div className="w-full border-2 rounded-2xl border-transparent sm:border-authborder p-5 sm:w-1/2 xl:w-1/3">               
               <div className="flex items-center justify-between">
               <img src={logoLight} alt="Not found" className="w-[160px] h-8 block" loading="lazy"/>
               </div>
               <div className='mt-12 md:mt-8'>               
               {login?
               (<>
               <p className='block text-2xl mt-4 mb-10 leading-6 text-txtOpac font-semibold'>Login</p>
               </>):(
                   <>
                   <p className="text-2xl my-4 tracking-tighter leading-6 text-txtOpac font-semibold">Join thousands of learners from <br/> around the world </p> 
                   <p className='text-lg  my-6 tracking-tighter leading-5 text-txtOpac'>Master web development by making real-life projects. There are multiple paths for you to choose</p>
                   </>
               )}
               <form className='mt-8 mb-1 w-full' ref={Authref} onSubmit={Authsubmit}>
               <div className="text-authborder flex bg-transparent mt-4 mb-1  items-center border-2 p-2 rounded-lg gap-3 border-txtOpac border-opacity-70">
               <span className="material-icons">email</span>
               <input type="email" className="outline-none p-0 w-0 h-8 flex-1 bg-transparent" name="Email" placeholder="Email"/>
               </div>
               <span className='text-sm block pl-4 text-red-700'>{error.Email===null?'':error.Email}</span>
               <div className="text-authborder flex bg-transparent mt-4 mb-1 items-center border-2 p-2 rounded-lg gap-3 border-txtOpac border-opacity-70">
               <span className="material-icons">lock</span>
               <input type="password" className="outline-none p-0 w-0 h-8 flex-1 bg-transparent" name="Password" placeholder="Password"/>
               </div>
               <span className='text-sm pl-4 block text-red-700'>{error.Password===null?'':error.Password}</span>
               <button disabled={load} className="my-6 flex items-center justify-center py-2 rounded-lg bg-sky w-full  text-base tracking-tight leading-6 text-white font-semibold">{load?<ClipLoader color="#FFFFF" size={20}/>:(login?"Login":"Start coding now") }</button>    
               </form>
               <p className='text-center text-base text-authborder'>or continue with these social profile</p>
               <div className='flex justify-center gap-6 my-8'>
                   {icon_list.map((data,index)=>(
                       <a className="box-border"  key={index} href={data.Func} onClick={(e)=>{
                           console.log(data.Name);
                       }}><img src={data.Path} className="w-full h-full" alt={`${data.Name}`}/></a>
                   ))}
               </div>
               <p className='text-center text-base text-authborder'>{login?("Don't have an account yet ? "):"Already a member ? "}<span className='text-sky' onClick={(e)=>setLogin(!login)}>{login?"Register":"Login"}</span></p>
               </div>  
              </div>
        </div>
    )
}

