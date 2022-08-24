import toast from 'react-hot-toast';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';

export const Topcats=()=>{

  const [data,setData]=useState([]);
    
    async function callcats(){
        await axios.get(`${process.env.REACT_APP_API_URL}/catwiki/cats/10`).then(({status,data})=>{
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
      data.map((data_,index)=>(
<>
{console.log(data_)}
<Link to={`/catwiki/overview/${data_.id}`}  key={data_.id}>
           <div className='flex flex-col md:flex-row items-center gap-8 mb-8'>

<img src={data_.url} className='w-36 flex-shrink-0 rounded-xl h-36 object-cover' alt="Name"/>
<div className='flex flex-col gap-4'>
    <span className='block text-cat-brown text-2xl font-medium'>{`${index+1}.  ${data_.name}`}</span>
    <span className='block text-lg tracking-tight font-normal leading-6'>{data_.description}</span>
</div>
</div>
      </Link>  
</>

      )) 
   }
     

    </div>
);
};