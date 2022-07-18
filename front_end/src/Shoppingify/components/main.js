import { Switch,useRouteMatch,Route} from "react-router-dom";
import { Items } from "./middlebar/list/items";
import {Historyoverview} from "./middlebar/history/historyoverview";
import {History} from "./middlebar/history/history";
import {Rightmain} from './rightmain';
import { Analytics } from "./analytics/analytics";
import {Mainitemprovider, useMainitem} from '../context/mainitems/maincontext';
import {Shoppinglistprovider} from '../context/shoppinglist/shoppinglistcontext';
import {useMobile} from '../../Hooks/useMobile';

export const Main=()=>{
let { path, url } = useRouteMatch();
const mobile=useMobile();
const {mainstate}=useMainitem();
return (
<Shoppinglistprovider>

<div className="w-full min-h-full flex flex-row box-border font-quick  overflow-y-hidden">
<div className={`h-screen scroll-hide flex-3 py-6 px-4 md:px-14 box-border flex-shrink-0 font-quick font-medium overflow-y-scroll overflow-x-hidden ${(mobile&&mainstate.isMobile)?'hidden':'block'}`}>
<Switch>
  <Route exact path={path} component={Items}/>
  <Route exact path={`${path}/history`} component={History}/>
  <Route exact path={`${path}/history/:id`} component={Historyoverview}/>
  <Route exact path={`${path}/analytics`} component={Analytics}/>
</Switch>
</div>
<Rightmain mobile={mobile}/>
</div>
</Shoppinglistprovider>
);
};