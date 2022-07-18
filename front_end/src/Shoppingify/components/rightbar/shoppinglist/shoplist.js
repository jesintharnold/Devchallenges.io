import { useState } from 'react';
import bottle from '../../../../Assets/bottle.svg'
import {useShoppinglist} from '../../../context/shoppinglist/shoppinglistcontext';
import {ADD_ITEM_LIST,DECR_ITEM_LIST,DELETE_ITEM_LIST,CHECK_ITEM_LIST,LIST_STATUS_LIST,MODAL_STATE, GET_ITEMS_LIST} from '../../../context/dispatchactions';
import {ClipLoader} from 'react-spinners';
import {Modal} from '../../modal/modal';
import axios from '../../../../utils/axios';
import toast from 'react-hot-toast';
import {useMobile} from '../../../../Hooks/useMobile';

export const List=({setAdditem})=>{
  const [edit,setEdit]=useState(false);
  const {state,dispatch_cart}=useShoppinglist();
  const [name,setName]=useState();
  const mobile=useMobile();



  async function savelist(pay){
    await axios.put(`${process.env.REACT_APP_URL}/shoppingify/list`,{
      "cartID":state.listID,
      "listname":state.listName,
      "status":pay,
      "list":state.items
      }).then((res)=>{
        if(res.data.data.update){
          dispatch_cart({type:GET_ITEMS_LIST,
            payload:{
              listStatus:"Active",
              listName:null,
              loading:false,
              listID:null,
              items:[]
            }});
          
          toast.success('Cart saved successfully');  
        }else{
          toast.error('Unknown error - saving Cart');
        }
      }).catch((error)=>{
        toast.error(error.response.data.message);
      });
  }
  
return (
  <>
  <div className={`w-full flex flex-col flex-shrink-0 gap-2 h-full ${mobile?"px-2":''}`}>
  <div className="bg-shop-bottle-bg w-full h-25 rounded-2xl items-center justify-evenly flex flex-row">
  <img src={bottle} alt="Bottle" className='block h-[105%] -translate-y-5 flex-shrink-0'/>
  <div className='block float-right mb-2 mx-2'>
    <span className={`font-quick text-left block leading-5 my-4 tracking-normal text-white ${mobile?'text-xl':'text-lg'}`}>Didn’t find what you<br></br> need?</span>
    <button className='bg-white text-black text-sm px-3 py-1 rounded-md' onClick={()=>setAdditem(prev=>!prev)}>Add item</button>
  </div>
 </div>
 
<div className='w-full px-2 flex-auto overflow-y-scroll scroll-hide'>
{state.loading?<div className='w-full bg-transparent mt-[50%] text-center'><ClipLoader color="#F9A109" css={{borderWidth:'5px',top:"20%"}} loading={state.loading} size={50}/></div>:(
   <>
   <div className='flex flex-row justify-between text-lg w-full mt-2 mb-2'>
     <span className='block font-bold'>{state.listName??`Shopping list`}</span>
     <span class="material-icons block cursor-pointer" onClick={()=>setEdit(prevState=>!prevState)}>edit</span>
   </div>
   
   {state.items.map(({category,items,categoryID},index)=>(
   <div className='p-0 mb-2 last:mb-28 inline-block w-full'  key={`CA-${index}`}>
   <div className='text-base text-caert mb-2'>{category}</div>
   {items.map(({item,quantity,itemID,checked},i)=>(
     <div className='w-full flex  flex-row items-center mb-2 gap-6' key={`Item-${i}`}>
    {edit?"":<input type="checkbox" checked={checked} onChange={()=>dispatch_cart({type:CHECK_ITEM_LIST,
              payload:{
                categoryID:categoryID,
                itemID:itemID
              }})}/>}  
    <span className='flex flex-1 flex-row flex-nowrap flex-shrink-0 items-center justify-between'>
    <span className='block strike font-semibold text-black opacity-80'>{item}</span>
     <span className={`flex items-center gap-3 font-extrabold group ${edit?"":" pointer-events-none"}`}>
       <span class="material-icons text-[1.2rem] px-1 py-1 text-white bg-red-600 rounded-md hidden group-hover:block cursor-pointer" onClick={()=>dispatch_cart({type:DELETE_ITEM_LIST,
              payload:{
                categoryID:categoryID,
                itemID:itemID,
                item:item,
                category:category
              }})}>delete_outline</span>
       <span class="material-icons text-[1.2rem]  text-white font-extrabold bg-shop-orange rounded-full hidden group-hover:block cursor-pointer" onClick={()=>dispatch_cart({type:DECR_ITEM_LIST,
              payload:{
                categoryID:categoryID,
                itemID:itemID,
                item:item,
                category:category
              }})}>remove</span>
       <span className='px-1 text-sm block border-2 text-center border-shop-orange text-shop-orange font-extrabold rounded-md'>{`${quantity} pcs`}</span>
       <span class="material-icons text-[1.2rem] text-white font-extrabold bg-shop-orange rounded-full hidden group-hover:block cursor-pointer" onClick={()=>dispatch_cart({type:ADD_ITEM_LIST,
              payload:{
                categoryID:categoryID,
                itemID:itemID,
                item:item,
                category:category
              }})}>add</span>
     </span>
 </span>
     </div>
   ))}
   </div>
   ))
   }
 </>
)}
</div >

<div className="px-2 py-4 bg-transparent text-xl w-full bg-shop-right-back">
{edit?(
  <div className='flex p-[0.05rem] w-[90%] mx-auto border-2 border-shop-orange items-center rounded-lg flex-shrink-0'>
  <input type="text" placeholder='Enter a name' className='flex-2 caret-caert text-base w-0 py-1 px-2 border-none text-caert  outline-none focus:outline-none m-0 bg-transparent' onChange={e=>setName(e.target.value)}/>
  <button disabled={state.items.length===0} className="flex-1 bg-shop-orange py-1 text-base text-white tracking-wide capitalize rounded-md" onClick={async ()=>{

await axios.put(`${process.env.REACT_APP_URL}/shoppingify/list`,{
  "cartID":state.listID,
  "listname":name,
  "status":"Active",
  "list":state.items
  }).then((res)=>{
    if(res.data.data.update){
      toast.success('Cart saved successfully'); 
      dispatch_cart({type:GET_ITEMS_LIST,
        payload:{
          listName:name,
          listID:res.data.data.cartID,
        }});
    }else{
      toast.error('Unknown error - saving Cart');
    }
  }).catch((error)=>{
    toast.error(error.response.data.message);
  });

  }}>Save</button>
  </div>
):(
  <div className="flex items-center justify-evenly text-lg font-bold">
  <div className="px-6 py-1 rounded-lg tracking-wide capitalize cursor-pointer text-base" onClick={()=>dispatch_cart({type:MODAL_STATE,payload:false})}>cancel</div>
  <div className="px-2 py-2 rounded-lg tracking-wide capitalize cursor-pointer text-base bg-shop-blue text-white" onClick={()=>savelist("complete")}>Complete</div>
</div>
)}
</div>  
</div>

{(state.modal&&state.listStatus!=='cancel')?<Modal dispatch={dispatch_cart} cancelfunc={savelist}/>:''}
</>

)
};