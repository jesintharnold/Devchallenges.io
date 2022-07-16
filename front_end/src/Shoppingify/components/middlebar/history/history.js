import { useEffect, useState } from "react";
import { Link,useRouteMatch } from "react-router-dom";
import {ClipLoader} from 'react-spinners';
import axios from '../../../../utils/axios';


export const History=()=>{
  let { path, url } = useRouteMatch();
  
  const [data,setData]=useState([]);


  useEffect(()=>{

    const fetchItems=async ()=>{
      await axios.get(`${process.env.REACT_APP_URL}/shoppingify/history`).then((res)=>{
        setData(res.data.data);
        console.log(res.data.data);
      });
    }
    
    fetchItems();

  },[]);

;


return (
<>
<span className="font-bold mb-8 tracking-wider md:text-4xl text-base block text-left">Shopping history</span>
{console.log(data)}
  {data.length>0?
  data.map(({monthyear,data},index)=>(
    <div key={`HT-${index}`}>
      {console.log(`${monthyear.split("/")[0]+"01"+monthyear.split("/")[1]}`)}
    <span className="font-semibold text-xl block">{new Date(`${monthyear.split("/")[0]+"/"+monthyear.split("/")[0]+"/"+monthyear.split("/")[1]}`).toLocaleString('en-US',{month:'long',year:'numeric'})}</span>
    {data.map(({name,timestamp,status,listID},i)=>(
      <Link Link to={`${path}/${listID}`}  key={`Hist-${i}`}>
      <div  className="w-full mx-2 shadow-sm bg-white rounded-xl border-2 my-3 cursor-pointer">
      <div className="flex flex-row items-center justify-between px-6 py-4">
      <span className="text-2xl font-semibold opacity-80">{name||"Shopping List"}</span>
      <div className="flex flex-row text-caert text-xl items-center gap-4">
      <span className="material-icons-outlined block">calendar_month</span>
      <span className="block">{new Date(timestamp).toLocaleString('en-US',{month:'numeric',year:'numeric',weekday:'short',day:'numeric'}).replaceAll('/','.').replaceAll(',','  ')}</span>
      <span className={`p-1 rounded-xl  border-2 ${(status==="completed"|status==="complete")?"text-shop-blue border-shop-blue":"text-shop-red border-shop-red"}`}>{(status==="completed"|status==="complete")?"completed":"cancelled"}</span>
      <span className="material-icons-outlined text-4xl text-shop-orange block mr-4">keyboard_arrow_right</span>
      </div></div>
      </div>
      </Link>
    ))}
     </div>
   ))
  :
  <div className='w-full bg-transparent mt-[30%] text-center'><ClipLoader color="#F9A109" css={{borderWidth:'5px',top:"20%"}} loading={data.length===0} size={50}/></div>}
</>
);
};