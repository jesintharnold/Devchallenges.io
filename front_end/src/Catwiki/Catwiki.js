import { Route, Switch,useRouteMatch} from "react-router-dom";
import { PrivateRoute } from "../Authlibrary/AuthRedirect";
import { Catoverview } from "./components/catOverview";
import { Footer, Header } from "./components/headfoot";
import { Main } from "./components/main";
import { Topcats } from "./components/topcats";



export const Catwiki=()=>{
    let { path, url } = useRouteMatch();
return (
<div className="w-full bg-white">
    <div className="container md:p-0 px-1 mx-auto min-h-screen relative">
    <Header/>
    <Switch>
        <PrivateRoute exact path={path} Comp={Main}/>
        <PrivateRoute exact path={`${path}/topcats`} Comp={Topcats}/>
        <PrivateRoute exact path={`${path}/overview/:id`} Comp={Catoverview}/>
    </Switch>
    <Footer/>
    </div>
</div>
);
};