import { useState } from "react";



function App() {
  const [drop,setDrop]=useState(false);
  const [side,setSide]=useState(false);



  return (
    <div className="min-w-full min-h-screen h-0  relative lg:flex">


    <div className={"fixed left-0 top-0 z-50 min-h-full w-[16rem] lg:relative bg-side text-white  lg:w-72   transition duration-200 ease-in-out lg:translate-x-0 "+(side?'':'-translate-x-full')}>
   
    {/* Front-Page-Channels-List */}
    <div>
     {/* Header Channels */}
       <div className="flex text-center items-center px-4 py-2 justify-between shadow-ol  relative">
       <span className="text-xl font-sans font-bold">Channels</span>  
       <span className="material-icons-outlined bg-main p-1 rounded hover:bg-gray-500 cursor-pointer">add</span>  
       {side?<span onClick={()=>setSide(!side)} className="material-icons-outlined absolute font-thin  -right-12 p-2 bg-side rounded lg:hidden" >close</span>:''}
       </div> 
     {/* Search Button */}
     <div className="mx-4 my-4 bg-search rounded-lg flex items-center p-2">
     <span class="material-icons-outlined ml-1 mr-4">search</span>
     <input type="text" placeholder="Search" className="flex-1 w-0 caret-caert overflow-hidden bg-transparent text-caert text-lg font-sans outline-none"/>
     </div>

     {/* Channel List and Members List */}
     <div>       
     </div>
    </div>

      {/* Logout options */}
    <div className="flex items-center pb-2 pt-3 px-4 justify-between absolute min-w-full bottom-0 bg-blk">
    <div className="flex items-center">
    <img src="https://unsplash.com/photos/v26vu43kZkw/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTR8fHBvdHJhaXR8fDB8fHx8MTY0NDEyNjU1Mg&force=true&w=640" className="h-10 w-10  rounded object-cover" alt="not found" loading="lazy"/>
    <span className="text-lg font-sans font-txt ml-6">Xanthe Neal</span>
    </div>
    <span className="material-icons-outlined cursor-pointer  rounded hover:bg-gray-500" onClick={()=>setDrop(!drop)}>{drop?`expand_less`:`expand_more`}</span>
    </div>

    {drop?
       <div className="bottom-11 absolute right-8  rounded-2xl bg-main p-4 animate-popup">
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
</div>




 <div className="min-h-full relative box-border bg-main text-white z-40 translate-x-0 lg:flex-1">
   
     <div className="flex text-center px-4 py-2 justify-start shadow-ol">
     <span className="material-icons-outlined  p-1 rounded mr-3  cursor-pointer lg:hidden" onClick={()=>setSide(!side)}>menu</span>
     <span className="text-xl font-sans font-bold ml-5">Front-end developers</span>   
     </div> 
     {/* Chats */}
     <div>

     </div>

    <div className="p-4 lg:p-6 min-w-full absolute  bottom-0">
    <div className="bg-search rounded-lg flex box-border  items-center ">
     <input type="text" placeholder="Type a message here" className="p-0 flex-1 ml-4 caret-caert overflow-hidden bg-transparent text-caert text-sm font-sans outline-none"/>
     <div className="m-1">
     <span class="material-icons-outlined text-xl bg-sky py-1 px-2 rounded-lg">send</span>
     </div>
     </div>
    </div>
    
    
 </div>


</div>
  );
}

export default App;
