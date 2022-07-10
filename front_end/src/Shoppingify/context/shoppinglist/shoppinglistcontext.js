import { createContext, useContext, useEffect, useReducer } from "react";
import { shoppinglistreducer } from "./shoppinglistReducer";
import axios from "../../../utils/axios";

const Shoppinglistcontext=createContext(null);
const useShoppinglist=()=>useContext(Shoppinglistcontext);
const Shoppinglistprovider=({children})=>{

  
const inital={
  listStatus:'Active',
  listName:null,
  loading:false,
  items:[],
  modal:false,
  overview:{
    status:false,
    categoryID:null,
    itemID:null
  }
};

const [state,dispatch_cart]=useReducer(shoppinglistreducer,inital);

function alertreload(e){ 
  e.preventDefault();
  const message="Are you sure you want to leave? All provided data will be lost, please save before reloading ";
  e.returnValue = message;
 return message;
 };

useEffect(()=>{
     
   //Fetch data 
   const fetchItems=async ()=>{
    await axios.get(`${process.env.REACT_APP_URL}/shoppingify/list`).then(res=>console.log(res));
  }
  
  fetchItems();

    if(false){window.addEventListener("beforeunload",alertreload)}
    return ()=>{
     window.addEventListener("beforeunload",alertreload);
    };         

},[]);


return (
  <Shoppinglistcontext.Provider value={{state,dispatch_cart}}>
  {children}
  </Shoppinglistcontext.Provider>
)
};



export {Shoppinglistprovider,useShoppinglist};