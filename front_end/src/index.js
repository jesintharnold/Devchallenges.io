import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
// import {io} from 'socket.io-client';
// import Client from './socketclient';


// export const Appwrapper=({children})=>{

//   const [soc,setSoc]=useState();

//    useEffect(()=>{
    // const socket=io("http://localhost:5000/");
    // setSoc(socket);
    // Client.setSocket(socket);
//     console.log(`Index Rendering`);

    
//    },[]);
  
 

//   return (
//     <>
//      {children}
//     </>
//   )
// }








ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
