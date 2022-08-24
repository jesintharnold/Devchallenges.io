import React from "react";
import {Redirect,useParams,Route,useHistory,Navigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useUser } from "./context/user.context";

export function LoginProtect({Comp,...rest}){
    let token=localStorage.getItem("user-access");
    const {user}=useUser();
    const {userID}=user;
    const contextvalue=userID!==null&&userID!==undefined;
    return <Route {...rest} render={
        props=>{
        if(token&&contextvalue){
            return <Redirect to="/"/>
        }else{
            return <Comp/>
        }}
    }/>

}

export function Notfound(){
    if(localStorage.getItem("user-access")){
        console.log("Rendering - Not Found");
      return <Redirect to="/" />
     }else{
         return <Redirect to="/login"/>
     }
}

export function AuthRedirect(){
    
    let {id_token}=useParams();
    const {user,setauth}=useUser();
      console.log(id_token); 


    try{
        localStorage.setItem("user-access",id_token);
        setauth(id_token);
        
        if(id_token.trim()!==""){
            return <Redirect to="/" />
           }else{
            document.getElementById("root").remove();
            return <Redirect to="/login"/>
           }
    }catch(e){
        console.log(e);
    }
}


export function Logout(){
    localStorage.removeItem("user-access");
    window.location.href="/login";
}

export const PrivateRoute=({Comp,...rest})=>{
    const {user}=useUser();
    const {userID}=user;
    const contextvalue=userID!==null&&userID!==undefined;
    return <Route {...rest} render={
    props=>contextvalue?<Comp/>:<Redirect to="/login"/>
    }/>
};
