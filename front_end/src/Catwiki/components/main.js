import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import catwikilight from '../../Assets/Catwiki_white.svg';
import { Catsearch } from './catSearch';
import axios from 'axios';
import Img1 from '../Asset/image_1.png';
import Img2 from '../Asset/image_2.png';
import Img3 from '../Asset/image_3.png';
import Config from '../../Config/dev.json';
import toast from 'react-hot-toast';



const seeder=[
    {"url": "https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg",
    "name": "Abyssinian"},
    {"url": "https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg",
    "name": "Aegean"},
    {"url": "https://cdn2.thecatapi.com/images/xnsqonbjW.jpg",
    "name": "American Curl"},
    {"url": "https://cdn2.thecatapi.com/images/hBXicehMA.jpg",
    "name": "American Bobtail"}
];



export const Main=()=>{

    const [data,setData]=useState([]);
    
    async function callcats(){
        await axios.get(`${Config.URL}/catwiki/cats/4`).then(({status,data})=>{
            if(status===200){
                setData(data);
            }
        }).catch(err=>{
         let {data}=err.response;
         toast.error(data.message);
        });
    };



    useEffect(()=>{
        // call api at initial fetch
        callcats();
    },[])

    return (
        <div className="w-full">

        <section className='w-full bottom-2 flex flex-col rounded-3xl overflow-hidden'>
        
        <div className='bg-catwikism bg-cover bg-center bg-origin-border bg-no-repeat px-10  md:px-20 text-white '>
        <img src={catwikilight} alt="Catwiki" className='h-16 mt-10'/>
        <span className=' text-lg md:text-2xl font-normal tracking-normal leading-6 mt-4 block'>Get to know more about your <br/> cat breed</span>
        <Catsearch/>
        </div>

        <div className='bg-cement-cat px-10 md:px-20'>

        <span className='text-cat-brown block my-8 text-lg  font-semibold leading-6 after:block after:w-12 after:h-1 after:bg-cat-brown after:mt-2 after:rounded-md'>Most Searched Breeds</span>
        <div className='my-8 w-full text-cat-brown flex items-center justify-between'>
        <span className='float-left font-bold text-3xl md:text-4xl'>66+ Breeds For you<br></br> to discover</span>
        <Link to="/catwiki/topcats" className='float-right font-semibold hidden md:block text-lg opacity-70'>SEE MORE &#8594;</Link>
        </div>
        
        <div className='md:grid-cols-4 grid-cols-2  grid justify-items-center my-10 md:mb-10 md:mt-16 gap-6'>
              {data.map(data=>(
              
              <Link to={`/catwiki/overview/${data.id}`} key={data.id}>
                  <div className='relative'>
                  <div className='before:absolute before:w-10 before:h-[80%] before:bg-cat-back  before:top-[10%] before:-left-3 before:z-0 before:rounded-l-2xl'>
                      <img className='z-10 relative md:h-52  aspect-square rounded-2xl md:rounded-3xl  block' src={data.url} alt={data.name}/>
                      </div>
                  </div>
                      <span className='text-cat-brown opacity-90 md:ml-6 my-2 block  md:text-xl font-bold tracking-tight'>{data.name}</span>
               
               </Link>
                  
                  ))}
        </div >
        </div>
        </section> 
        <section className='w-full flex flex-col flex-1 md:flex-row gap-8 px-4 md:px-14 mt-16'>
        <div className='flex-1'>
        <span className='text-cat-brown font-bold text-3xl md:text-4xl  before:block before:w-12 before:h-1 before:bg-cat-brown before:mb-4 before:rounded-md'>Why should you <br></br>have a cat ?</span>
        <span className='block my-8 text-xl md:text-2xl leading-6'>Having a cat around you can actually trigger the release of calming chemicals in your body which lower your stress and anxiety leves</span>
        <Link to="/catwiki/topcats" className='font-semibold block text-base opacity-70 w-auto'>READ MORE &#8594;</Link>
        </div>
        <div className='grid-cols-2 gap-4 grid md:w-2/5 mt-4'>
         <img src={Img2} alt="Img-2"  className='self-end'/>
         <img src={Img3} alt="Img-3" className='row-span-2'/>
         <img src={Img1} alt="Img-1" className='row-span-2 w-11/12 justify-self-end'/>
          
          
          

        
        </div>
        </section>
           

        </div>
    );
}