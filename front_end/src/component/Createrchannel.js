import {useContext, useRef, useState } from "react";
import  ReactDOM  from "react-dom";
import {ClipLoader} from 'react-spinners';



export function Modal({setModal}){

    const [err,setErr]=useState({
        Name:'',
        Description:''
    });
    const [load,setLoad]=useState(false);
    // function onVal(e){
    //     console.log(`This is called `);
    //     setVal({...val,[e.target.name]:e.target.value});
    // }


    function handleSubmit(e){
         let error={Name:'',Description:''};
         e.preventDefault();
         const data=new FormData(e.target);
         let obj=Object.fromEntries(data.entries());
        //  setVal({...val,...Object.fromEntries(data.entries())});


         //Validate Objects
         
         if(!obj.Name){
             error.Name="Provide Channel Name";
         }
         if(!obj.Description){
             error.Description="Provide Channel Description"
         }

         setErr({...error});

         // Send an API request - if fails show an error
         if(!error.Name&&!error.Description){
                console.log(`API request - sent`);
                setLoad(true);
                  setTimeout(()=>{
                      setLoad(false);
                  },3000);
         }

    }



    
    return ReactDOM.createPortal(
        <div className="fixed z-[100] min-h-screen w-full justify-center flex items-center text-txt top-0 left-0 right-0 bottom-0 bg-sideopacity">
            <div className="flex flex-col bg-side h-auto rounded-2xl pt-4 px-2 w-[90%] md:w-1/2  xl:w-1/3">
                <div className="flex justify-between">
                <span className="ml-4 font-bold text-txt text-lg font-sans uppercase block">New Channel</span>
                <span className="material-icons-outlined bg-main p-1 rounded hover:bg-gray-500 cursor-pointer" onClick={()=>setModal(false)}>close</span>
                </div>
                  
                {console.log(`RE-RENDER`)}
                <div className="m-4">
                <form noValidate className="flex flex-col flex-1" onSubmit={handleSubmit}>
                    <div className="bg-search rounded-lg mb-5 p-2">
                    <input type="text" name="Name"  placeholder="Channel name" className="bg-transparent w-full outline-none m-0 p-0 text-txt block"/>
                    </div>
                    {err.Name}
                   <div className="bg-search rounded-lg mb-5 p-2">
                    <textarea name="Description" placeholder="Channel Description" className="bg-transparent  outline-none w-full m-0 resize-none p-0 text-txt block scroll-hide " maxLength="125" rows="3"/>
                   </div>
                    {err.Description}
                    <button disabled={load} className="w-20 h-8 self-end font-bold flex justify-center items-center text-base p-1 rounded-lg bg-sky" type="submit">{load?<ClipLoader color="#fffff" size={25}/>:`Save`}</button>
                </form>
                </div>


            </div> 
        </div>,
        document.getElementById("modal")
    )
}


