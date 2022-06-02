import {useMainitem} from '../../../context/mainitems/maincontext';
import {ClipLoader} from 'react-spinners';

const example=[
  {Title:"Fruit and vegetables",values:["Avocado","Banana",
  "Bunch of carrots","Chicken","Pre-cooked corn",
  "Mandarin Nadorcott","Piele De Sapo Melon","Watermelon"]},
  {Title:"Fruit",values:["Avocado","Banana",
  "Bunch of carrots","Chicken","Pre-cooked corn",
  "MNad","P","Watermelon"]},
  {Title:"Fruit and vegetables",values:["Avocado","Banana",
  "Bunch of carrots","Chicken","Pre-cooked corn",
  "Man","Piele De Sapo Melon","Watermelon"]},
  {Title:"Fruit",values:["Avocado","Banana",
  "Bunch of carrots","Chicken","Pre-cooked corn",
  "Man","Piele De Sapo Melon","Watermelon"]}
  
];

//<ClipLoader color="#38ACC5" size={20}/>
export const Items=()=>{
  const {state,dispatch}=useMainitem();
  return (
        <>
       <div className="w-full flex">
       <span className="font-quick font-bold tracking-wider md:text-4xl text-base text-left"><span className="text-shop-orange text-4xl">Shoppingify</span><br className="block md:hidden"></br> allows you take your<br className="hidden md:block"></br> shopping list wherever you go</span>
       </div>
       {state.loading?<div className='w-full bg-transparent mt-20 text-center'><ClipLoader color="#F9A109" css={{borderWidth:'5px',top:"20%"}} loading={state.loading} size={50}/></div>:
       state.items.map(({category,categoryID,items},index)=>(
           <div className="first:mt-12 mt-8" key={`c-${index}`}>    
           <span className="text-xl md:text-2xl font-medium">{category}</span>
           <div className="flex w-full flex-wrap gap-2 md:gap-5 my-6">
           {
           items.map(({name,itemID},index)=>(
             <div className="shadow-lg flex items-center gap-4 px-2 md:px-4 py-1 md:py-3 rounded-xl md:rounded-2xl bg-white cursor-pointer" key={`L-${index}`}>
             <span className="block  text-base md:text-xl font-light float-left">{name}</span>
             <span className="material-icons text-xl md:text-3xl block text-shop-tooltip opacity-70">add</span>
             </div>
           ))
           }
           </div>
           </div>
       ))}     
        </>
  );
};