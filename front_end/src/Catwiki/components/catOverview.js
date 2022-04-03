import { Progressblock } from "./progressblock";
import seeds from './seed.json';


export const Catoverview=()=>{
return (
    <div className="w-full">

    <section className="flex flex-col  md:flex-row text-cat-brown gap-12 items-center md:items-start">
    <div className='relative flex-shrink-0  h-max '>
        <div className='before:absolute before:w-10 before:h-40 before:bg-cat-back  before:top-[10%] before:-left-2 before:opacity-90 before:z-0 before:rounded-l-2xl'>
            <img className='z-10 relative h-48 w-48 object-center object-cover  aspect-square rounded-2xl md:rounded-3xl  block' src="https://cdn2.thecatapi.com/images/hBXicehMA.jpg" alt={"data.name"}/>
        </div>
    </div>
    <div className="text-lg font-semibold leading-6 tracking-tighter">
    <span className="text-2xl font-semibold block mb-6">Bengal</span>
    <span className="text-lg leading-6 font-normal tracking-tighter">Bengals are a lot of fun to live with, but they're definitely not the cat for everyone, or for first-time cat owners. Extremely intelligent, curious and active, they demand a lot of interaction and woe betide the owner who doesn't provide it.</span>
    <div className="my-3 font-normal"><span className="mr-2 font-semibold">Origin:</span>United States</div>
    <div className="my-3 font-normal"><span className="mr-2 font-semibold">Life Span:</span>12 - 15 years</div>
    <div className="my-3 font-normal"><span className="mr-2 font-semibold">Temperament:</span> Alert, Agile, Energetic, Demanding, Intelligent</div>
    <div className="grid grid-cols-[auto_1fr] w-1/2  gap-y-3 mt-4 items-center">
        <span>Adaptability:</span>
        <Progressblock progress={5}/>
        <span>Affection level:</span>
        <Progressblock progress={5}/>
        <span>Child Friendly:</span>
        <Progressblock progress={4}/>
        <span>Grooming:</span>
        <Progressblock progress={1}/>
        <span>Intelligence:</span>
        <Progressblock progress={5}/>
        <span>Health issues:</span>
        <Progressblock progress={3}/>
        <span>Social needs:</span>
        <Progressblock progress={5}/>
        <span>Stranger friendly:</span>
        <Progressblock progress={3}/>
        
    </div>
    </div>
    </section>
    
    <section className="w-full my-10">
        <span className="text-cat-brown text-2xl font-semibold block mb-10">Other photos</span>
        <div className="grid grid-cols-2 md:grid-cols-[auto_auto_auto_auto] gap-4 md:gap-12 justify-center grid-rows-2  justify-items-center">
           {seeds.map(data=>(
               <img alt={data.image.url} src={data.image.url} className="h-52 object-cover rounded-xl aspect-square"/>
           ))}
        </div>
    </section>




    </div>
);
};

