import { Switch,useRouteMatch,Route} from "react-router-dom";
import { Rightmain } from "./rightmain";
import {Items} from './items';

export const Main=()=>{
  let { path, url } = useRouteMatch();
return (
  <div className="w-full min-h-full flex flex-row">

<Switch>
  <Route exact path={path} component={Items}/>
  {/* <PrivateRoute exact path={path} Comp={Items}/>
  <PrivateRoute exact path={`${path}/history`} Comp={Main}/>
  <PrivateRoute exact path={`${path}/analytics`} Comp={Main}/> */}
</Switch>
<Rightmain/>
</div>
);
};