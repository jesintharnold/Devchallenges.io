import {useState} from 'react';
import { Switch,useRouteMatch } from 'react-router-dom';
import { PrivateRoute } from '../Authlibrary/AuthRedirect';
import { Items } from './components/items';
import { Shopnav } from './components/shopnav';



export const Shoppingify=()=>{
 
    let { path, url } = useRouteMatch();
    
    return (
        <div className="w-full min-h-screen p-0 m-0 bg-shop-back overflow-y-auto flex">
            <Shopnav/>
           <Switch>
               {/* <PrivateRoute exact path={path} Comp={Items}/> */}
               {/* <PrivateRoute exact path={`${path}/history`} Comp={Main}/>
               <PrivateRoute exact path={`${path}/analytics`} Comp={Main}/> */}
           </Switch>
        </div>
    )
};