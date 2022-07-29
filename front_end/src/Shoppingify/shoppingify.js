import { Main } from './components/main';
import { Shopnav } from './components/shopnav';
import { Mainitemprovider } from './context/mainitems/maincontext';


export const Shoppingify=()=>{

    return (
        <Mainitemprovider>
        <div className="w-screen min-h-screen p-0 m-0 box-border bg-shop-back flex flex-row">
           <Shopnav/>
           <Main/>  
        </div>
        </Mainitemprovider>
    )
};