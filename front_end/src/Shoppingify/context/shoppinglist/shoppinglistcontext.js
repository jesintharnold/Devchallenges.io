import { createContext, useContext, useEffect, useReducer } from "react";
import { shoppinglistreducer } from "./shoppinglistReducer";
import axios from "../../../utils/axios";
import { GET_ITEMS_LIST } from "../dispatchactions";
import toast from 'react-hot-toast';



const Shoppinglistcontext=createContext(null);
const useShoppinglist=()=>useContext(Shoppinglistcontext);
const Shoppinglistprovider=({children})=>{

  
const inital={
  listStatus:'Active',
  listName:null,
  listID:null,
  loading:true,
  items:[],
  modal:false,
  overview:{
    status:false,
    categoryID:null,
    itemID:null
  },
  isMobile:false
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
    await axios.get(`${process.env.REACT_APP_URL}/shoppingify/list`).then((res)=>{
        toast.success("Cart fetched");
        dispatch_cart({type:GET_ITEMS_LIST,
          payload:{
            listStatus:res.data.data[0].status,
            listName:res.data.data[0].name|| null,
            loading:false,
            listID:res.data.data[0]._id,
            items:res.data.data[0].list
          }});
      
    }).catch((error)=>{
      toast.error(error.response.data.message);
      dispatch_cart({type:GET_ITEMS_LIST,
        payload:{
          loading:false
        }});
    })
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