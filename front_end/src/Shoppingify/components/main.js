import { Switch,useRouteMatch,Route} from "react-router-dom";
import { Rightmain } from "./rightmain";
import {Items} from './items';

export const Main=()=>{
  let { path, url } = useRouteMatch();
return (
  <div className="w-full min-h-full flex flex-row box-border">
<div className="h-screen scroll-hide flex-3 py-6 px-4 md:px-14 box-border flex-shrink-0 font-quick font-medium overflow-y-scroll overflow-x-hidden">
<Switch>
  <Route exact path={path} component={Items}/>
  {/* <PrivateRoute exact path={path} Comp={Items}/>
  <PrivateRoute exact path={`${path}/history`} Comp={Main}/>
  <PrivateRoute exact path={`${path}/analytics`} Comp={Main}/> */}
</Switch>
</div>
<Rightmain/>
</div>
);
};