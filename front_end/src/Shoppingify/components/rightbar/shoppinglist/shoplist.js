import { useState } from 'react';
import bottle from '../../../../Assets/bottle.svg'
import {useShoppinglist} from '../../../context/shoppinglist/shoppinglistcontext';
import {ADD_ITEM_LIST,DECR_ITEM_LIST,DELETE_ITEM_LIST,CHECK_ITEM_LIST,LIST_STATUS_LIST,MODAL_STATE} from '../../../context/dispatchactions';
import {ClipLoader} from 'react-spinners';
import {Modal} from '../../modal/modal';


export const List=({setAdditem})=>{
  const [edit,setEdit]=useState(false);
  const {state,dispatch_cart}=useShoppinglist();
  
return (
  <>
  <div className='w-full flex flex-col  gap-2 h-full'>
  <div className="bg-shop-bottle-bg w-full h-40 rounded-3xl items-center justify-evenly flex flex-row">
  <img src={bottle} alt="Bottle" className='block h-[105%] -translate-y-5 flex-shrink-0'/>
  <div className='block float-right mb-8'>
    <span className='font-quick text-left block text-2xl my-4 text-white'>Didn’t find what you<br></br> need?</span>
    <button className='bg-white text-black text-xl px-4 py-2 rounded-lg' onClick={()=>setAdditem(prev=>!prev)}>Add item</button>
  </div>
 </div>
 
<div className='w-full px-4 flex-auto overflow-y-scroll scroll-hide'>
{state.loading?<div className='w-full bg-transparent mt-[50%] text-center'><ClipLoader color="#F9A109" css={{borderWidth:'5px',top:"20%"}} loading={state.loading} size={50}/></div>:(
   <>
   <div className='flex flex-row justify-between text-2xl w-full mt-6 mb-9'>
     <span className='block font-bold'>{state.listName??`Shopping list`}</span>
     <span class="material-icons block cursor-pointer" onClick={()=>setEdit(prevState=>!prevState)}>edit</span>
   </div>
   
   {state.items.map(({category,items,categoryID},index)=>(
   <div className='p-0 mb-2 last:mb-28 inline-block w-full'  key={`CA-${index}`}>
   <div className='text-lg text-caert mb-2'>{category}</div>
   {items.map(({name,quantity,itemID,checked},i)=>(
     <div className='w-full flex  flex-row items-center mb-2 gap-6' key={`Item-${i}`}>
    {edit?"":<input type="checkbox" checked={checked} onChange={()=>dispatch_cart({type:CHECK_ITEM_LIST,
              payload:{
                categoryID:categoryID,
                itemID:itemID
              }})}/>}  
    <span className='flex flex-1 flex-row flex-nowrap flex-shrink-0 items-center justify-between'>
    <span className='block strike text-xl font-semibold text-black opacity-80'>{name}</span>
     <span className={`flex items-center gap-4 font-extrabold group ${edit?"":" pointer-events-none"}`}>
       <span class="material-icons px-1 py-1 text-white bg-red-600 rounded-md hidden group-hover:block cursor-pointer" onClick={()=>dispatch_cart({type:DELETE_ITEM_LIST,
              payload:{
                categoryID:categoryID,
                itemID:itemID,
                name:name,
                category:category
              }})}>delete_outline</span>
       <span class="material-icons text-white bg-shop-orange rounded-full hidden group-hover:block cursor-pointer" onClick={()=>dispatch_cart({type:DECR_ITEM_LIST,
              payload:{
                categoryID:categoryID,
                itemID:itemID,
                name:name,
                category:category
              }})}>remove</span>
       <span className='px-2 py-1 block border-2 text-center border-shop-orange text-shop-orange font-extrabold rounded-xl'>{`${quantity} pcs`}</span>
       <span class="material-icons text-white bg-shop-orange rounded-full hidden group-hover:block cursor-pointer" onClick={()=>dispatch_cart({type:ADD_ITEM_LIST,
              payload:{
                categoryID:categoryID,
                itemID:itemID,
                name:name,
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
  <div className='flex p-[0.2rem] w-[90%] mx-auto border-2 border-shop-orange items-center rounded-xl flex-shrink-0'>
  <input type="text" placeholder='Enter a name' className='flex-2 caret-caert w-0 py-2 px-2 border-none text-caert  outline-none focus:outline-none m-0 bg-transparent'/>
  <button className='flex-1 bg-shop-orange py-2 text-white tracking-wide capitalize rounded-lg'>Save</button>
  </div>
):(
  <div className="flex items-center justify-evenly text-lg font-bold">
  <div className="px-6 py-3 rounded-xl tracking-wide capitalize cursor-pointer" onClick={()=>dispatch_cart({type:MODAL_STATE})}>cancel</div>
  <div className="px-4 py-3 rounded-xl tracking-wide capitalize cursor-pointer bg-shop-blue text-white" onClick={()=>dispatch_cart({type:LIST_STATUS_LIST,
  payload:{
    status:'complete'
  }})}>Complete</div>
</div>
)}
</div>  
</div>

{(state.modal&&state.listStatus!=='cancel')?<Modal dispatch={dispatch_cart}/>:''}
</>

)
};