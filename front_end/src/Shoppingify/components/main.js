import { Switch,useRouteMatch,Route} from "react-router-dom";
import { Rightmain } from "./rightmain";
import {Items} from './MIDDLEBAR/items';
import { History } from "./MIDDLEBAR/history";

const seeder_history=[
  { monthtitle:'12/03/2020',
    data:[
      {
      name:"Grocery Lit",
      date:new Date(),
      status:true, // completed - true
      items:[{category:"Non-Veg",items:[{name:"Avocodo",quantity:5},{name:"Avocodo wolves",quantity:4},{name:"Avocodo",quantity:3},]}]
      }
    ]
  }
];

export const Main=()=>{
  let { path, url } = useRouteMatch();
return (
  <div className="w-full min-h-full flex flex-row box-border font-quick ">
<div className="h-screen scroll-hide flex-3 py-6 px-4 md:px-14 box-border flex-shrink-0 font-quick font-medium overflow-y-scroll overflow-x-hidden">
<Switch>
  <Route exact path={path} component={Items}/>
  <Route exact path={`${path}/history`} component={()=><History data={seeder_history}/>} />
  {/* <PrivateRoute exact path={path} Comp={Items}/>
  <PrivateRoute exact path={`${path}/history`} Comp={Main}/>
  <PrivateRoute exact path={`${path}/analytics`} Comp={Main}/> */}
</Switch>
</div>
<Rightmain/>
</div>
);
};