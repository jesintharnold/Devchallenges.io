export const Profileview=({setEdit,data})=>{
    return (
        <>
<div className=' m-6 flex justify-between items-center gap-8'>
<div>
<span className='text-xl font-semibold'>Profile</span>
<p className='text-base leading-4 tracking-tighter my-2'>Some info may be visible to other people</p>
</div>
<button className='border-2 border-txtOpac rounded-xl px-8 text-base py-2' onClick={(e)=>{
    e.preventDefault();
    setEdit(prevState=>!prevState);
}}>Edit</button>
</div>

<div className=' m-6 flex items-center  justify-between  flex-1 gap-2'>
<span className='font-semibold text-sm flex-1'>PHOTO</span>
<div className='lg:flex-1'>
<img src={`${data.ProfileURL}`} className="h-20 w-20  rounded-xl object-cover" alt="not found" loading="lazy"/>
</div>
</div>
<hr className="opacity-50"/>
<div className='m-6 flex justify-between   items-center gap-2'>
<span className='font-semibold text-sm  lg:flex-1'>NAME</span>
<span className='text-base font-txt ml-2  lg:flex-1   text-txtOpac'>{`${data.Name}`}</span>
</div>
<hr className="opacity-50"/>
<div className='m-6 flex justify-between  items-center gap-2'>
<span className='font-semibold text-sm  lg:flex-1 '>BIO</span>
<span className='text-base font-txt ml-2 lg:flex-1  text-txtOpac'>{`${data.Bio||''}`}</span>
</div>
<hr className="opacity-50"/>
<div className='m-6 flex justify-between items-center gap-2'>
<span className='font-semibold text-sm lg:flex-1 '>EMAIL</span>
<span className='text-base font-txt ml-2  lg:flex-1 text-txtOpac'>{`${data.Email}`}</span>
</div>
<hr className="opacity-50"/>
<div className='m-6 flex justify-between  items-center gap-2'>
<span className='font-semibold text-sm lg:flex-1 '>PASSWORD</span>
<span className='text-base font-txt ml-2 lg:flex-1  text-txtOpac'>{`${data.Password|| ' '}`}</span>
</div>
</>
)
};