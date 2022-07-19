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
import { Catwiki } from './Catwiki/Catwiki';
import { Shoppingify } from './Shoppingify/shoppingify';


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
    {/* change here the main application overview page */}

    <PrivateRoute path="/imageuploader" Comp={Imageupload}/>
    <PrivateRoute path="/imageuploader/:id" component={Imageredirect} />
    
    {/* <PrivateRoute exact path="/catwiki" Comp={Catwiki}/> */}
    <PrivateRoute path="/catwiki" component={Catwiki} />
    <PrivateRoute path="/shop" component={Shoppingify} />
  

    <Route component={Notfound}/>
    </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();




