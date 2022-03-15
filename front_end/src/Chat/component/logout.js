
function Logout({drop,setDrop}){
    return (
        <>
        <div className="flex z-50 items-center pb-2 pt-3 px-4 justify-between absolute min-w-full bottom-0 bg-blk">
        <div className="flex items-center">
        <img src="https://cdn.pixabay.com/photo/2016/03/26/22/13/man-1281562_960_720.jpg" className="h-10 w-10  rounded object-cover" alt="not found" loading="lazy"/>
        <span className="text-lg font-sans font-txt ml-6">Xanthe Neal</span>
        </div>
        <span className="material-icons-outlined cursor-pointer  rounded hover:bg-gray-500" onClick={()=>setDrop(!drop)}>{drop?`expand_less`:`expand_more`}</span>
        </div>
    
    
        {drop?
           <div className="bottom-11 z-[55] absolute right-8  rounded-2xl bg-main p-4 animate-popup">
           <div className="flex hover:bg-search px-3 py-2 rounded cursor-pointer">
           <span className="material-icons-outlined">account_circle</span>
           <span className="ml-4 font-sans font-medium">My Profile</span>
           </div>
           <div className="flex hover:bg-search px-3 py-2 rounded cursor-pointer">
           <span className="material-icons-outlined">terrain</span>
           <span className="ml-4 font-sans font-medium">Tweeter</span>
           </div>
           <div className="flex hover:bg-search px-3 py-2 rounded text-redlog cursor-pointer">
           <span className="material-icons-outlined">logout</span>
           <span className="ml-4 font-sans font-medium">Logout</span>
           </div>
         </div>
        :''}
</>

    )
}

export default Logout;