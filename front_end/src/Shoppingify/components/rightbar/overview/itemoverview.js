import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../../../../utils/axios";
import { ADD_ITEM_LIST, OVERVIEW_STATE } from "../../../context/dispatchactions";
import { useShoppinglist } from "../../../context/shoppinglist/shoppinglistcontext";

export const Itemoverview=()=>{
  const {state,dispatch_cart}=useShoppinglist();
  const [loading,setLoading]=useState(true);
  const [data,setData]=useState({category:null,_id:null,items:[{item:null,itemID:null,imageurl:"https://www.w3schools.com/css/lights600x400.jpg",description:null}]});
  
  useEffect(()=>{
    const fetchItems=async ()=>{
      await axios.post(`${process.env.REACT_APP_URL}/shoppingify/items/overview`,{
        categoryID:state.overview.categoryID,
        itemID:state.overview.itemID
      }).then(res=>{
       setData(res.data.data[0]);
       setLoading(false);
      }).catch((error)=>{
       toast.error(error.response.data.message);
     });
    }
    
    fetchItems();
  },[])
  
  return (
    <>
    <div className="flex items-center text-shop-orange font-medium mb-5" onClick={()=>dispatch_cart({type:OVERVIEW_STATE,payload:{
      status:false,
      categoryID:null,
      itemID:null
    }})}>
    <span className="material-icons tracking-wider text-xl mr-3">keyboard_backspace</span>
    <span className="text-xl">back</span>
    </div>
    <div className="rounded-3xl overflow-hidden">
     <img src={data.items[0].imageurl} className="w-full h-full" alt='none'/>
    </div>
    <div className="text-xl my-4 px-2">
    <span className="block text-shop-orange my-3 text-xl font-bold">name
    <p className="text-black font-bold text-2xl mt-1 opacity-90">{data.items[0].item}</p>
    </span>
    
    <span className="block text-shop-orange my-3 text-xl font-bold">category
    <p className="text-black font-semibold text-xl mt-1 opacity-90">{data.category}</p>
    </span>
    
    <span className="block text-shop-orange my-3 text-xl font-bold">note
    <p className="break-words text-black  mt-2 leading-6 font-normal">{data.items[0].description}</p>
    </span>
    </div>

    <div className="px-2 py-4 bg-transparent w-full sticky bottom-0 bg-shop-right-back">
        <div className="flex items-center justify-evenly font-bold text-lg">
            {/* <button className="px-4 py-3 rounded-xl tracking-wide capitalize">delete</button> */}
            <button type='submit' className="px-4 py-3 rounded-xl capitalize bg-shop-orange text-white" onClick={()=>dispatch_cart({type:ADD_ITEM_LIST,
              payload:{
                categoryID:data._id,
                itemID:data.items[0].itemID,
                item:data.items[0].item,
                category:data.category
              }})}>Add to list</button>
        </div>
    </div>
    </>
  );
};