import { Progress } from "./progressbar";
import {  LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer} from 'recharts';
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "../../../utils/axios";
import toast from "react-hot-toast";

// const Categories_seeder=[{name:"Banana",rating:20},{name:"Rice",rating:40},{name:"Chicken 1kg",rating:5}];
// const data_ = [
//   {
//     month: "January",
//     value: 4000
//   },
//   {
//     month: "February",
//     value: 3000
//   },
//   {
//     month: "March",
//     value: 2000
//   },
//   {
//     month: "April",
//     value: 2780
//   },
//   {
//     month: "May",
//     value: 1890
//   },
//   {
//     month: "June",
//     value: 2390
//   },
//   {
//     month: "July",
//     value: 3490
//   }
// ];

function changePayload(payload){
  var months = [{month: "January",value: 0},{month: "February",value: 0},{month: "March",value: 0},{month: "April",value: 0},{month: "May",value: 0},{month: "June",value: 0},{month: "July",value: 0},{month:"August",value:0},{month:"September",value:0},{month:"October",value:0},{month:"November",value:0},{month:"December",value:0}];

months.map((elem,index)=>{
    payload.forEach(element => {
      if(index+1==Number.parseInt(element._id)){
        elem.value=element.itemcount;      
      }else{
        return elem;
      }
    });
  })

return months;
};



export const Analytics=()=>{
  
  const [data,setData]=useState({
    item:[],
    category:[],
    graph:[]
  });


  useEffect(()=>{

  const fetchItems=async ()=>{
      await axios.get(`${process.env.REACT_APP_URL}/shoppingify/analytics`).then(res=>{
       setData({
        item:res.data.items,
        category:res.data.category,
        graph:changePayload(res.data.graph)
       });
      }).catch((error)=>{
       toast.error(error.response.data.message);
     });
  }
  fetchItems();
  },[]);
 


return(
<>
<div className="flex md:flex-row flex-col min-w-full gap-5 mb-8 md:gap-20">
<div className="w-full md:w-1/2">
  <span className="my-4 font-semibold text-xl mb-5 block">Top items</span>
  {data.item.length>0?data.item.map(({item,quantity},index)=>(
    <Progress color="bg-shop-orange" name={item} percent={quantity} key={`Progress-${index}`}/>
  )):
  <div className='w-full mt-[20%] bg-transparent text-center'><ClipLoader color="#F9A109" css={{borderWidth:'3px',top:"20%"}} loading={data.item.length===0} size={30}/></div>
  }
</div>
<div className="w-full md:w-1/2">
  <span className="my-4 font-semibold text-xl mb-5 block">Top Categories</span>
  {data.category.length>0?data.category.map(({category,quantity},index)=>(
    <Progress color="bg-shop-blue" name={category} percent={quantity} key={`Progress-${index}`}/>
  ))
  :
  <div className='w-full mt-[20%] bg-transparent text-center'><ClipLoader color="#F9A109" css={{borderWidth:'3px',top:"20%"}} loading={data.category.length===0} size={30}/></div>
}
</div>
</div>

<div className="w-full">
<span className="block text-xl font-semibold mb-7">Monthly Summary</span>
<div className="md:w-11/12 md:aspect-[3/1] sm:aspect-[2/1] aspect-square  w-full overflow-hidden border-2">
  {data.graph.length>0?<ResponsiveContainer height="100%" width="100%">
    <LineChart data={data.graph} margin={{top:10,left:-10,right:30,bottom:20}}>
      <CartesianGrid strokeDasharray="3" stroke="#aaa" />
      <XAxis dataKey="month" strokeDasharray="3" stroke="#707070" style={{fontSize:'1rem'}}/>
      <YAxis strokeDasharray="3" dataKey="value" stroke="#707070" style={{fontSize:'1rem'}}  />
      <Tooltip />
      <Legend/>
      <Line type="monotone" strokeWidth={2} dataKey="value" stroke="rgba(249, 161, 9, 1)"  dot={{ stroke: 'rgba(249, 161, 9, 1)', strokeWidth: 3,r:4 }}  />
    </LineChart>
  </ResponsiveContainer>
  :
  <div className='w-full mt-[10%] bg-transparent text-center'><ClipLoader color="#F9A109" css={{borderWidth:'3px',top:"20%"}} loading={data.graph.length===0} size={30}/></div>  
 }
</div>
</div>

</>
);
};