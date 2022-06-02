import { createContext, useContext, useEffect, useReducer } from "react";
import { GET_ITEMS_LIST } from "../dispatchactions";
import {MainitemReducer} from './mainreducer';

const Mainitemcontext=createContext(null);
const useMainitem=()=>useContext(Mainitemcontext);
const Mainitemprovider=({children})=>{

const inital={
  items:[],
  loading:true
};  

const [state,dispatch]=useReducer(MainitemReducer,inital);

useEffect(()=>{

dispatch({
  type:GET_ITEMS_LIST,
  payload:{
    loading:false,
    items:[
        {category:"Fruit and vegetables",categoryID:"1000",items:[
        {name:"Avocodo",itemID:100},
        {name:"Banana",itemID:200},
        {name:"Bunch of carrots",itemID:300},
        {name:"Chicken",itemID:400},
        {name:"Pre-cooked corn",itemID:500}
      ]},
      {category:"Fruit and vegetables",categoryID:"1000",items:[
        {name:"Avocodo",itemID:100},
        {name:"Banana",itemID:200},
        {name:"Bunch of carrots",itemID:300},
        {name:"Chicken",itemID:400},
        {name:"Pre-cooked corn",itemID:500}
      ]}
    ]
  } 
});

},[]);



return (
  <Mainitemcontext.Provider value={{state,dispatch}}>
    {children}
  </Mainitemcontext.Provider>
)
};


export {useMainitem,Mainitemprovider}