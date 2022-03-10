import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {Auth} from './USER/Registerlogin';
import {Profile} from './USER/Profile';
import reportWebVitals from './reportWebVitals';



ReactDOM.render(
  <React.StrictMode>
    <Auth/>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();




