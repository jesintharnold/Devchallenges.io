import { createContext, useContext, useEffect, useReducer } from "react";
import { shoppinglistreducer } from "./shoppinglistReducer";


const Shoppinglistcontext=createContext(null);
const useShoppinglist=()=>useContext(Shoppinglistcontext);


const Shoppinglistprovider=({children})=>{

const inital={
  listStatus:'active',
  listName:null,
  loading:false,
  items:[]
}

const [state,dispatch_cart]=useReducer(shoppinglistreducer,inital);

useEffect(()=>{

// check and delete in local Storage 
// Get the data
// Set Again


},[]);


return (
  <Shoppinglistcontext.Provider value={{state,dispatch_cart}}>
  {children}
  </Shoppinglistcontext.Provider>
)
};



export {Shoppinglistprovider,useShoppinglist};