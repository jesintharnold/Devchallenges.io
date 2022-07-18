import { useState } from "react";
import { useMainitem } from "../context/mainitems/maincontext";
import { useShoppinglist } from "../context/shoppinglist/shoppinglistcontext";
import { Additem } from "./rightbar/additem/additem";
import { Itemoverview } from "./rightbar/overview/itemoverview";
import { List } from "./rightbar/shoppinglist/shoplist";

export const Rightmain=({mobile})=>{

//const {state}=useShoppinglist();
const {state}=useShoppinglist();
const {mainstate}=useMainitem();

return (
<div className={`box-border bg-red relative font-quick scroll-hide  w-full  min-h-screen h-screen overflow-y-scroll  flex-nowrap flex-shrink-0 bg-shop-right-back flex-1 shadow-md px-2 pt-8 md:px-4  ${(mobile)?((mainstate.isMobile)?'block':'hidden'):''}`}>
{state.overview.status?<Itemoverview/>:<Rightpagerender/>}
</div>
);
};


const Rightpagerender=()=>{
  const [additem,setAdditem]=useState(false);
switch(additem){
 case true:
   return <Additem setAdditem={setAdditem}/>;
 default:
   return <List setAdditem={setAdditem}/>;   
};
};

export default Rightpagerender;