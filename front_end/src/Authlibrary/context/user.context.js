import {useContext,useEffect,createContext,useState} from "react";
import jwt_decode from 'jwt-decode';

const usercontext=createContext(null);
const useUser=()=>useContext(usercontext);

const UserProvider=({children})=>{
    
    const [user,setuser]=useState({
        user:null,
        userID:null,
        email:null,
        profile:null
    });
   
    useEffect(()=>{
       if(localStorage.getItem("user-access")){
        console.log(`------->------->------->------->---`);
        setauth(localStorage.getItem("user-access"));
       };
    },[]);


    const setauth=async (payload)=>{
        console.log(`Decoding the token here.... `);
        let decodetoken=await jwt_decode(payload);

        console.log({user:decodetoken.user,
            userID:decodetoken.userID,
            email:decodetoken.email,
            profile:decodetoken.profile},decodetoken.exp*1000>Date.now())
       if(decodetoken.exp*1000>Date.now()){
        setuser({
        user:decodetoken.user,
        userID:decodetoken.userID,
        email:decodetoken.email,
        profile:decodetoken.profile
        });
        }else{
            localStorage.removeItem("user-access");
        }
    };

return(
    <usercontext.Provider value={{user,setauth}}>
        {children}
    </usercontext.Provider>
    )
};


export {UserProvider,useUser};