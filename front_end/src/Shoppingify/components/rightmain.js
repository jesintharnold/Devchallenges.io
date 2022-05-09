import { useState } from "react";
import { Additem } from "./rightbar/additem/additem";
import { Itemoverview } from "./rightbar/overview/itemoverview";
import { List } from "./rightbar/shoppinglist/shoplist";


export const Rightmain=()=>{

const [additem,setAdditem]=useState(false);
// ON click -> dispath a overview Item 
const [overview,setOverview]=useState(false);

  
return (
<div className="box-border hidden relative md:block font-quick scroll-hide max-w-md w-full  min-h-screen h-screen overflow-y-scroll  flex-nowrap flex-shrink-0 bg-shop-right-back flex-1 shadow-md px-2 pt-8 md:px-4">
{/* <List setAdditem={setAdditem}/> */}
{/* <Itemoverview/> */}
{/* <Additem/> */}

{
// IIFE function to Invoke a value - change to if statement once context is changed
(()=>{
  switch(additem){
    case true:
      return <Additem setAdditem={setAdditem}/>;
    default:
      return <List setAdditem={setAdditem}/>;   
   };
})()
}


</div>
);
};


const Rightpagerender=({additem,setAdditem})=>{
  console.log(additem);
switch(additem){
 case true:
   return <Additem setAdditem={setAdditem}/>;
 default:
   return <List setAdditem={setAdditem}/>;   
};
};

export default Rightpagerender;