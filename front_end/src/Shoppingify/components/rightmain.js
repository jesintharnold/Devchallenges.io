import { List } from "./rightbar/shoplist";

export const Rightmain=()=>{
return (
<div className="box-border font-quick scroll-hide max-w-md w-full  min-h-screen h-screen overflow-y-scroll  flex-nowrap flex-shrink-0 bg-shop-right-back flex-1 shadow-md px-2 py-8 md:px-4">
<List/>
</div>
);
};