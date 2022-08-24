import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import validator from 'validator';
import axios from '../../../../utils/axios';
import { GET_ITEMS_LIST, ISMOBILE } from '../../../context/dispatchactions';
import { useMainitem } from '../../../context/mainitems/maincontext';

export const Additem=({setAdditem})=>{
  
  const [category,setCategory]=useState({category:"",categoryID:""});
  const [cat,setCat]=useState([]);
  const [err,setErr]=useState({
    name:'',
    note:'',
    url:'',
    category:''
  });
  const [filter,setFilter]=useState("");
  const {dispatch}=useMainitem();

  useEffect(()=>{
    const fetchItems=async ()=>{
      await axios.get(`${process.env.REACT_APP_URL}/shoppingify/items/category`).then(res=>
      setCat(res.data.data)
     );
    }
    
    fetchItems();

  },[]);
  


  function addform(e){
    let err={};
    e.preventDefault();
    const data_=new FormData(e.target);
    console.log(data_);
    const obj=Object.fromEntries(data_.entries());
    if(validator.isEmpty(obj.name)){
      err.name="please provide name";
    };
    if(validator.isEmpty(obj.note)){
      err.note="please provide a note";
    };
    if(validator.isURL(obj.url)===false){
      err.url="please provide Image url";
    };
    if(validator.isEmpty(obj.category)){
      err.category="please choose category";
    };
    
    setErr({...err});
    // check before sending a response
    
    if(!err.name && !err.note && !err.url &&!err.category){
      let payload;
      if(category.category===obj.category){
       payload={
  "name":obj.name,
  "description":obj.note||null,
  "imageurl":obj.url||null,
  "categoryname":category.category,
  "categoryID":category.categoryID
       };
      }else{
       payload={
  "name":obj.name,
  "description":obj.note||null,
  "imageurl":obj.url||null,
  "categoryname":obj.category,
  "categoryID":null
       };
      }
      async function postData(pay){
        console.log(pay);
      await axios.post(`${process.env.REACT_APP_URL}/shoppingify/items`,pay).then(res=>{
        if(res.data.name=="ValidationError"){
          toast.error(res.data.message);
        }else{
          toast.success("Added successfully");
          setAdditem(prev=>!prev);
        }
      }
      );
      await axios.get(`${process.env.REACT_APP_URL}/shoppingify/items`).then(res=>{
        dispatch({
          type:GET_ITEMS_LIST,
          payload:{
            loading:false,
            items:res.data.data
          } 
        });
        dispatch({type:ISMOBILE,payload:false})
      }
      );


      };

      postData(payload);
      
    };
  };
  

  return (
    <> 
    <span className='block text-xl font-semibold'>Add a new item</span>
    <form className='mt-4' onSubmit={addform}>

    <div className='group mb-2'>
    <label htmlFor='name' className="text-base text-txtOpac font-semibold mb-3 group-focus-within:text-shop-orange">Name</label>
    <input type="text" id="name" name='name' placeholder="Enter a name" className='mt-2 w-full text-base placeholder:text-sm px-4 py-1  border-2 outline-none rounded-lg focus:border-shop-orange text-black font-normal'/>
    {err.name?<p className='text-base text-red-800'>{err.name}</p>:''}
    </div>
    
    <div className='group mb-2'>
    <label htmlFor='note' className="text-base text-txtOpac font-semibold mb-3 group-focus-within:text-shop-orange">Note</label>
    <textarea type="text" id="note" name='note' placeholder="Enter a note" className='mt-2 w-full text-base placeholder:text-sm px-4 py-1  border-2 outline-none rounded-lg focus:border-shop-orange h-32 resize-none text-black font-normal'/>
    {err.note?<p className='text-base text-red-800'>{err.note}</p>:''}
    </div>

    <div className='group mb-2'>
    <label htmlFor='url' className="text-base text-txtOpac font-semibold mb-3 group-focus-within:text-shop-orange">Image</label>
    <input id="image" type="url" name='url' placeholder="Enter a url" className='mt-2 w-full text-base placeholder:text-sm px-4 py-1  border-2 outline-none rounded-lg focus:border-shop-orange text-black font-normal'/>
    {err.url?<p className='text-base text-red-800'>{err.url}</p>:''}
    </div>

    <div className='group mb-2'>
    <label htmlFor='category' className="text-base text-txtOpac font-semibold mb-3 group-focus-within:text-shop-orange">Category</label>
    <input id="category" type="text" name='category' list='listcategory' placeholder="Enter a category" value={filter} onChange={e=>setFilter(e.target.value)} className='mt-2 w-full text-base placeholder:text-sm px-4 py-1  border-2 outline-none rounded-lg focus:border-shop-orange text-black font-normal'/>
    {err.category?<p className='text-base text-red-800'>{err.category}</p>:''}
    <div className="listcategory overflow-y-scroll h-36 flex flex-col scroll-hide" id="listcategory">
    {cat.filter((c)=>c.category.toLowerCase().includes(filter)).map(({_id,category})=><div className='first:mt-2 pl-4 py-1 hover:bg-white rounded-md' key={_id} onClick={()=>{setCategory({category:category,categoryID:_id});setFilter(category);}} value={category}>{category}</div>)}
    </div>
    </div>

    <div className="px-2 py-4 bg-transparent w-[90%] absolute bottom-4 bg-shop-right-back">
        <div className="flex items-center justify-evenly text-base font-bold">
            <button className="px-3 py-1 rounded-lg tracking-wide" onClick={()=>{setAdditem(prev=>!prev);dispatch({type:ISMOBILE,payload:false});}}>cancel</button>
            <button type='submit' className="px-4 py-1 rounded-lg tracking-wide capitalize cursor-pointer text-base bg-shop-orange text-white">save</button>
        </div>
    </div>
    </form>
    </>
  );
};