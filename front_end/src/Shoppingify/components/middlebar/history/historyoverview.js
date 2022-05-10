import { Link } from "react-router-dom";
const data=
      {
      name:"Grocery Lit",
      date:new Date(),
      status:true, // completed - true
      ID:100,
      items:[{category:"Non-Veg",items:[{name:"Avocodo",quantity:5},{name:"Avocodo wolves",quantity:4},{name:"Avocodo",quantity:3},]}]
      };


export const Historyoverview=()=>{
  return (
    <>
    <Link to="/shop/history" className="flex items-center text-shop-orange font-medium mb-10">
    <span className="material-icons tracking-wider text-3xl mr-3">keyboard_backspace</span>
    <span className="text-2xl">back</span>
    </Link>
        <div className="text-4xl font-semibold">{data.name}</div>
        <div className="flex flex-row text-caert text-xl items-center gap-4 my-8">
          <span className="material-icons-outlined block">calendar_month</span>
          <span className="block">{new Date(data.date).toLocaleString('en-US',{month:'numeric',year:'numeric',weekday:'short',day:'numeric'}).replaceAll('/','.').replaceAll(',','  ')}</span>
        </div>
        {
          data.items.map(({category,items},index)=>(
        <div className="first:mt-12 mt-8" key={`HOC-${index}`}>
            {/* LIST CATEGORY NAME */}
          <span className="text-xl md:text-2xl font-medium">{category}</span>
          {/* LIST ITEMS IN CATEGORY */}
          <div className="flex w-full flex-wrap gap-2 md:gap-5 my-6">
          {
             items.map(({name,quantity},i)=>(
              <div key={`HOCI-${i}`} className="shadow-lg flex items-center font-light gap-4 flex-nowrap flex-shrink-0 px-5 md:px-4 py-1 md:py-3 rounded-lg md:rounded-2xl bg-white cursor-pointer">
              <span className="block  font-medium text-base md:text-xl">{name}</span>
              <span className="block  text-lg text-shop-orange font-semibold">{`${quantity} pcs`}</span>
              </div>
             ))
          }
          </div>
        </div>
          ))
        }
       </>
  );
};