import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Chatapp} from './Chat/Chatapp';
import {Auth} from './User/Registerlogin';
import {Profile} from './User/Profile';
import { BrowserRouter,Switch,Route} from "react-router-dom";
import {Notfound,AuthRedirect,Logout,PrivateRoute,LoginProtect} from './Authlibrary/AuthRedirect';
import reportWebVitals from './reportWebVitals';
import {Toaster} from 'react-hot-toast';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false}/>
    <Switch>
    <LoginProtect exact path="/login" Comp={Auth}/>  
    <Route exact path="/login/auth/:id_token/:id" component={AuthRedirect} />
    <PrivateRoute exact path="/profile" Comp={Profile}/>
    <PrivateRoute exact path="/" Comp={Chatapp}/>
    <Route component={Notfound}/>
    </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();




