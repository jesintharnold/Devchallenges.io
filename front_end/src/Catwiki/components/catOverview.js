import { Progressblock } from "./progressblock";
import seeds from './seed.json';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import Config from '../../Config/dev.json';
import axios from 'axios';
import { Redirect, useParams } from "react-router-dom";


export const Catoverview=()=>{
    const [data,setData]=useState({
        "name": "Abyssinian",
        "description": "The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.",
        "temperament": "Active, Energetic, Independent, Intelligent, Gentle",
        "origin": "Egypt",
        "life_span": "14 - 15",
        "adaptability": 5,
        "affection_level": 5,
        "child_friendly": 3,
        "grooming": 1,
        "intelligence": 5,
        "health_issues": 2,
        "social_needs": 5,
        "stranger_friendly": 5,
        "id": "abys",
        "url": [
            "https://cdn2.thecatapi.com/images/xnzzM6MBI.jpg",
            "https://cdn2.thecatapi.com/images/unPP08xOZ.jpg",
            "https://cdn2.thecatapi.com/images/N-94oSJ5T.jpg",
            "https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg",
            "https://cdn2.thecatapi.com/images/gCEFbK7in.jpg",
            "https://cdn2.thecatapi.com/images/Kq8__jmkT.jpg",
            "https://cdn2.thecatapi.com/images/TGuAku7fM.jpg",
            "https://cdn2.thecatapi.com/images/tv8tNeYaU.jpg",
            "https://cdn2.thecatapi.com/images/g1j3wRjgx.jpg"
        ]
    });
    const {id}=useParams();
    
    async function callcats(){
        await axios.get(`${Config.URL}/catwiki/search/${id}`).then(({status,data})=>{
            if(status===200){
                setData(data);
            }
        }).catch(err=>{
         let {data}=err.response;
         toast.error(data.message);
         <Redirect to="/catwiki"/>
        });
    };



    useEffect(()=>{
        // call api at initial fetch
        callcats();
    },[])



return (
    <div className="w-full">

    <section className="flex flex-col  md:flex-row text-cat-brown gap-12 items-center md:items-start">
    <div className='relative flex-shrink-0  h-max '>
        <div className='before:absolute before:w-10 before:h-40 before:bg-cat-back  before:top-[10%] before:-left-2 before:opacity-90 before:z-0 before:rounded-l-2xl'>
            <img className='z-10 relative h-48 w-48 object-center object-cover  aspect-square rounded-2xl md:rounded-3xl  block' src={data.url[0]} alt={"data.name"}/>
        </div>
    </div>
    <div className="text-lg font-semibold leading-6 tracking-tighter">
    <span className="text-2xl font-semibold block mb-6">{data.name}</span>
    <span className="text-lg leading-6 font-normal tracking-tighter">{data.description}</span>
    <div className="my-3 font-normal"><span className="mr-2 font-semibold">Origin:</span>{data.origin}</div>
    <div className="my-3 font-normal"><span className="mr-2 font-semibold">Life Span:</span>{data.life_span}</div>
    <div className="my-3 font-normal"><span className="mr-2 font-semibold">Temperament:</span>{data.temperament}</div>
    <div className="grid grid-cols-[auto_1fr] w-1/2  gap-y-3 mt-4 items-center">
        <span>Adaptability:</span>
        <Progressblock progress={data.adaptability}/>
        <span>Affection level:</span>
        <Progressblock progress={data.affection_level}/>
        <span>Child Friendly:</span>
        <Progressblock progress={data.child_friendly}/>
        <span>Grooming:</span>
        <Progressblock progress={data.grooming}/>
        <span>Intelligence:</span>
        <Progressblock progress={data.intelligence}/>
        <span>Health issues:</span>
        <Progressblock progress={data.health_issues}/>
        <span>Social needs:</span>
        <Progressblock progress={data.social_needs}/>
        <span>Stranger friendly:</span>
        <Progressblock progress={data.stranger_friendly}/>    
    </div>
    </div>
    </section>
    
    <section className="w-full my-10">
        <span className="text-cat-brown text-2xl font-semibold block mb-10">Other photos</span>
        <div className="grid grid-cols-2 md:grid-cols-[auto_auto_auto_auto] gap-4 md:gap-12 justify-center grid-rows-2  justify-items-center">
           {data.url.map((data,index)=>(
               index===0?" ":<img alt={data} src={data} className="h-52 object-cover rounded-xl aspect-square" key={index}/>
           ))}
        </div>
    </section>




    </div>
);
};

