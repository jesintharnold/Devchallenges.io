import { createContext, useContext, useEffect, useReducer } from "react";
import { GET_ITEMS_LIST } from "../dispatchactions";
import {MainitemReducer} from './mainreducer';
import axios from '../../../utils/axios';

const Mainitemcontext=createContext(null);
const useMainitem=()=>useContext(Mainitemcontext);
const Mainitemprovider=({children})=>{

const inital={
  items:[],
  loading:true,
  renderagain:false
};  

const [state,dispatch]=useReducer(MainitemReducer,inital);

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
  );
 }
 
 fetchItems();
 
},[state.renderagain]);



return (
  <Mainitemcontext.Provider value={{state,dispatch}}>
    {children}
  </Mainitemcontext.Provider>
)
};


export {useMainitem,Mainitemprovider}