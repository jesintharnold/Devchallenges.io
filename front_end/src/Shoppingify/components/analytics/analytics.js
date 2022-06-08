import { Progress } from "./progressbar";
import {  LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer} from 'recharts';
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";


const Categories_seeder=[{name:"Banana",rating:20},{name:"Rice",rating:40},{name:"Chicken 1kg",rating:5}];
const data_ = [
  {
    month: "January",
    value: 4000
  },
  {
    month: "February",
    value: 3000
  },
  {
    month: "March",
    value: 2000
  },
  {
    month: "April",
    value: 2780
  },
  {
    month: "May",
    value: 1890
  },
  {
    month: "June",
    value: 2390
  },
  {
    month: "July",
    value: 3490
  }
];


const data={
  data:Categories_seeder,
  chartData:data_
}

export const Analytics=()=>{
  
  // const [data,setData]=useState({
  //   data:null,
  //   chartData:null
  // });

  useEffect(()=>{

  


  },[]);
 


return(
<>
<div className="flex md:flex-row flex-col min-w-full gap-5 md:gap-20 mb-10">
<div className="w-full md:w-1/3">
  <span className="my-4 font-semibold text-3xl mb-10 block">Top items</span>
  {data.data!==null?Categories_seeder.map(({name,rating},index)=>(
    <Progress color="bg-shop-orange" name={name} rating={rating} key={`Progress-${index}`}/>
  )):
  <div className='w-full mt-[20%] bg-transparent text-center'><ClipLoader color="#F9A109" css={{borderWidth:'3px',top:"20%"}} loading={data.data===null} size={30}/></div>
  }
</div>
<div className="w-full md:w-1/3">
  <span className="my-4 font-semibold text-3xl mb-10 block">Top Categories</span>
  {data.data!==null?Categories_seeder.map(({name,rating},index)=>(
    <Progress color="bg-shop-blue" name={name} percent={rating} key={`Progress-${index}`}/>
  ))
  :
  <div className='w-full mt-[20%] bg-transparent text-center'><ClipLoader color="#F9A109" css={{borderWidth:'3px',top:"20%"}} loading={data.data===null} size={30}/></div>
}
</div>
</div>

<div className="w-full">
<span className="block text-3xl md:text-3xl font-semibold mb-5">Monthly Summary</span>
<div className="md:w-10/12 md:aspect-[3/1] sm:aspect-[2/1] aspect-square  w-full overflow-hidden border-2">
  {data.data!==null?<ResponsiveContainer height="100%" width="100%">
    <LineChart data={data_} margin={{top:10,left:-10,right:30,bottom:20}}>
      <CartesianGrid strokeDasharray="3" stroke="#aaa" />
      <XAxis dataKey="month" strokeDasharray="3" stroke="#707070" style={{fontSize:'1rem'}}/>
      <YAxis strokeDasharray="3" dataKey="value" stroke="#707070" style={{fontSize:'1rem'}}  />
      <Tooltip />
      <Legend/>
      <Line type="monotone" strokeWidth={2} dataKey="value" stroke="rgba(249, 161, 9, 1)"  dot={{ stroke: 'rgba(249, 161, 9, 1)', strokeWidth: 3,r:4 }}  />
    </LineChart>
  </ResponsiveContainer>
  :
  <div className='w-full mt-[10%] bg-transparent text-center'><ClipLoader color="#F9A109" css={{borderWidth:'3px',top:"20%"}} loading={data.data===null} size={30}/></div>  
 }
</div>
</div>

</>
);
};