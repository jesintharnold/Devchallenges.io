import { useEffect,useState} from "react";
import { Link,useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from '../../../../utils/axios';


export const Historyoverview=()=>{

  const [data,setData]=useState(null);
  let {id}=useParams();

  useEffect(()=>{
    console.log(id);

    const fetchItems=async ()=>{
      await axios.get(`${process.env.REACT_APP_URL}/shoppingify/history/${id}`).then((res)=>{
        setData(res.data.data[0]);
      });
    }
    
    fetchItems();

  },[]);


  return (
    <>
    <Link to="/shop/history" className="flex items-center text-shop-orange font-medium mb-4">
    <span className="material-icons tracking-wider text-xl mr-3">keyboard_backspace</span>
    <span className="text-xl">back</span>
    </Link>
    {data!==null?
    <>
    <div className="text-xl font-semibold">{data.name||"Shopping list"}</div>
    <div className="flex flex-row text-caert items-center gap-4 my-4">
      <span className="material-icons-outlined block">calendar_month</span>
      <span className="block">{new Date(data.timestamp).toLocaleString('en-US',{month:'numeric',year:'numeric',weekday:'short',day:'numeric'}).replaceAll('/','.').replaceAll(',','  ')}</span>
    </div>
    {
      data.list.map(({category,categoryID,items},index)=>(
    <div className="first:mt-8 mt-8" key={`HOC-${index}`}>

      <span className="text-base font-semibold">{category}</span>
      <div className="flex w-full flex-wrap gap-2 md:gap-5 my-4 mx-2">
      {
         items.map(({item,itemID,quantity,checked},i)=>(
          <div key={`HOCI-${i}`} className="shadow-lg flex items-center font-light gap-4 flex-nowrap flex-shrink-0 px-5 md:px-3 py-2 rounded-lg bg-white cursor-pointer">
          <span className="block  font-medium text-base">{item}</span>
          <span className="block  text-base text-shop-orange font-semibold">{`${quantity} pcs`}</span>
          </div>
         ))
      }
      </div>
    </div>
      ))
    }
    </>
    :
    <div className='w-full bg-transparent mt-[30%] text-center'><ClipLoader color="#F9A109" css={{borderWidth:'5px',top:"20%"}} loading={data===null} size={50}/></div>
    }
       </>
  );
};