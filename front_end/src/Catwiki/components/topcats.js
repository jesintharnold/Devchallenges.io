import seedata from './seed.json';


export const Topcats=()=>{
return (
    <div className="w-full">
     <span className='block text-2xl font-bold mb-10 text-cat-brown tracking-tight'>Top 10 most searched breeds</span>
   {
      seedata.map((data,index)=>(
        
     <div className='flex flex-col md:flex-row items-center gap-8 mb-8' key={data.id}>

     <img src={data.image.url} className='w-36 flex-shrink-0 rounded-xl h-36 object-cover' alt="Name"/>
     <div className='flex flex-col gap-4'>
         <span className='block text-cat-brown text-2xl font-medium'>{`${index+1}.  ${data.name}`}</span>
         <span className='block text-lg tracking-tight font-normal leading-6'>{data.description}</span>
     </div>
    </div>
      )) 
   }
     

    </div>
);
};