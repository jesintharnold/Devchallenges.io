import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {Auth} from './USER/Registerlogin';
import {Profile} from './USER/Profile';
import { BrowserRouter,Switch,Route} from "react-router-dom";
import {Notfound,AuthRedirect,Logout,PrivateRoute,LoginProtect} from './Authlibrary/AuthRedirect';
import reportWebVitals from './reportWebVitals';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Switch>
    <LoginProtect exact path="/login" login={true} Comp={Auth}/>  
    <Route exact path="/login/auth/:id_token/:id" component={AuthRedirect} />
    <PrivateRoute exact path="/profile" login={true} Comp={Profile}/>
    <PrivateRoute exact path="/" Comp={App}/>
    <Route component={Notfound}/>
    </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();




