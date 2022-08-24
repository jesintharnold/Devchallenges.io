import { LogoutComp } from "../../utils/components/LogoutComp";
import Channeloverview from "./channeloverview";
import Channels from "./channels";
import { Headersidebar } from "./chat.header";
import { Search } from "./chat.search";



export const Chatsidebar=({setmodal,setmenu,menu})=>{
return (
<div className={"fixed left-0 top-0 bottom-0 z-50 min-h-full w-[16rem] lg:relative bg-side text-white lg:w-72 transition duration-200 ease-in-out lg:translate-x-0 overflow-hidden"+(menu?'':'-translate-x-full')}>
<div className="z-20 lg:flex flex-col h-[90%]"> 
<Headersidebar setmodal={setmodal} menu={menu} setmenu={setmenu}/>
<Search/>
<Channels/>
</div>
<Channeloverview/>
<div className={`flex z-50 items-center pb-2 pt-3 px-4 justify-between bottom-0 absolute min-w-full bg-blk flex-shrink-0 flex-grow-0`}>
<LogoutComp bottom={true}/>    
</div>
</div>
)
};