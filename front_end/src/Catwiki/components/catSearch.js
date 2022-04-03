import { useState } from "react";

export const Catsearch=()=>{
const [search,setSearch]=useState("");

return (
<div className="relative my-10 md:mb-20">
<div className="flex items-center w-8/12 md:w-1/4  h-12 rounded-3xl px-4 bg-white">
        <input type="text" className="bg-transparent w-0 flex-1 text-black border-0 outline-none m-0  text-lg" placeholder="Enter your breed"/>
        <span class="material-icons block text-center font-bold opacity-75 text-black">search</span>
</div>
<div className="absolute hidden max-h-60 box-border ml-4 auto text-black  justify-center bg-white z-30 rounded-lg overflow-hidden overflow-y-scroll w-3/6 md:w-1/4 -mt-16 scroll-hide">
<span className="block first:mt-2 hover:bg-cement-cat rounded-lg px-4 m-1 py-2 font-light text-black text-base">AWS</span>
</div>
</div>
);

};