import { useEffect, useState } from "react";
import { Link,useRouteMatch } from "react-router-dom";
import {ClipLoader} from 'react-spinners';

const data={data:[
  { monthtitle:'12/03/2020',
    data:[
      {
      name:"Grocery Lit",
      listID:'00022229000',
      date:new Date(),
      status:true, // completed - true
      items:[{category:"Non-Veg",items:[{name:"Avocodo",quantity:5},{name:"Avocodo wolves",quantity:4},{name:"Avocodo",quantity:3}]}]
      }
    ]
  }
]};

export const History=()=>{
  let { path, url } = useRouteMatch();
  
  // const [data,setData]=useState({
  //   data:[]
  // });


  useEffect(()=>{

  // sent the request to History endpoint

  },[]);

return (
<>
<span className="font-bold mb-8 tracking-wider md:text-4xl text-base block text-left">Shopping history</span>
{console.log(path,url,data.data)}
  {data.data.length>0?
  data.data.map(({monthtitle,data},index)=>(
    <div key={`HT-${index}`}>
    <span className="font-semibold text-xl block">{new Date(monthtitle).toLocaleString('en-US',{month:'long',year:'numeric'})}</span>
    {data.map(({name,date,status,listID},i)=>(
      <Link Link to={`${path}/${listID}`}  key={`Hist-${i}`}>
      <div  className="w-full mx-2 shadow-sm bg-white rounded-xl border-2 my-3 cursor-pointer">
      <div className="flex flex-row items-center justify-between px-6 py-4">
      <span className="text-2xl font-semibold opacity-80">{name}</span>
      <div className="flex flex-row text-caert text-xl items-center gap-4">
      <span className="material-icons-outlined block">calendar_month</span>
      <span className="block">{new Date(date).toLocaleString('en-US',{month:'numeric',year:'numeric',weekday:'short',day:'numeric'}).replaceAll('/','.').replaceAll(',','  ')}</span>
      <span className={`p-1 rounded-xl  border-2 ${status?"text-shop-blue border-shop-blue":"text-shop-red border-shop-red"}`}>{status?"completed":"cancelled"}</span>
      <span className="material-icons-outlined text-4xl text-shop-orange block mr-4">keyboard_arrow_right</span>
      </div></div>
      </div>
      </Link>
    ))}
     </div>
   ))
  :
  <div className='w-full bg-transparent mt-[30%] text-center'><ClipLoader color="#F9A109" css={{borderWidth:'5px',top:"20%"}} loading={data.data.length===0} size={50}/></div>}
</>
);
};