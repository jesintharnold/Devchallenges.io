import React from "react";
import {Redirect,useParams,Route} from 'react-router-dom';
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


export function AuthRedirect(){
    
    let {id_token}=useParams();
    const {_,setauth,Logout}=useUser();
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

export const PrivateRoute=({Comp,...rest})=>{
    const {user}=useUser();
    const {userID}=user;
    const contextvalue=userID!==null&&userID!==undefined;
    return <Route {...rest} render={
    props=>contextvalue?<Comp/>:<Redirect to="/login"/>
    }/>
};
