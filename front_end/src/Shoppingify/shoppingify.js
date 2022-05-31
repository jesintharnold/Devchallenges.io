import {useState} from 'react';
import { Main } from './components/main';
import { Shopnav } from './components/shopnav';


export const Shoppingify=()=>{
    return (
        <div className="w-screen min-h-screen p-0 m-0 box-border bg-shop-back flex flex-row">
           <Shopnav/>
           <Main/>  
        </div>
    )
};