import {useContext } from "react";
import  ReactDOM  from "react-dom";
import { Conprovider } from "../App";

function Modal(){
    const {setModal}=useContext(Conprovider);
    return ReactDOM.createPortal(
        <div className="fixed z-[100] min-h-screen w-full justify-center flex items-center text-txt top-0 left-0 right-0 bottom-0 bg-sideopacity">
            <div className="flex flex-col bg-side h-auto rounded-2xl pt-4 px-2 w-[90%] md:w-1/2  xl:w-1/3">
                <div className="flex justify-between">
                <span className="ml-4 font-bold text-txt text-lg font-sans uppercase block">New Channel</span>
                <span className="material-icons-outlined bg-main p-1 rounded hover:bg-gray-500 cursor-pointer" onClick={()=>setModal(false)}>close</span>
                </div>
                <div className="m-4">
                <form className="flex flex-col flex-1">
                    <div className="bg-search rounded-lg mb-5 p-2">
                    <input type="text"  placeholder="Channel name" className="bg-transparent w-full outline-none m-0 p-0 text-txt block"/>
                    </div>
                    <div className="bg-search rounded-lg mb-5 p-2">
                    <textarea placeholder="Channel Description" className="bg-transparent  outline-none w-full m-0 resize-none p-0 text-txt block scroll-hide " max-maxLength="125" rows="3"/>
                    </div>
                    <button className="w-20 self-end font-bold text-base p-1 rounded-lg bg-sky" onClick={(e)=>{
                          e.preventDefault();                        
                    }}>Save</button>
                </form>
                </div>
            </div> 
        </div>,
        document.getElementById("modal")
    )
}


export default Modal;