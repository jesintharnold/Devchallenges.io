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
import { Imageupload } from './Imageuploader/Imageupload';
import {Imageredirect} from "./Imageuploader/Imageredirect";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false}/>
    <Switch>
    <LoginProtect exact path="/login" Comp={Auth}/> 
    <Route exact path="/login/auth/:id_token/:id" component={AuthRedirect} />
    <PrivateRoute exact path="/profile" Comp={Profile}/>
    <PrivateRoute exact path="/chat" Comp={Chatapp}/>
    <PrivateRoute exact path="/" Comp={Imageupload}/>
    <PrivateRoute exact path="/imageuploader" Comp={Imageupload}/>
    <Route exact path="/imageuploader/:id" component={Imageredirect} />
    <Route component={Notfound}/>
    </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();




