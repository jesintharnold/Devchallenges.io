import { createContext, useContext, useEffect, useReducer } from "react";
import { shoppinglistreducer } from "./shoppinglistReducer";


const Shoppinglistcontext=createContext(null);
const useShoppinglist=()=>useContext(Shoppinglistcontext);


const Shoppinglistprovider=({children})=>{

const inital={
  listStatus:'active',
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