import {useMainitem} from '../../../context/mainitems/maincontext';
import {ClipLoader} from 'react-spinners';
import { useShoppinglist } from '../../../context/shoppinglist/shoppinglistcontext';
import {ADD_ITEM_LIST,OVERVIEW_STATE,ISMOBILE} from '../../../context/dispatchactions';

//<ClipLoader color="#38ACC5" size={20}/>
export const Items=()=>{
  const {mainstate,dispatch}=useMainitem();
  const {dispatch_cart}=useShoppinglist();
  return (
        <>
       <div className="w-full flex">
       
       <span className="font-quick font-bold tracking-wider md:text-2xl mb-3 text-base text-left"><span className="text-shop-orange text-3xl">Shoppingify</span><br className="block md:hidden"></br> allows you take your<br className="hidden md:block"></br> shopping list wherever you go</span>
       </div>
       {mainstate.loading?<div className='w-full bg-transparent mt-[30%]  text-center'><ClipLoader color="#F9A109" css={{borderWidth:'5px',top:"20%"}} loading={mainstate.loading} size={50}/></div>:
       mainstate.items.map(({category,_id,items},index)=>(
        
           <div className="mt-5" key={`c-${index}`}>    
           <span className="text-lg font-normal">{category}</span>
           <div className="flex w-full flex-wrap gap-2 md:gap-5 my-3">
           {
           items.map(({item,itemID},index_)=>(
            
             <div className="shadow-lg flex items-center gap-4 md:gap-2 px-3 py-1 rounded-xl bg-white cursor-pointer" key={`L-${index_}`}>

             <span className="block text-base font-thin float-left" 
             onClick={()=>{dispatch({type:ISMOBILE,payload:true});dispatch_cart({type:OVERVIEW_STATE,payload:{
              status:true,
              categoryID:_id,
              itemID:itemID
            }})}}>{item}</span>
             <span className="material-icons text-xl md:text-2xl block text-shop-tooltip opacity-70"    onClick={()=>dispatch_cart({type:ADD_ITEM_LIST,
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