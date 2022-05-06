
const example=[
  {Title:"Fruit and vegetables",values:["Avocado","Banana",
  "Bunch of carrots","Chicken","Pre-cooked corn",
  "Mandarin Nadorcott","Piele De Sapo Melon","Watermelon"]},
  {Title:"Fruit",values:["Avocado","Banana",
  "Bunch of carrots","Chicken","Pre-cooked corn",
  "MNad","P","Watermelon"]},
  {Title:"Fruit and vegetables",values:["Avocado","Banana",
  "Bunch of carrots","Chicken","Pre-cooked corn",
  "Man","Piele De Sapo Melon","Watermelon"]},
  {Title:"Fruit",values:["Avocado","Banana",
  "Bunch of carrots","Chicken","Pre-cooked corn",
  "Man","Piele De Sapo Melon","Watermelon"]}
  
];


export const Items=()=>{
  return (
        <>       
      <div className="w-full flex">
       <span className="font-quick font-bold tracking-wider md:text-4xl text-base text-left"><span className="text-shop-orange text-4xl">Shoppingify</span><br className="block md:hidden"></br> allows you take your<br className="hidden md:block"></br> shopping list wherever you go</span>
       {/* <div className="">
         <input type="text" className="bg-red-400"/>
         <></>
       </div> */}
       </div>

       {example.map(({Title,values},index)=>(
           
           <div className="first:mt-12 mt-8" key={`c-${index}`}>
             {/* LIST CATEGORY NAME */}
           <span className="text-xl md:text-2xl font-medium">{Title}</span>
           
           {/* LIST ITEMS IN CATEGORY */}
           <div className="flex w-full flex-wrap gap-2 md:gap-5 my-6">
     
           {
           values.map((data,index)=>(
             <div className="shadow-lg flex items-center gap-4 px-2 md:px-4 py-1 md:py-3 rounded-xl md:rounded-2xl bg-white cursor-pointer" key={`L-${index}`}>
             <span className="block  text-base md:text-xl font-light float-left">{data}</span>
             <span className="material-icons text-xl md:text-3xl block text-shop-tooltip opacity-70">add</span>
             </div>
           ))
           }
     
           </div>
     
           </div>
       ))}



  </>
  );
};