function Member({src,name,status}){
return (
<div className="flex uppercase box-content items-center my-3 first:my-2 z-40 last:lg:mb-6 leading-4 last:mb-20">
<div className="w-10 h-10 rounded-md relative  flex-shrink-0">
<img src={`${src}`} className="w-full h-full rounded-md object-cover " alt="Not Found"/>
<div className={"w-3 h-3  rounded-full absolute -top-1 -right-1 "+(status==="Online"?'bg-green-800':'bg-gray-600')}></div>
</div>
<span className="font-semibold ml-6  text-txt text-sm md:text-[0.9rem]">{name}</span>
</div>
);
}

export default Member;