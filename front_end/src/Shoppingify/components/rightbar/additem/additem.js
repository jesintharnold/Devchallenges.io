import { data } from 'autoprefixer';
import {useEffect, useState} from 'react';
import validator from 'validator';


export const Additem=()=>{
  
  const [load,setLoad]=useState(false);

  const [err,setErr]=useState({
    name:'',
    note:'',
    url:'',
    category:''
  });



  function addform(e){
    let err={};
    e.preventDefault();
    const data_=new FormData(e.target);
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
       console.log("Sending a response ...");
       console.log(obj);
    };
  };
  

  return (
    <> 
    <span className='block text-2xl font-semibold'>Add a new item</span>
    <form className='mt-6' onSubmit={addform}>

    <div className='group mb-4'>
    <label htmlFor='name' className="text-lg text-txtOpac font-semibold mb-3 group-focus-within:text-shop-orange">Name</label>
    <input type="text" id="name" name='name' placeholder="Enter a name" className='mt-4 w-full text-xl placeholder:text-lg px-4 py-3  border-2 outline-none rounded-xl focus:border-shop-orange text-black font-normal'/>
    {err.name?<p className='text-base text-red-800'>{err.name}</p>:''}
    </div>
    
    <div className='group mb-4'>
    <label htmlFor='note' className="text-lg text-txtOpac font-semibold mb-3 group-focus-within:text-shop-orange">Note</label>
    <textarea type="text" id="note" name='note' placeholder="Enter a note" className='mt-4 w-full text-xl placeholder:text-lg px-4 py-3  border-2 outline-none rounded-xl focus:border-shop-orange h-32 resize-none text-black font-normal'/>
    {err.note?<p className='text-base text-red-800'>{err.note}</p>:''}
    </div>

    <div className='group mb-4'>
    <label htmlFor='url' className="text-lg text-txtOpac font-semibold mb-3 group-focus-within:text-shop-orange">Image</label>
    <input id="image" type="url" name='url' placeholder="Enter a url" className='mt-4 w-full text-xl placeholder:text-lg px-4 py-3  border-2 outline-none rounded-xl focus:border-shop-orange text-black font-normal'/>
    {err.url?<p className='text-base text-red-800'>{err.url}</p>:''}
    </div>

    <div className='group mb-4'>
    <label htmlFor='category' className="text-lg text-txtOpac font-semibold mb-3 group-focus-within:text-shop-orange">Category</label>
    <input id="category" type="text" name='category' placeholder="Enter a category" className='mt-4 w-full text-xl placeholder:text-lg px-4 py-3  border-2 outline-none rounded-xl focus:border-shop-orange text-black font-normal'/>
    {err.category?<p className='text-base text-red-800'>{err.category}</p>:''}
    <div className="search_recommends">
     {/* {cartData.filter(p=>(p.category.name)??"".toLowerCase().includes(frm.category)).map((c)=><div key={c.category.name} onClick={()=>setFrmchange(c.category)}>{c.category.name}</div>)}  */}
    </div>
    </div>

    <div className="px-2 py-4 bg-transparent w-[90%] absolute bottom-8">
        <div className="flex items-center justify-evenly text-xl font-bold">
            <button className="px-6 py-3 rounded-xl tracking-wide capitalize">cancel</button>
            <button type='submit' className="px-6 py-3 rounded-xl tracking-wide capitalize bg-shop-orange text-white">save</button>
        </div>
    </div>
    </form>
    </>
  );
};