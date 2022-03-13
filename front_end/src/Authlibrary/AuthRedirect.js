import React from "react";
import {Redirect,useParams,Route,useHistory} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export function LoginProtect({Comp,...rest}){
    let val=localStorage.getItem("user-access");

    return <Route {...rest} render={
        props=>{
        if(val){
            return <Redirect to="/"/>
        }else{
            return <Comp/>
        }}
    }/>

}

export function Notfound(){
    if(localStorage.getItem("user-access")){
      return <Redirect to="/" />
     }else{
         return <Redirect to="/login"/>
     }
}

export function AuthRedirect(){
    console.log("Redirect Method is called");
    let {id_token,id}=useParams();
    console.log(id_token);
    try{
        let param=jwt_decode(id_token);
        let payload={
            Token:id_token,
            Id:id,
            ...param
        }
        console.log(payload);
        localStorage.setItem("user-access",JSON.stringify(payload));

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
    let val=localStorage.getItem("user-access");
    console.log(val);
    let history=useHistory();
    return <Route {...rest} render={
        props=>{
        if(val){
            console.log(`Calling this Method`);
            return <Comp/>
        }else{
            history.replace({
                pathname:"/login",
                state:{isActive: true}
            });
            return <Redirect to="/login"/>
        }}
    }/>
};