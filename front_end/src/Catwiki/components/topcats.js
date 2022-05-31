import seedata from './seed.json';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useEffect, useState} from 'react';
import Config from '../../Config/dev.json';
import { Link } from 'react-router-dom';


export const Topcats=()=>{

  const [data,setData]=useState([]);
    
    async function callcats(){
        await axios.get(`${Config.URL}/catwiki/cats/10`).then(({status,data})=>{
            if(status===200){
                setData(data);
            }
        }).catch(err=>{
         let {data}=err.response;
         toast.error(data.message);
        });
    };


    useEffect(()=>{
        callcats();
    },[])

return (
    <div className="w-full h-full">
     <span className='block text-2xl font-bold mb-10 text-cat-brown tracking-tight'>Top 10 most searched breeds</span>
   {
      data.map((data,index)=>(
      <Link to={`/catwiki/overview/${data.id}`}  key={data.id}>
           <div className='flex flex-col md:flex-row items-center gap-8 mb-8'>

<img src={data.url} className='w-36 flex-shrink-0 rounded-xl h-36 object-cover' alt="Name"/>
<div className='flex flex-col gap-4'>
    <span className='block text-cat-brown text-2xl font-medium'>{`${index+1}.  ${data.name}`}</span>
    <span className='block text-lg tracking-tight font-normal leading-6'>{data.description}</span>
</div>
</div>
      </Link>  

      )) 
   }
     

    </div>
);
};