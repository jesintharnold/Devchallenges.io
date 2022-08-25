export const Headersidebar=({setmodal,menu,setmenu})=>{
return (
<div className="flex text-center items-center px-4 py-2 justify-between shadow-ol relative">
<span className="text-xl font-sans font-bold">Channels</span>  
<span className="material-icons-outlined bg-main p-1 rounded hover:bg-gray-500 cursor-pointer" onClick={()=>setmodal(prev=>!prev)}>add</span>
{menu?<span onClick={()=>{setmenu(prev=>!prev);}} className="material-icons-outlined absolute font-thin  -right-12 p-2 bg-side rounded lg:hidden" >close</span>:''}
</div>
)
};



//setChannel({...channel,checked:false}) - pending check this