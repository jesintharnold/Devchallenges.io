import ReactDOM from "react-dom";
import { LIST_STATUS_LIST,MODAL_STATE } from "../../context/dispatchactions";

export const Modal=({dispatch,cancelfunc})=>{
 return ReactDOM.createPortal(
   <>
   <div className="absolute flex justify-center items-center w-full h-full z-50 top-0 left-0 bottom-0 right-0 bg-modal-bg">
   <div className="bg-white p-5 rounded-xl">
   <span className="text-lg font-semibold text-black my-4 block">Are you sure that you want to cancel this list?</span>
   <div className="text-black text-xl flex flex-row-reverse items-center mt-5 gap-6 text-center font-bold">
         <button className="bg-modal-red-bg text-white text-base font-bold py-1 px-3 rounded-lg" onClick={()=>{cancelfunc("cancel");dispatch({type:MODAL_STATE});}}>yes</button>
         <button className="h-full rounded-md text-base" onClick={()=>dispatch({type:MODAL_STATE})}>cancel</button>
     </div>
   </div>
   </div>
   </>,
   document.getElementById('modal')
 )
};
