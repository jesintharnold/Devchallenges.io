export const Progress=({name="unknown",percent=10,color="bg-shop-orange"})=>{
return(
<div className="w-full text-base font-semibold mb-4">
<div className="w-full flex items-center justify-between">
<span className="block">{`${name}`}</span>
<span className="block">{`${percent}%`}</span>
</div>
<div className={`w-full h-2 bg-txtOpac relative my-3 rounded-lg boder-2 border-txtOpac`}>
  <div className={`h-2  rounded-lg ${color}`} style={{width:`${percent}%`}}></div>
</div>
</div>
);
};