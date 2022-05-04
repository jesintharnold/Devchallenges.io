import {useState} from 'react';
import { Main } from './components/main';
import { Shopnav } from './components/shopnav';


export const Shoppingify=()=>{
    return (
        <div className="w-full min-h-screen p-0 m-0 bg-shop-back  overflow-y-auto flex flex-row">
           <Shopnav/>
           <Main/>  
        </div>
    )
};