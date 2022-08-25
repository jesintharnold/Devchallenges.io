import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';

export const Catsearch=()=>{
const [search,setSearch]=useState([]);
const [data,setData]=useState([]);

async function getrecommends(){
  await axios.get(`${process.env.REACT_APP_API_URL}/catwiki/recommend`).then(({status,data})=>{
        if(status===200){
            setData(data);
        }
    }).catch(err=>{
     let {data}=err.response;
     toast.error(data.message);
    });
};

useEffect(()=>{
        getrecommends();
},[]);


function search_list(e){
if(e.target.value!==""){
    let res=data.filter(data=>data.name.toLowerCase().includes(e.target.value));
    setSearch(res);
}else{
    setSearch("");
}
};

return (
<div className="relative my-10 md:mb-20">
<div className="flex items-center w-8/12 md:w-1/4  h-12 rounded-3xl px-4 bg-white">
        <input type="text" className="bg-transparent w-0 flex-1 text-black border-0 outline-none m-0  text-lg" placeholder="Enter your breed" onChange={e=>search_list(e)}/>
        <span class="material-icons block text-center font-bold opacity-75 text-black">search</span>
</div>
<div className="absolute max-h-60 box-border ml-4 auto text-black  justify-center bg-white z-30 rounded-lg overflow-hidden overflow-y-scroll w-3/6 md:w-1/4 mt-2 scroll-hide">
{search===""?null:(search.map(dat=><Link to={`/catwiki/overview/${dat.id}`} className="block first:mt-2 hover:bg-cement-cat rounded-lg px-4 m-1 py-2 font-light text-black text-base" key={dat.id}>{dat.name}</Link>))
}
</div>
</div>
);

};