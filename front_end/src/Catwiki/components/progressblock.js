export const Progressblock=({progress=1})=>{    
return (
<div className="flex gap-4 ml-4">
{Array(5).fill(0).map((_,i)=><span className={"h-2 w-10 opacity-80  block rounded-xl "+(i+1<=progress?"bg-cat-brown":"bg-txtOpac")}></span>)}
</div>
);
};