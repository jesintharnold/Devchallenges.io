import {useMainitem} from '../../../context/mainitems/maincontext';
import {ClipLoader} from 'react-spinners';
import { useShoppinglist } from '../../../context/shoppinglist/shoppinglistcontext';
import { LOADING,ADD_ITEM_LIST,OVERVIEW_STATE} from '../../../context/dispatchactions';

//<ClipLoader color="#38ACC5" size={20}/>
export const Items=()=>{
  const {mainstate}=useMainitem();
  const {dispatch_cart}=useShoppinglist();
  return (
        <>
       <div className="w-full flex">
       
       <span className="font-quick font-bold tracking-wider md:text-4xl text-base text-left"><span className="text-shop-orange text-4xl">Shoppingify</span><br className="block md:hidden"></br> allows you take your<br className="hidden md:block"></br> shopping list wherever you go</span>
       </div>
       {mainstate.loading?<div className='w-full bg-transparent mt-[30%] text-center'><ClipLoader color="#F9A109" css={{borderWidth:'5px',top:"20%"}} loading={mainstate.loading} size={50}/></div>:
       mainstate.items.map(({category,_id,items},index)=>(
           
           
           <div className="first:mt-12 mt-8" key={`c-${index}`}>    
           <span className="text-xl md:text-2xl font-medium">{category}</span>
           <div className="flex w-full flex-wrap gap-2 md:gap-5 my-6">
             
           {
           items.map(({item,itemID},index_)=>(
            //Dispatching with category/categoryID/name/itemID
             <div className="shadow-lg flex items-center gap-4 px-2 md:px-4 py-1 md:py-3 rounded-xl md:rounded-2xl bg-white cursor-pointer" key={`L-${index_}`}>

             <span className="block  text-base md:text-xl font-light float-left" 
             onClick={()=>dispatch_cart({type:OVERVIEW_STATE,payload:{
              status:true,
              categoryID:_id,
              itemID:itemID
            }})}>{item}</span>
             <span className="material-icons text-xl md:text-3xl block text-shop-tooltip opacity-70"    onClick={()=>dispatch_cart({type:ADD_ITEM_LIST,
             payload:{
               categoryID:_id,
               itemID:itemID,
               item:item,
               category:category
             }})}>add</span>
             </div>
           ))
           }
           </div>
           </div>
       ))}     
        </>
  );
};