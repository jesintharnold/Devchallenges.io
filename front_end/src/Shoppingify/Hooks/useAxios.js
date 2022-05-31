import axios from "axios";
import {useState,useEffect} from "react";

const useAxios=(axios_)=>{

  const [response,setResponse]=useState(null);
  const [isLoading,setLoading]=useState(true);
  
  const getData=async ()=>{
   try{
     let api_response=await axios_;
    if(api_response.status===200|api_response.status===201)
     setResponse(api_response.data);
   }catch(err){
      console.log(`Error in fetching data`,err);
   }finally{
     setLoading(false);
   }
  };
  
  useEffect(()=>{
     getData();
  },[]);
 
  return {response,isLoading};
};

export default useAxios;

//const {response,isLoading}=useAxios(axios.get("path"));



