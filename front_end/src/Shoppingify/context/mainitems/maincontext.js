import { createContext, useContext, useEffect, useReducer } from "react";
import { GET_ITEMS_LIST } from "../dispatchactions";
import {MainitemReducer} from './mainreducer';
import axios from '../../../utils/axios';
import toast from 'react-hot-toast';

const Mainitemcontext=createContext(null);
const useMainitem=()=>useContext(Mainitemcontext);
const Mainitemprovider=({children})=>{

const inital={
  items:[],
  loading:true,
  isMobile:false
};  

const [mainstate,dispatch]=useReducer(MainitemReducer,inital);

useEffect(()=>{
 // GET LIST OF ALL ITEMS /items
 
 const fetchItems=async ()=>{
   await axios.get(`${process.env.REACT_APP_URL}/shoppingify/items`).then(res=>
  
    dispatch({
      type:GET_ITEMS_LIST,
      payload:{
        loading:false,
        items:res.data.data
      } 
    })
    //console.log(res.data.data)
  ).catch((error)=>{
    toast.error(error.response.data.message);
  });
 }
 
 fetchItems();
 
},[]);



return (
  <Mainitemcontext.Provider value={{mainstate,dispatch}}>
    {children}
  </Mainitemcontext.Provider>
)
};


export {useMainitem,Mainitemprovider}