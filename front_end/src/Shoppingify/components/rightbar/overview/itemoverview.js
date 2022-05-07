import { Link } from "react-router-dom";


export const Itemoverview=()=>{
  return (
    <>
    <Link to="/shop/history" className="flex items-center text-shop-orange font-medium mb-5">
    <span className="material-icons tracking-wider text-3xl mr-3">keyboard_backspace</span>
    <span className="text-2xl">back</span>
    </Link>
    <div className="rounded-3xl overflow-hidden">
     <img src={"https://www.w3schools.com/css/lights600x400.jpg"} className="w-full h-full" alt='none'/>
    </div>
    <div className="text-xl my-4 px-2">
    <span className="block text-shop-orange my-3 text-xl font-bold">name
    <p className="text-black font-bold text-2xl mt-1 opacity-90">Aurora Lights</p>
    </span>
    
    <span className="block text-shop-orange my-3 text-xl font-bold">category
    <p className="text-black font-semibold text-xl mt-1 opacity-90">Fruit and vegetables</p>
    </span>
    
    <span className="block text-shop-orange my-3 text-xl font-bold">note
    <p className="break-words text-black  mt-2 leading-6 font-normal">Nutrient-dense foods are those that provide substantial 
    amounts of vitamins, minerals and other nutrients with relatively few calories. 
    One-third of a medium avocado (50 g) has 80 calories and contributes nearly 20 
    vitamins and minerals,
    making it a great nutrient-dense food choice.
    </p>
    </span>
    </div>
    </>
  );
};